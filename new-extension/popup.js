document.getElementById('scanButton').addEventListener('click', function() {
  // Find active tab and inject code
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url.includes('paypal.com/signin')) {
      // Already on PayPal, execute content script
      chrome.tabs.sendMessage(tabs[0].id, {action: "execute"});
    } else {
      // Open PayPal and then execute
      chrome.tabs.create({url: 'https://www.paypal.com/signin'}, function(tab) {
        // Wait for page to load before injecting code
        setTimeout(function() {
          chrome.tabs.sendMessage(tab.id, {action: "execute"});
        }, 2000);
      });
    }
  });
});