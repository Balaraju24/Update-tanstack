import { $fetch } from "../fetch";

export async function userSignin(url: string, payload: {}){
    try{
        const response = await $fetch.post(url, payload);
        return response 
    }catch(err){
        console.log(err);
        throw err
    }
}

export async function verifyWithOtp(url: string, payload: {}){
    try{
        const response = await $fetch.post(url, payload);
        return response
    }catch(err){
        throw err
    }
}