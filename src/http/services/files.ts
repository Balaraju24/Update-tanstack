import { $fetch } from "../fetch"


export async function getFilesList(url: string){
    try{
        const response = await $fetch.get(url);
        return response
    }catch(err){
        throw err
    }
}

export async function deleteFile(url:string){
    try{
        const response = await $fetch.delete(url);
        return response 
    }catch(err){
        throw err
    }
}

export async function uploadFilesIntoSignedUrl(url: string, payload: {}){
    try{
        const response = await $fetch.post(url, payload);
        return response
    }catch(err){
        throw err
    }
}

export async function uploadFilesIntoR2(url: string, payload: {}){
    try{
        const response = await $fetch.post(url,payload);
        return response
    }catch(err){
        throw err
    }
}

