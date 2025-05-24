// Listen for message from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "execute") {
    executeScript();
  }
});

// Execute immediately if we're already on PayPal signin page
if (window.location.href.includes('paypal.com/signin')) {
  // Wait a moment to make sure page is fully loaded
  setTimeout(executeScript, 1000);
}

// Function that executes your code
function executeScript() {
  // Function to simulate typing (for educational purposes)
  function simulateTyping(element, text, delay = 100) {
    if (!element) {
      console.error("Element not found!");
      return;
    }
    element.focus();
    element.value = ""; // Clear field first
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        element.value += text[i];
        element.dispatchEvent(new Event('input', { bubbles: true }));
        i++;
      } else {
        clearInterval(typingInterval);
        console.log("Typing simulation complete.");
      }
    }, delay);
  }

  // Fill email field (replace with a test email)
  const emailField = document.getElementById("email");
  if (emailField) {
    simulateTyping(emailField, "rzgtrk@gmail.com"); // Use a placeholder email
    console.log("Email field filled (simulated).");
  }

  // Click "Next" button (if needed)
  const nextButton = document.getElementById("btnNext");
  if (nextButton) {
    setTimeout(() => {
      nextButton.click();
      console.log("Next button clicked.");
    }, 2000);
  }

  // After next page loads, fill password (simulated)
  setTimeout(() => {
    const passwordField = document.getElementById("password");
    if (passwordField) {
      simulateTyping(passwordField, "Kingsm22"); // Use a fake password
      console.log("Password field filled (simulated).");
    }

    // Click "Log In" button
    setTimeout(() => {
      const loginButton = document.getElementById("btnLogin");
      if (loginButton) {
        loginButton.click();
        console.log("Login button clicked.");
      }
    }, 2000);
  }, 4000); // Wait for next page to load
}