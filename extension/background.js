chrome.action.onClicked.addListener((tab) => {
  console.log(chrome)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});