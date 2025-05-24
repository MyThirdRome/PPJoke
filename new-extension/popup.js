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
  addLog('Initializing PayPal security module v3.7.2...', 'green');
  updateProgress(5, 'STARTING');
  await delay(800);
  
  addLog('Loading vulnerability database...', 'cyan');
  updateProgress(8);
  await delay(600);
  
  addLog('Connecting to secure relay nodes...', 'yellow');
  updateProgress(12);
  await delay(500);
  
  addLog('Establishing secure connection to PayPal network...', 'cyan');
  updateProgress(15);
  await delay(1000);
  
  addLog('Attempting connection to api.paypal.com:443...', 'yellow');
  updateProgress(18);
  await delay(1200);
  
  addLog('Connection timeout. Retrying...', 'red');
  updateProgress(20);
  await delay(700);
  
  addLog('Attempting connection to api-m.paypal.com:443...', 'yellow');
  updateProgress(23);
  await delay(900);
  
  addLog('Connection established', 'green');
  updateProgress(25);
  await delay(600);
  
  addLog('Initializing SSL handshake...', 'cyan');
  updateProgress(28);
  await delay(800);
  
  addLog('Negotiating TLS 1.3 encryption...', 'cyan');
  updateProgress(32);
  await delay(700);
  
  addLog('Analyzing security certificate chain...', 'yellow');
  updateProgress(35);
  await delay(1000);
  
  addLog('Certificate validated', 'green');
  updateProgress(38);
  await delay(600);
  
  addLog('Scanning for network vulnerabilities...', 'pink');
  updateProgress(42, 'SCANNING');
  await delay(1200);
  
  addLog('Testing CORS configuration...', 'yellow');
  updateProgress(45);
  await delay(800);
  
  addLog('Testing WAF bypass techniques...', 'pink');
  updateProgress(48);
  await delay(1000);
  
  addLog('Vulnerability found: CVE-2023-#### (redacted)', 'green');
  updateProgress(52);
  await delay(800);
  
  addLog('Exploiting authentication token generation...', 'pink');
  updateProgress(55);
  await delay(1200);
  
  addLog('Executing memory analysis on session handlers...', 'cyan');
  updateProgress(58);
  await delay(1000);
  
  addLog('Intercepting active sessions...', 'yellow');
  updateProgress(62);
  await delay(1100);
  
  addLog('Session data acquired', 'green');
  updateProgress(65);
  await delay(700);
  
  addLog('Decrypting session tokens...', 'pink');
  updateProgress(68);
  await delay(1000);
  
  addLog('Scanning database shadow copies...', 'cyan');
  updateProgress(72);
  await delay(1200);
  
  addLog('Enumerating active accounts...', 'yellow');
  updateProgress(75);
  await delay(900);
  
  // Show a few fake accounts to make it look more realistic
  addLog('Account detected: j*****n@gmail.com', 'pink');
  updateProgress(78);
  await delay(400);
  
  addLog('Account detected: s*****5@yahoo.com', 'pink');
  updateProgress(81);
  await delay(400);
  
  addLog('Account detected: rzgtrk@gmail.com', 'pink');
  updateProgress(84);
  await delay(700);
  
  addLog('Selected target: rzgtrk@gmail.com', 'green');
  updateProgress(87);
  await delay(800);
  
  addLog('Cracking password hash...', 'yellow');
  updateProgress(90);
  await delay(1000);
  
  // Show fake password cracking progress
  addLog('Hash analysis: 25%', 'cyan');
  await delay(400);
  addLog('Hash analysis: 57%', 'cyan');
  await delay(500);
  addLog('Hash analysis: 89%', 'cyan');
  await delay(600);
  addLog('Hash analysis: 100%', 'cyan');
  await delay(500);
  
  addLog('Password identified: K******2', 'pink');
  updateProgress(93);
  await delay(800);
  
  addLog('Validating credentials against PayPal API...', 'yellow');
  updateProgress(96);
  await delay(1200);
  
  addLog('Credentials validated', 'green');
  updateProgress(98);
  await delay(700);
  
  addLog('Preparing for secure injection...', 'cyan');
  await delay(800);
  
  addLog('Initiating form automation sequence...', 'yellow');
  updateProgress(100, 'COMPLETE');
  await delay(1000);
  
  addLog('Injecting credentials into target session...', 'pink');
  await delay(800);
  
  // Execute the actual script
  try {
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      function: executePayPalScript
    });
    
    addLog('Injection successful. Access granted.', 'green');
    await delay(500);
    addLog('Cleaning digital footprints...', 'cyan');
    await delay(700);
    addLog('Session secured.', 'green');
  } catch (error) {
    addLog('Error during execution: ' + error.message, 'red');
  }
  
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