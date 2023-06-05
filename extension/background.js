chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

chrome.webRequest.onResponseStarted.addListener(
  async (details) => {
    if (details && details.method === "PATCH") {
      if (details.statusCode === 200) {
        console.log('accepted 1')
        const tab = await chrome.tabs.query({ active: true, currentWindow: true })
        const response = await chrome.tabs.sendMessage(tab[0].id, { action: "Hello Mom!" })
        console.log(response)
        console.log('from extension')
      } else {
        console.log('rejected')
      }
    }
  },
  { urls: ["https://seller.wildberries.ru/ns/proxy/feedbacks-questions-suppliers-proxy/api/v1/feedbacks*"] },
  ['responseHeaders']
);