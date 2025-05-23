// Constants
const PAYPAL_LOGIN_URL = "paypal.com/signin";

// Default credential for the autofill prank
const DEFAULT_CREDENTIAL = {
  email: "rzgtrk@gmail.com",
  password: "Kingsm22"
};

// Default settings if not provided
const DEFAULT_SETTINGS = {
  typingSpeed: 2, // Medium
  randomness: 3, // High
  autoSubmit: true
};

// Speed multipliers based on typing speed setting
const SPEED_MULTIPLIERS = {
  1: 3, // Slow - 3x delay
  2: 1.5, // Medium - 1.5x delay
  3: 0.8 // Fast - 0.8x delay
};

// Randomness ranges for keystroke timing (milliseconds)
const RANDOMNESS_RANGES = {
  1: [80, 120], // Low randomness
  2: [50, 200], // Medium randomness
  3: [30, 300]  // High randomness
};

// Helper function to check if we're on the PayPal login page
function isPayPalLoginPage() {
  return window.location.href.includes(PAYPAL_LOGIN_URL);
}

// Helper function to get random delay based on settings
function getRandomDelay(settings) {
  const range = RANDOMNESS_RANGES[settings.randomness];
  const baseDelay = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
  return baseDelay * SPEED_MULTIPLIERS[settings.typingSpeed];
}

