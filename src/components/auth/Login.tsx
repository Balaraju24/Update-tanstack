import { useMutation } from "@tanstack/react-query";
import { userSignin, verifyWithOtp } from "../../http/services/auth";
import { useEffect, useState, useCallback } from "react";
import MainPage from "../../assets/mainPage";
import SalesTableLogo from "../../assets/Salestablelogo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import React from "react";

//  Memoized static components
const MemoMainPage = React.memo(MainPage);
const MemoSalesTableLogo = React.memo(SalesTableLogo);

//  Timer display in separate memoized component
const TimerDisplay = React.memo(
  ({ timer, onResend }: { timer: number; onResend: () => void }) => (
    <p className="text-sm text-gray-500">
      {timer > 0 ? (
        `Resend Code (in ${timer}s)`
      ) : (
        <span>
          You can resend the code now{" "}
          <button
            type="button"
            onClick={onResend}
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            Resend OTP
          </button>
        </span>
      )}
    </p>
  )
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [timer, setTimer] = useState(30);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const { mutate: userSigninMutation, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (payload: { email: string }) => {
      const res = await userSignin("/auth/email-sign-in", payload);
      return res;
    },
    onSuccess: () => {
      setOtpPage(true);
      toast.success("OTP sent successfully");
      setTimer(30); // reset timer when OTP sent
    },
    onError: async (error: any) => {
      console.log(error);
      if (error?.data.status === 422) {
        toast.error(error.data.errors.email[0] || "Something went wrong");
      } else if (error.data.status === 404) {
        toast.error(
          error.data.message || "Invalid route path please check the path."
        );
      } else if (error.data.status === 500) {
        toast.error(
          `status ${error.data.status} please wait few minuts and try again.`
        );
      } else if (error.data.status === 400) {
        toast.error(error.data.message || "Bad request");
      } else {
        toast.error("Please check you network connection...");
      }
    },
  });

  const userOtpVerifyMutation = useMutation({
    mutationKey: ["user-otp"],
    mutationFn: async (payload: { email: string; otp: string }) => {
      const res = await verifyWithOtp("/auth/email-sign-in/verify", payload);
      return res;
    },
    onSuccess: (data) => {
      setEmail("");
      setOtp("");
      Cookies.set("token", data?.data.data.access_token);
      Cookies.set("refresh_token", data?.data.data.refresh_token);
      Cookies.set("user_details", JSON.stringify(data?.data.data.user_details));
      toast.success("OTP verified successfully!");
      setOtpPage(false);
      navigate({ to: "/mainLayout" });
      localStorage.clear();
    },
    onError: (error: any) => {
      if (error.data.status === 422) {
        toast.error(error.data.errors.otp[0] || "Something went wrong");
      } else if (error.data.status === 404) {
        toast.error(
          error.data.message || "Invalid route path please check the path."
        );
      } else if (error.data.status === 500) {
        toast.error(
          `status ${error.data.status} please wait few minuts and try again.`
        );
      } else if (error.data.status === 400) {
        toast.error(error.data.message || "Bad request");
        setOtpErrorMessage("Invalid otp");
      } else {
        toast.error("Please check you network connection...");
      }
    },
  });

  // useCallback to avoid re-creating functions
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setEmailError("");
      userSigninMutation({ email });
    },
    [email, userSigninMutation]
  );

  const handleSubmitOtp = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      userOtpVerifyMutation.mutate({ email, otp });
    },
    [email, otp, userOtpVerifyMutation]
  );

  return (
    <div className="flex flex-row justify-center gap-8 items-center h-[100%] bg-blue-50">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <MemoMainPage />
      </div>

      {/* Right Section */}
      <div className="w-full sm:max-w-md md:w-1/3 bg-white mt-6 h-[690px] rounded-lg shadow-sm p-6 flex flex-col justify-start items-center">
        <div className="flex justify-center items-center mt-6">
          <MemoSalesTableLogo />
        </div>

        <div className="flex flex-col mt-6 justify-center items-center w-full">
          <p className="text-[#282C34] text-lg">Login</p>

          {otpPage && mounted ? (
            // OTP Page
            <form
              onSubmit={handleSubmitOtp}
              className="mt-4 w-full flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Verify Your Email Address
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Enter the 4-digit code sent to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <div>
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) =>
                    requestAnimationFrame(() => setOtp(value))
                  }
                >
                  <InputOTPGroup className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="border-1 border-gray-500 rounded-md bg-white"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {otpErrorMessage ? (
                <p className="text-red-500">{otpErrorMessage}</p>
              ) : (
                ""
              )}

              <TimerDisplay
                timer={timer}
                onResend={() => {
                  if (email) {
                    userSigninMutation({ email });
                    setTimer(30); // restart countdown
                  }
                }}
              />

              <Button
                type="submit"
                disabled={userOtpVerifyMutation.isPending}
                className="bg-blue-600 text-white w-full h-[45px] rounded-full hover:bg-blue-700"
              >
                {userOtpVerifyMutation.isPending ? "Verifying..." : "Login"}
              </Button>

              <p className="text-sm text-center px-2 text-gray-600">
                By Creating An Account You Agree To Oro-Reg{" "}
                <span className="text-blue-400">Terms Of Services</span> And{" "}
                <span className="text-blue-400">Privacy Policy</span>
              </p>
            </form>
          ) : (
            // Email Page
            <form onSubmit={handleSubmit} className="w-full mt-3">
              <Input
                value={email}
                type="email"
                className="w-full h-[40px] border-2 rounded-full placeholder:text-black"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />

              {emailError && (
                <p className="text-red-600 text-sm">{emailError}</p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-100 text-blue-500 w-full h-[40px] rounded-full mt-5 hover:bg-blue-100"
              >
                {isPending ? "Sending..." : "Send OTP"}
              </Button>

              <p className="text-sm text-center px-2 mt-2">
                By Creating An Account You Agree To Oro-Reg{" "}
                <span className="text-blue-400">Terms Of Services</span> And{" "}
                <span className="text-blue-400">Privacy Policy</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
