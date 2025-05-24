// Constants
const PAYPAL_LOGIN_URL = "paypal.com/signin";

// Helper function to check if we're on the PayPal login page
function isPayPalLoginPage() {
  return window.location.href.includes(PAYPAL_LOGIN_URL);
}

// Function to add a professional-looking hacker overlay to the page
function createHackOverlay() {
  // Create main overlay
  const overlay = document.createElement('div');
  overlay.id = 'hack-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontFamily = 'monospace';
  overlay.style.color = '#00ff00';
  
  // Add scan effect
  const scanline = document.createElement('div');
  scanline.style.position = 'absolute';
  scanline.style.top = '0';
  scanline.style.left = '0';
  scanline.style.width = '100%';
  scanline.style.height = '2px';
  scanline.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
  scanline.style.boxShadow = '0 0 15px 0 rgba(0, 255, 0, 0.5)';
  scanline.style.animation = 'scan 3s linear infinite';
  overlay.appendChild(scanline);
  
  // Add animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scan {
      0% { top: 0%; }
      100% { top: 100%; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Add logo and title
  const header = document.createElement('div');
  header.style.marginBottom = '20px';
  header.style.textAlign = 'center';
  
  const title = document.createElement('h1');
  title.textContent = 'PayPal Security Scanner';
  title.style.color = '#00ff00';
  title.style.fontSize = '24px';
  title.style.fontWeight = 'bold';
  title.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
  header.appendChild(title);
  
  const subtitle = document.createElement('div');
  subtitle.textContent = 'UNAUTHORIZED ACCESS DETECTED';
  subtitle.style.color = '#ff00ff';
  subtitle.style.fontSize = '12px';
  subtitle.style.marginTop = '5px';
  header.appendChild(subtitle);
  
  overlay.appendChild(header);
  
  // Add terminal output to overlay
  const terminal = document.createElement('div');
  terminal.id = 'hack-terminal';
  terminal.style.width = '80%';
  terminal.style.maxWidth = '700px';
  terminal.style.height = '350px';
  terminal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  terminal.style.border = '1px solid #00ff00';
  terminal.style.borderRadius = '5px';
  terminal.style.padding = '15px';
  terminal.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
  terminal.style.overflowY = 'auto';
  terminal.style.fontSize = '14px';
  terminal.style.lineHeight = '1.5';
  terminal.style.fontFamily = 'monospace';
  
  overlay.appendChild(terminal);
  
  // Add progress bar container
  const progressContainer = document.createElement('div');
  progressContainer.style.width = '80%';
  progressContainer.style.maxWidth = '700px';
  progressContainer.style.marginTop = '20px';
  
  const progressLabel = document.createElement('div');
  progressLabel.style.display = 'flex';
  progressLabel.style.justifyContent = 'space-between';
  progressLabel.style.marginBottom = '5px';
  
  const progressText = document.createElement('span');
  progressText.textContent = 'SCANNING';
  progressText.id = 'progress-text';
  progressText.style.fontSize = '12px';
  progressText.style.color = '#00ffff';
  
  const progressPercent = document.createElement('span');
  progressPercent.textContent = '0%';
  progressPercent.id = 'progress-percent';
  progressPercent.style.fontSize = '12px';
  progressPercent.style.color = '#00ffff';
  
  progressLabel.appendChild(progressText);
  progressLabel.appendChild(progressPercent);
  progressContainer.appendChild(progressLabel);
  
  const progressBarBg = document.createElement('div');
  progressBarBg.style.width = '100%';
  progressBarBg.style.height = '8px';
  progressBarBg.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  progressBarBg.style.borderRadius = '4px';
  progressBarBg.style.overflow = 'hidden';
  
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  progressBar.style.height = '100%';
  progressBar.style.width = '0%';
  progressBar.style.backgroundColor = '#00ffff';
  progressBar.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
  progressBar.style.transition = 'width 0.5s ease-in-out';
  
  progressBarBg.appendChild(progressBar);
  progressContainer.appendChild(progressBarBg);
  overlay.appendChild(progressContainer);
  
  document.body.appendChild(overlay);
  
  return {
    overlay,
    terminal,
    progressBar,
    progressPercent,
    progressText
  };
}

// Function to add a terminal log line
function addTerminalLine(terminal, text, color = '#00ff00') {
  const line = document.createElement('div');
  line.textContent = `> ${text}`;
  line.style.color = color;
  line.style.marginBottom = '6px';
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
  
  // Try to send message to extension popup
  try {
    chrome.runtime.sendMessage({
      type: 'log', 
      text, 
      color
    });
  } catch (e) {
    // Silent fail if we can't communicate with the popup
  }
}

// Function to update progress bar
function updateProgress(progressBar, progressPercent, value) {
  if (progressBar && progressPercent) {
    progressBar.style.width = `${value}%`;
    progressPercent.textContent = `${value}%`;
  }
}

// Main execution function
async function executeHackPrank() {
  // Only run on PayPal login page
  if (!isPayPalLoginPage()) {
    // If not on the login page, try to navigate there
    window.location.href = "https://www.paypal.com/signin";
    return;
  }
  
  // Create overlay with terminal
  const { overlay, terminal, progressBar, progressPercent, progressText } = createHackOverlay();
  
  // Start the "hacking" sequence
  addTerminalLine(terminal, 'Initializing PayPal security scan...', '#00ff00');
  updateProgress(progressBar, progressPercent, 20);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Establishing secure connection to PayPal servers...', '#00ffff');
  updateProgress(progressBar, progressPercent, 40);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Scanning for security vulnerabilities...', 'yellow');
  updateProgress(progressBar, progressPercent, 60);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Account found: rzgtrk@gmail.com', '#ff00ff');
  updateProgress(progressBar, progressPercent, 80);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Password identified: ********', '#ff00ff');
  updateProgress(progressBar, progressPercent, 90);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Preparing for automated login...', 'yellow');
  updateProgress(progressBar, progressPercent, 95);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Injecting credentials...', '#ff00ff');
  updateProgress(progressBar, progressPercent, 100);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Remove the overlay
  overlay.remove();
  
  // Inject your exact code
  const scriptEl = document.createElement('script');
  scriptEl.textContent = `
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
  `;
  document.body.appendChild(scriptEl);
}

// Detect if we're on the PayPal login page
if (isPayPalLoginPage()) {
  try {
    // Notify the background script that we found a PayPal login page
    chrome.runtime.sendMessage({ action: "pageDetected", url: window.location.href });
    
    // Listen for execute command from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "execute") {
        // Execute the scanner
        executeHackPrank();
        sendResponse({ status: "executing" });
      }
      return true;
    });
  } catch (e) {
    // Silent fail if we can't communicate with the extension
    console.log("Extension communication error: ", e);
  }
}