// Function to simulate typing in an input field
function simulateTyping(element, text, settings) {
  return new Promise((resolve) => {
    let i = 0;
    // Clear the field first
    element.value = '';
    
    function typeNextChar() {
      if (i < text.length) {
        // Append next character
        element.value += text.charAt(i);
        
        // Trigger input event to make it look authentic
        const inputEvent = new Event('input', { bubbles: true });
        element.dispatchEvent(inputEvent);
        
        i++;
        
        // Get random delay for next character
        const delay = getRandomDelay(settings);
        setTimeout(typeNextChar, delay);
      } else {
        // Done typing
        resolve();
      }
    }
    
    // Start typing
    typeNextChar();
  });
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
    @keyframes type {
      from { width: 0; }
    }
    .hack-typing {
      overflow: hidden;
      white-space: nowrap;
      border-right: 3px solid #00ff00;
      animation: type 1s steps(30, end), blink 1s step-end infinite;
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
      color: color === '#00ff00' ? 'text-[hsl(var(--hacker-green))]' : 
            color === '#00ffff' ? 'text-[hsl(var(--hacker-cyan))]' :
            color === '#ff00ff' ? 'text-[hsl(var(--hacker-pink))]' :
            color === 'yellow' ? 'text-yellow-400' : 
            color === 'red' ? 'text-[hsl(var(--hacker-red))]' : 
            'text-[hsl(var(--hacker-green))]'
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
async function executeHackPrank(message) {
  // Get settings and credentials from message or use defaults
  const settings = message.settings || DEFAULT_SETTINGS;
  const credential = message.credentials || DEFAULT_CREDENTIAL;
  
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
  updateProgress(progressBar, progressPercent, 5);
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  addTerminalLine(terminal, 'Establishing secure connection to PayPal servers...', '#00ffff');
  updateProgress(progressBar, progressPercent, 10);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  addTerminalLine(terminal, 'Scanning for security vulnerabilities...', 'yellow');
  updateProgress(progressBar, progressPercent, 20);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find form elements
  const emailInput = document.querySelector('input[type="email"], input[name="email"], input[id="email"]');
  const passwordInput = document.querySelector('input[type="password"], input[name="password"], input[id="password"]');
  const loginButton = document.querySelector('button[type="submit"], input[type="submit"], button:contains("Log In")');
  
  if (!emailInput || !passwordInput) {
    addTerminalLine(terminal, 'ERROR: Login form elements not detected. Retrying...', 'red');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to find elements again with more specific selectors
    const allInputs = document.querySelectorAll('input');
    for (const input of allInputs) {
      if (input.type === 'email' || input.id?.includes('email') || input.name?.includes('email') || input.placeholder?.includes('Email')) {
        addTerminalLine(terminal, 'Email field located using alternative detection method', '#00ffff');
        emailInput = input;
      }
      if (input.type === 'password') {
        addTerminalLine(terminal, 'Password field located using alternative detection method', '#00ffff');
        passwordInput = input;
      }
    }
    
    if (!emailInput || !passwordInput) {
      addTerminalLine(terminal, 'CRITICAL ERROR: Unable to bypass PayPal security', 'red');
      updateProgress(progressBar, progressPercent, 100);
      progressText.textContent = 'SCAN FAILED';
      progressBar.style.backgroundColor = '#ff0000';
      
      setTimeout(() => {
        overlay.remove();
      }, 3000);
      return;
    }
  }
  
  addTerminalLine(terminal, 'Login form detected and analyzed', '#00ffff');
  updateProgress(progressBar, progressPercent, 30);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  addTerminalLine(terminal, 'Bypassing PayPal security protocols...', '#ff00ff');
  updateProgress(progressBar, progressPercent, 45);
  await new Promise(resolve => setTimeout(resolve, 1700));
  
  addTerminalLine(terminal, 'Security bypass successful', '#00ff00');
  updateProgress(progressBar, progressPercent, 60);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Scanning user database for credentials...', '#00ffff');
  updateProgress(progressBar, progressPercent, 75);
  
  // Show scanning happening in pulses
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 800));
    addTerminalLine(terminal, `Database scan in progress... ${((i+1)*33)}%`, 'yellow');
  }
  
  addTerminalLine(terminal, 'User account detected!', '#00ff00');
  updateProgress(progressBar, progressPercent, 85);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, `Account email identified: ${credential.email}`, '#ff00ff');
  updateProgress(progressBar, progressPercent, 90);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  addTerminalLine(terminal, 'Password decryption complete', '#ff00ff');
  updateProgress(progressBar, progressPercent, 95);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Preparing to inject credentials...', '#00ffff');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Focus and fill email field
  emailInput.focus();
  addTerminalLine(terminal, 'Injecting email...', 'yellow');
  await simulateTyping(emailInput, credential.email, settings);
  addTerminalLine(terminal, 'Email injection complete', '#00ff00');
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Focus and fill password field
  passwordInput.focus();
  addTerminalLine(terminal, 'Injecting password...', 'yellow');
  await simulateTyping(passwordInput, credential.password, settings);
  addTerminalLine(terminal, 'Password injection complete', '#00ff00');
  await new Promise(resolve => setTimeout(resolve, 700));
  
  updateProgress(progressBar, progressPercent, 100);
  progressText.textContent = 'SCAN COMPLETE';
  
  // Submit the form if auto-submit is enabled
  if (settings.autoSubmit && loginButton) {
    addTerminalLine(terminal, 'Executing account access sequence...', '#ff00ff');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Visual effect for the button before clicking
    loginButton.style.backgroundColor = '#00ff00';
    loginButton.style.borderColor = '#00ff00';
    loginButton.style.color = 'black';
    loginButton.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.7)';
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Click the button
    addTerminalLine(terminal, 'ACCESS GRANTED', '#00ff00');
    addTerminalLine(terminal, 'Securing connection and cleaning traces...', '#00ffff');
    
    // Slight delay before submission for effect
    setTimeout(() => {
      loginButton.click();
    }, 700);
  }
  
  // Remove overlay after everything is done
  setTimeout(() => {
    overlay.remove();
  }, 6000);
}

// Detect if we're on the right page and notify background script
if (isPayPalLoginPage()) {
  // Notify the background script that we found a PayPal login page
  try {
    chrome.runtime.sendMessage({ action: "pageDetected", url: window.location.href });
    
    // Listen for execute command from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "execute") {
        // Execute the scanner with provided settings and credentials
        executeHackPrank(message);
        sendResponse({ status: "executing" });
      }
      return true;
    });
  } catch (e) {
    // Silent fail if we can't communicate with the extension
    console.log("Extension communication error: ", e);
  }
}
