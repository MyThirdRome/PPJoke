// DOM elements
const terminal = document.getElementById('terminal');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const scanButton = document.getElementById('scanButton');

// Function to add a log line to the terminal
function addLog(text, color = 'green') {
  const logLine = document.createElement('div');
  logLine.className = `log-line ${color}`;
  logLine.textContent = `> ${text}`;
  
  // Remove blinking cursor from previous last line
  const lastLine = terminal.querySelector('.blinking-cursor');
  if (lastLine) {
    lastLine.classList.remove('blinking-cursor');
  }
  
  // Add blinking cursor to new line
  logLine.classList.add('blinking-cursor');
  
  terminal.appendChild(logLine);
  terminal.scrollTop = terminal.scrollHeight;
}

// Function to update the progress bar
function updateProgress(percent, status = null) {
  progressBar.style.width = `${percent}%`;
  if (status) {
    progressText.textContent = status;
  } else {
    progressText.textContent = `${percent}%`;
  }
}

// Function to simulate a hacking scan
async function simulateScan(tabId) {
  // Disable the scan button
  scanButton.disabled = true;
  
  // Update the terminal with scanning messages
  addLog('Initializing PayPal security scan...', 'green');
  updateProgress(10, 'SCANNING');
  await delay(800);
  
  addLog('Establishing secure connection to PayPal servers...', 'cyan');
  updateProgress(20);
  await delay(800);
  
  addLog('Attempting connection to api.paypal.com...', 'yellow');
  updateProgress(30);
  await delay(1000);
  
  addLog('Connection failed. Retrying with alternative endpoint...', 'red');
  updateProgress(40);
  await delay(800);
  
  addLog('Connecting to secure.paypal.com...', 'yellow');
  updateProgress(50);
  await delay(600);
  
  addLog('Connection established successfully', 'green');
  updateProgress(60);
  await delay(800);
  
  addLog('Bypassing security protocols...', 'pink');
  updateProgress(70);
  await delay(1000);
  
  addLog('Scanning network for PayPal accounts...', 'cyan');
  updateProgress(80);
  await delay(1200);
  
  addLog('Account found: rzgtrk@gmail.com', 'pink');
  updateProgress(90);
  await delay(800);
  
  addLog('Password identified: ********', 'pink');
  updateProgress(95);
  await delay(600);
  
  addLog('Preparing for automated login...', 'yellow');
  await delay(800);
  
  addLog('Injecting credentials...', 'pink');
  updateProgress(100, 'COMPLETE');
  await delay(800);
  
  // Inject the script to fill credentials
  addLog('Login successful. Access granted.', 'green');
  
  // Execute the script in the PayPal tab
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    function: executePayPalScript
  });
  
  // Re-enable the scan button after a delay
  setTimeout(() => {
    scanButton.disabled = false;
  }, 2000);
}

// Helper function for delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Add click event listener to scan button
scanButton.addEventListener('click', function() {
  // Find active tab and inject code
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url.includes('paypal.com/signin')) {
      // Already on PayPal, run the simulation and then inject
      simulateScan(tabs[0].id);
    } else {
      // Open PayPal in a new tab
      chrome.tabs.create({url: 'https://www.paypal.com/signin'}, function(tab) {
        // Wait for page to load then run the simulation
        setTimeout(() => {
          simulateScan(tab.id);
        }, 1500);
      });
    }
  });
});

// This function will be injected into the page
function executePayPalScript() {
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

  // Fill email field
  const emailField = document.getElementById("email");
  if (emailField) {
    simulateTyping(emailField, "rzgtrk@gmail.com");
    console.log("Email field filled (simulated).");
  }

  // Click "Next" button
  const nextButton = document.getElementById("btnNext");
  if (nextButton) {
    setTimeout(() => {
      nextButton.click();
      console.log("Next button clicked.");
    }, 2000);
  }

  // After next page loads, fill password
  setTimeout(() => {
    const passwordField = document.getElementById("password");
    if (passwordField) {
      simulateTyping(passwordField, "Kingsm22");
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