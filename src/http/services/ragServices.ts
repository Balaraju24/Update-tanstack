import { $fetch } from "../fetch"

export async function ragStats(url:string){
    try{
        const response = await $fetch.get(url);
        return response;
    }catch(err){
        throw err
    }
}

export async function crawlSubPageLinks(url: string,payload: {}){
    try{
        const response = await $fetch.post(url,payload);
        return response
    }catch(err){
        throw err
    }
}

export async function  getScrapedFilesTable(url: string){
    try{
        const response = await $fetch.get(url);
        return response
    }catch(err){
        throw err
    }
}

export async function deleteScrapedFileFromTable(url:string){
    try{
        const response = await $fetch.delete(url);
        return response 
    }catch(err){
        throw err
    }
}

export async function ragSync(url: string){
    try{
        const response = await $fetch.post(url);
        return response
    }catch(err){
        throw err
    }
}

export async function uploadIntoRag(url:string,payload:{}){
    try{
        const response = await $fetch.post(url,payload);
        return response
    }catch(err){
        throw err
    }
}

export async function  getAllUsersAPI(url: string){
    try{
        const response = await $fetch.get(url);
        return response
    }catch(err){
        throw err
    }
}

export async function  CreateWorkspaceAPI(url:string,payload:{}){
    try{
        const response = await $fetch.post(url,payload);
        return response
    }catch(err){
        throw err
    }
}
