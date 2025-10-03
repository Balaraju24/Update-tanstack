import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import UrlsTable from "./UrlsTable";
import { Globe } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { crawlSubPageLinks, uploadIntoRag } from "@/http/services/ragServices";
import { useQueryClient } from "@tanstack/react-query";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function UrlsComponent() {
  const [scrapedLinks, setScrapedLinks] = useState<any[]>([]);
  const [scrappingLink, setScrappingLink] = useState("");
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [scrapedBtnState, setScrapeBtnState] = useState(false);
  const [inputTag, setInputTag] = useState("");
  const [context, setContext] = useState("");
  const [category, setCategory] = useState("");

  const crawlLinksMutation = useMutation({
    mutationKey: ["crawl-links"],
    mutationFn: async (payload: { base_url: string }) => {
      const res = await crawlSubPageLinks("/scrape/get-scrape-urls", payload);
      return res;
    },
    onSuccess: (data) => {
      setScrapedLinks((prev) => [...prev, ...data?.data.data.urls]);
      return data?.data;
    },
    onError: (error) => {
      toast.error(
        error?.message || `Scraping sub pages for this website failed..`
      );
    },
  });

  const uploadScrapedLinksIntoRagMutation = useMutation({
    mutationKey: ["upload-scrape-files-into-rag"],
    mutationFn: async (payload: {
      urls: any[];
      tags: string[];
      category: string;
      context: string;
    }) => {
      const res = await uploadIntoRag("/scrape/scrape-and-save", payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
      toast.success("Selected links uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload links");
    },
  });

  async function handleScrape() {
    try {
      setScrapeBtnState(true);
      if (scrappingLink === "") {
        toast.error("please paste the url to scrape");
        setScrapeBtnState(false);
        return;
      }
      await crawlLinksMutation.mutateAsync({ base_url: scrappingLink });
    } catch (error) {
      console.error("Scraping failed:", error);
    }
  }

  async function handleScrapeLinksUpload() {
    if (selectedLinks.length === 0) {
      toast.error("Please select at least one link to upload!");
      return;
    }

    try {
      const tagsArray: string[] = inputTag.split(",");
      const payload = {
        urls: selectedLinks.map((link) => {
          const urlObj = new URL(link);

          const web_id = urlObj.hostname;

          let page_title = link.split("/").pop();
          if (!page_title) page_title = "Home";

          return {
            base_url: link,
            web_id,
            page_title,
          };
        }),
        tags: tagsArray,
        category: category,
        context: context,
      };

      const res = await uploadScrapedLinksIntoRagMutation.mutateAsync(payload);
      if (res) {
        setScrapedLinks([]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  function toggleLinkSelection(url: string, checked: boolean) {
    setSelectedLinks((prev) =>
      checked ? [...prev, url] : prev.filter((u) => u !== url)
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Left panel */}
      <div className="h-auto lg:h-[calc(100vh-144px)] w-full lg:w-[380px] bg-blue-50 border border-gray-200 ml-2 rounded-md overflow-y-auto shadow-sm">
        <div className="flex flex-col gap-5 p-2">
          {/* Website URL input */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Website URL</p>
            <div className="flex items-center flex-col gap-2">
              <Input
                placeholder="Paste the URL"
                className="w-full rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
                value={scrappingLink}
                onChange={(e) => setScrappingLink(e.target.value)}
              />
              <div className="flex w-full justify-end">
                <Button
                  onClick={handleScrape}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md h-7 text-xs 3xl:text-sm"
                  disabled={scrapedBtnState}
                >
                  <Globe size={16} />
                  <span>Scrape &amp; Process</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Files list */}
          {scrapedLinks.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Created RAG Files
              </p>

              {/* Files list */}
              <div className="h-[200px] overflow-y-auto rounded-md bg-white shadow-sm">
                <ul className="space-y-3 p-2">
                  {scrapedLinks.map((scrape, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:bg-gray-50"
                    >
                      {scrape?.flag === true ? (
                        <>
                          <input
                            type="checkbox"
                            className="mt-1 cursor-not-allowed"
                            title="This link is already uploaded"
                            disabled
                          />
                          <div className="flex flex-col max-w-full">
                            <a
                              href={scrape?.url || "#"}
                              className="text-sm text-blue-600 hover:underline break-words max-w-full"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {scrape?.url ||
                                "https://www.saletable.ai/product/reporting/"}
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            className="mt-1 cursor-pointer"
                            onChange={(e) =>
                              toggleLinkSelection(scrape.url, e.target.checked)
                            }
                          />
                          <div className="flex flex-col max-w-full">
                            <a
                              href={scrape?.url || "#"}
                              className="text-xs text-blue-600 break-words hover:underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {scrape?.url ||
                                "https://www.saletable.ai/product/reporting/"}
                            </a>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata form */}
              <div className="space-y-4 w-full mt-5">
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm font-medium text-gray-700">
                    Tags
                  </Label>
                  <Input
                    placeholder="Enter Tags"
                    type="text"
                    className="rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-green-500"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Input
                    placeholder="Enter Category"
                    className="rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-green-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm font-medium text-gray-700">
                    Context
                  </Label>
                  <Textarea
                    placeholder="Enter Context"
                    className="rounded-md border bg-white border-gray-300 px-3 py-2 text-sm h-24 resize-none shadow-sm focus:ring-2 focus:ring-green-500"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-5">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-md"
                  onClick={() => {
                    handleScrapeLinksUpload();
                    setSelectedLinks([]);
                    setScrappingLink("");
                    setScrapeBtnState(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-md shadow-sm flex-1 overflow-x-auto mr-2 p-1">
        <UrlsTable />
      </div>
    </div>
  );
}
