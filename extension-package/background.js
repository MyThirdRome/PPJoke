// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log("PayPal Scanner Extension installed");
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pageDetected") {
    console.log("PayPal login page detected:", sender.tab.url);
    sendResponse({ status: "acknowledged" });
  }
  
  // Keep the message channel open for asynchronous response
  return true;
});