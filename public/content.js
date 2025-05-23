// Constants
const PAYPAL_LOGIN_URL = "paypal.com/signin";

// Mock credentials (for case where extension popup not opened)
const DEFAULT_CREDENTIALS = [
  {
    email: "user1@example.com",
    password: "hackerman123"
  },
  {
    email: "hacker420@mail.com",
    password: "securePass!"
  },
  {
    email: "anonymous@proton.me",
    password: "AnonyMouse2024"
  },
  {
    email: "paypal.victim@gmail.com",
    password: "PayMeNow2024!"
  }
];

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

// Helper function to get a random credential
function getRandomCredential() {
  const randomIndex = Math.floor(Math.random() * DEFAULT_CREDENTIALS.length);
  return DEFAULT_CREDENTIALS[randomIndex];
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

// Function to add a hacky-looking overlay to the page
function createHackOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'hack-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontFamily = '"Source Code Pro", monospace';
  overlay.style.color = '#00ff00';
  
  // Add terminal output to overlay
  const terminal = document.createElement('div');
  terminal.id = 'hack-terminal';
  terminal.style.width = '80%';
  terminal.style.maxWidth = '600px';
  terminal.style.height = '300px';
  terminal.style.backgroundColor = 'black';
  terminal.style.border = '1px solid #00ff00';
  terminal.style.borderRadius = '5px';
  terminal.style.padding = '10px';
  terminal.style.boxShadow = '0 0 10px #00ff00';
  terminal.style.overflowY = 'auto';
  terminal.style.fontSize = '14px';
  
  overlay.appendChild(terminal);
  document.body.appendChild(overlay);
  
  return {
    overlay,
    terminal
  };
}

// Function to add a terminal log line
function addTerminalLine(terminal, text, color = '#00ff00') {
  const line = document.createElement('div');
  line.textContent = `> ${text}`;
  line.style.color = color;
  line.style.marginBottom = '5px';
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
  
  // Also send message to extension popup
  chrome.runtime.sendMessage({
    type: 'log', 
    text, 
    color: color === '#00ff00' ? 'text-[hsl(var(--hacker-green))]' : 
           color === '#00ffff' ? 'text-[hsl(var(--hacker-cyan))]' :
           color === '#ff00ff' ? 'text-[hsl(var(--hacker-pink))]' :
           color === 'yellow' ? 'text-yellow-400' : 'text-[hsl(var(--hacker-green))]'
  });
}

// Main execution function
async function executeHackPrank(settings = DEFAULT_SETTINGS) {
  // Only run on PayPal login page
  if (!isPayPalLoginPage()) return;
  
  // Create overlay with terminal
  const { overlay, terminal } = createHackOverlay();
  
  // Find form elements
  const emailInput = document.querySelector('input[type="email"], input[name="email"], input[id="email"]');
  const passwordInput = document.querySelector('input[type="password"], input[name="password"], input[id="password"]');
  const loginButton = document.querySelector('button[type="submit"], input[type="submit"], button:contains("Log In")');
  
  if (!emailInput || !passwordInput) {
    addTerminalLine(terminal, 'ERROR: Unable to find login form elements', 'red');
    setTimeout(() => {
      overlay.remove();
    }, 3000);
    return;
  }
  
  // Get random credential
  const credential = getRandomCredential();
  
  // Start the "hacking" sequence
  addTerminalLine(terminal, 'Initializing autofill sequence...', '#00ff00');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Scanning form elements...', '#00ffff');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  addTerminalLine(terminal, 'Email field detected', '#00ffff');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  addTerminalLine(terminal, 'Password field detected', '#00ffff');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  addTerminalLine(terminal, 'Accessing credential database...', '#ff00ff');
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  addTerminalLine(terminal, `Selected target: ${credential.email}`, '#ff00ff');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Focus email field
  emailInput.focus();
  addTerminalLine(terminal, 'Beginning email input sequence...', 'yellow');
  
  // Type email
  await simulateTyping(emailInput, credential.email, settings);
  addTerminalLine(terminal, 'Email input complete', '#00ff00');
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Focus password field
  passwordInput.focus();
  addTerminalLine(terminal, 'Beginning password input sequence...', 'yellow');
  
  // Type password
  await simulateTyping(passwordInput, credential.password, settings);
  addTerminalLine(terminal, 'Password input complete', '#00ff00');
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Submit if auto-submit is enabled
  if (settings.autoSubmit && loginButton) {
    addTerminalLine(terminal, 'Preparing form submission...', '#ff00ff');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addTerminalLine(terminal, 'Executing login sequence...', 'yellow');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Highlight button as "hacked"
    loginButton.style.backgroundColor = '#00ff00';
    loginButton.style.borderColor = '#00ff00';
    loginButton.style.color = 'black';
    loginButton.style.boxShadow = '0 0 10px #00ff00';
    
    // Click the button
    loginButton.click();
    
    addTerminalLine(terminal, 'Login command executed. Access granted.', '#00ff00');
  } else {
    addTerminalLine(terminal, 'Auto-submit disabled. Ready for manual submission.', 'yellow');
  }
  
  // Remove overlay after a few seconds
  setTimeout(() => {
    overlay.remove();
  }, 5000);
}

// Detect if we're on the right page and notify background script
if (isPayPalLoginPage()) {
  chrome.runtime.sendMessage({ action: "pageDetected", url: window.location.href });
  
  // Listen for execute command from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "execute") {
      // Execute prank with provided settings
      executeHackPrank(message.settings);
      sendResponse({ status: "executing" });
    }
    return true;
  });
}
