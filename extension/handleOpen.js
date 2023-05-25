if (document.querySelector('#feedbackSolver')) {
  document.querySelector('#feedbackSolver').remove()
} else {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
}