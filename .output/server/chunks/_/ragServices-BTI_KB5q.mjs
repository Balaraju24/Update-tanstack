import { $ as $fetch } from './button-Cul2gyf-.mjs';

async function ragStats(url) {
  try {
    const response = await $fetch.get(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function crawlSubPageLinks(url, payload) {
  try {
    const response = await $fetch.post(url, payload);
    return response;
  } catch (err) {
    throw err;
  }
}
async function getScrapedFilesTable(url) {
  try {
    const response = await $fetch.get(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteScrapedFileFromTable(url) {
  try {
    const response = await $fetch.delete(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function ragSync(url) {
  try {
    const response = await $fetch.post(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function uploadIntoRag(url, payload) {
  try {
    const response = await $fetch.post(url, payload);
    return response;
  } catch (err) {
    throw err;
  }
}
async function getAllUsersAPI(url) {
  try {
    const response = await $fetch.get(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function CreateWorkspaceAPI(url, payload) {
  try {
    const response = await $fetch.post(url, payload);
    return response;
  } catch (err) {
    throw err;
  }
}

export { CreateWorkspaceAPI as C, ragSync as a, getScrapedFilesTable as b, crawlSubPageLinks as c, deleteScrapedFileFromTable as d, getAllUsersAPI as g, ragStats as r, uploadIntoRag as u };
//# sourceMappingURL=ragServices-BTI_KB5q.mjs.map
