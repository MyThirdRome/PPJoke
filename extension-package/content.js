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
    
    // Also try to dispatch clear events
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    
    function typeNextChar() {
      if (i < text.length) {
        // Append next character
        element.value += text.charAt(i);
        
        // Trigger input event to make it look authentic
        const inputEvent = new Event('input', { bubbles: true });
        element.dispatchEvent(inputEvent);
        
        // Try more events that might be needed
        element.dispatchEvent(new Event('change', { bubbles: true }));
        element.dispatchEvent(new KeyboardEvent('keydown', { key: text.charAt(i), bubbles: true }));
        element.dispatchEvent(new KeyboardEvent('keypress', { key: text.charAt(i), bubbles: true }));
        element.dispatchEvent(new KeyboardEvent('keyup', { key: text.charAt(i), bubbles: true }));
        
        i++;
        
        // Get random delay for next character
        const delay = getRandomDelay(settings);
        setTimeout(typeNextChar, delay);
      } else {
        // Make sure the field has the complete text
        element.value = text;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        
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
      color: color === '#00ff00' ? 'text-green-500' : 
            color === '#00ffff' ? 'text-cyan-500' :
            color === '#ff00ff' ? 'text-pink-500' :
            color === 'yellow' ? 'text-yellow-400' : 
            color === 'red' ? 'text-red-500' : 
            'text-green-500'
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
  updateProgress(progressBar, progressPercent, 15);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  addTerminalLine(terminal, 'Scanning for security vulnerabilities...', 'yellow');
  updateProgress(progressBar, progressPercent, 25);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Target PayPal's specific elements by ID and name (based on your HTML)
  let emailInput = document.querySelector('#email, input[name="login_email"]');
  let passwordInput = document.querySelector('#password, input[name="login_password"]');
  let nextButton = document.querySelector('#btnNext, button[name="btnNext"]');
  let loginButton = document.querySelector('#btnLogin, button[name="btnLogin"]');
  
  // If still can't find elements, try more generic selectors
  if (!emailInput) {
    const allInputs = document.querySelectorAll('input');
    for (const input of allInputs) {
      if (input.type === 'email' || input.type === 'text' || 
          input.id?.toLowerCase().includes('email') || 
          input.name?.toLowerCase().includes('email') || 
          input.placeholder?.toLowerCase().includes('email') ||
          input.autocomplete === 'email') {
        emailInput = input;
        break;
      }
    }
  }
  
  // Try to find Next button by looking for blue buttons
  if (!nextButton) {
    const allButtons = document.querySelectorAll('button');
    for (const button of allButtons) {
      // Try to find a blue button that might be the Next button
      const style = window.getComputedStyle(button);
      const bgColor = style.backgroundColor.toLowerCase();
      const textContent = button.textContent.toLowerCase();
      
      if ((bgColor.includes('blue') || bgColor.includes('rgb(0, 0, 255)') || 
           bgColor.includes('rgb(0, 0, 238)') || button.className.includes('blue')) && 
          (textContent.includes('next') || textContent.includes('continue'))) {
        nextButton = button;
        break;
      }
    }
  }
  
  if (!emailInput) {
    addTerminalLine(terminal, 'ERROR: Email field not detected. Retrying...', 'red');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to find elements again with more specific selectors
    const allInputs = document.querySelectorAll('input');
    for (const input of allInputs) {
      if (input.type === 'email' || input.id?.includes('email') || input.name?.includes('email') || input.placeholder?.includes('Email')) {
        addTerminalLine(terminal, 'Email field located using alternative detection method', '#00ffff');
        emailInput = input;
        break;
      }
    }
    
    if (!emailInput) {
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
  updateProgress(progressBar, progressPercent, 35);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  addTerminalLine(terminal, 'Bypassing PayPal security protocols...', '#ff00ff');
  updateProgress(progressBar, progressPercent, 45);
  await new Promise(resolve => setTimeout(resolve, 1700));
  
  addTerminalLine(terminal, 'Security bypass successful', '#00ff00');
  updateProgress(progressBar, progressPercent, 55);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  addTerminalLine(terminal, 'Scanning user database for credentials...', '#00ffff');
  updateProgress(progressBar, progressPercent, 65);
  
  // Email address character by character matching animation
  const targetEmail = credential.email;
  let currentEmail = "";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789@._-";
  
  addTerminalLine(terminal, 'Matching email pattern...', 'yellow');
  
  // Function to animate each character of email being "found"
  for (let i = 0; i < targetEmail.length; i++) {
    let attemptChar = "";
    // For each position, try different characters rapidly
    for (let j = 0; j < Math.min(3, chars.length); j++) {
      attemptChar = chars.charAt(Math.floor(Math.random() * chars.length));
      currentEmail = currentEmail.substring(0, i) + attemptChar + (i > 0 ? targetEmail.substring(i + 1) : "");
      addTerminalLine(terminal, `Analyzing pattern: ${currentEmail}`, '#00ffff');
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    
    // Then set the correct character
    currentEmail = targetEmail.substring(0, i + 1) + (i < targetEmail.length - 1 ? targetEmail.substring(i + 1) : "");
    addTerminalLine(terminal, `Character match found: ${currentEmail}`, '#00ff00');
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  addTerminalLine(terminal, `Account email confirmed: ${targetEmail}`, '#ff00ff');
  updateProgress(progressBar, progressPercent, 75);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Now animate the email injection
  addTerminalLine(terminal, 'Preparing to inject credentials...', '#00ffff');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Prepare to remove overlay and fill the email field
  addTerminalLine(terminal, 'Executing email injection...', '#ff00ff');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Log more details for debugging
  addTerminalLine(terminal, 'Form fields detected: ' + (emailInput ? 'Email ✓' : 'Email ✗') + 
                           ' ' + (nextButton ? 'Next Button ✓' : 'Next Button ✗'), '#00ffff');
  
  // If we can't find the email input, try one last time with the most generic approach
  if (!emailInput) {
    addTerminalLine(terminal, 'Attempting alternate field detection...', 'yellow');
    // Try to find ANY input field that's visible and empty
    const allInputs = document.querySelectorAll('input');
    for (const input of allInputs) {
      if (input.offsetParent !== null && // Is visible
          (input.value === '' || input.value.length < 3) && // Is empty or has placeholder
          !input.disabled && 
          input.type !== 'hidden' && 
          input.type !== 'checkbox' && 
          input.type !== 'radio') {
        emailInput = input;
        addTerminalLine(terminal, 'Generic input field found', '#00ff00');
        break;
      }
    }
  }
  
  // Also try to find any blue button if we couldn't find Next
  if (!nextButton) {
    const allElements = document.querySelectorAll('button, input[type="submit"], a.button, div[role="button"]');
    for (const element of allElements) {
      if (element.offsetParent !== null && // Is visible
          (element.textContent.includes('Next') || 
           element.textContent.includes('Continue') || 
           element.value === 'Next' ||
           element.id.includes('next') ||
           element.className.includes('next'))) {
        nextButton = element;
        addTerminalLine(terminal, 'Next button found with generic detection', '#00ff00');
        break;
      }
    }
  }
  
  // Hide and remove overlay to fill in email
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.5s ease';
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Completely remove the overlay from DOM
  overlay.remove();
  
  // PayPal-specific direct approach
  console.log("Attempting to fill email field using special PayPal handling");
  
  // Try multiple approaches to find and fill the email input
  try {
    // Direct approach for PayPal
    if (emailInput) {
      emailInput.focus();
      
      // Set the value directly for the fastest approach
      emailInput.value = credential.email;
      
      // Trigger all possible events
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      emailInput.dispatchEvent(new Event('blur', { bubbles: true }));
      
      console.log("Email field filled with direct method:", credential.email);
    } else {
      console.log("Email input element not found, trying alternative methods");
      
      // Try to use document.execCommand
      document.execCommand('insertText', false, credential.email);
      
      // Try to find the form and set it programmatically
      const form = document.querySelector('form');
      if (form) {
        const inputs = form.querySelectorAll('input');
        for (const input of inputs) {
          if (input.type !== 'hidden' && input.offsetParent !== null) {
            input.value = credential.email;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            console.log("Found visible input in form:", input);
          }
        }
      }
    }
    
    // Super aggressive approach - inject a script directly into the page
    const scriptEl = document.createElement('script');
    scriptEl.textContent = `
      // Try to find any visible input
      const allInputs = document.querySelectorAll('input');
      for (const input of allInputs) {
        if (input.offsetParent !== null && input.type !== 'hidden') {
          input.value = "${credential.email}";
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          console.log("Injected script filled input:", input);
        }
      }
    `;
    document.body.appendChild(scriptEl);
    scriptEl.remove();
    
  } catch (error) {
    console.log("Error during email fill:", error);
  }
  
  // Find Next button and click it if present
  try {
    console.log("Attempting to click Next button...");
    
    // Try to use the specific PayPal Next button
    if (nextButton) {
      console.log("Found PayPal Next button by ID/name:", nextButton);
      
      // Add visual highlight to the Next button
      nextButton.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
      
      // Use the most direct approach to click it
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Try multiple methods to click
      nextButton.focus();
      nextButton.click();
      
      // Inject a script to click the specific PayPal button by ID
      const scriptEl = document.createElement('script');
      scriptEl.textContent = `
        // Try to click PayPal's specific Next button
        setTimeout(function() {
          const nextBtn = document.querySelector('#btnNext, button[name="btnNext"]');
          if (nextBtn) {
            console.log("Clicking PayPal Next button via injected script");
            nextBtn.click();
          }
        }, 500);
      `;
      document.body.appendChild(scriptEl);
      
      console.log("All Next button click attempts completed");
    } else {
      // PayPal button not found by ID, try to find any Next button
      console.log("PayPal Next button not found by ID, trying alternative methods");
      
      // Try by text content
      const allButtons = document.querySelectorAll('button, input[type="submit"]');
      for (const button of allButtons) {
        if (button.offsetParent !== null && // Is visible
            (button.textContent.trim() === 'Next' || 
             button.value === 'Next')) {
          nextButton = button;
          console.log("Found Next button by text:", button);
          nextButton.click();
          break;
        }
      }
      
      // If still not found, try form submission
      if (!nextButton) {
        const form = document.querySelector('form');
        if (form) {
          console.log("Submitting form directly");
          try {
            form.submit();
          } catch (e) {
            console.log("Error submitting form:", e);
          }
        }
      }
    }
    
    // Wait for page to transition to password field
    await new Promise(resolve => setTimeout(resolve, 1500));
  } catch (error) {
    console.log("Error clicking Next button:", error);
  }
  
  // We'll let the background script handle the password page when it loads
  return;
  
  // Remove overlay after everything is done
  setTimeout(() => {
    overlay.remove();
  }, 6000);
}

// Function to check if we're on the PayPal password page
function isPayPalPasswordPage() {
  return window.location.href.includes(PAYPAL_LOGIN_URL) && 
         document.querySelector('input[type="password"]') !== null;
}

// Function to handle the password page
async function handlePasswordPage(settings, credential) {
  // Find PayPal's specific password field and login button by ID
  const passwordInput = document.querySelector('#password, input[name="login_password"]');
  const loginButton = document.querySelector('#btnLogin, button[name="btnLogin"]');
  
  if (!passwordInput) {
    console.log("PayPal password field not found, trying generic selectors");
    const allInputs = document.querySelectorAll('input[type="password"]');
    if (allInputs.length > 0) {
      passwordInput = allInputs[0];
    } else {
      console.log("No password field found at all");
      return;
    }
  }
  
  // Create a simpler overlay for password page
  const { overlay, terminal, progressBar, progressPercent, progressText } = createHackOverlay();
  
  // Start password hacking sequence
  addTerminalLine(terminal, 'Detecting PayPal password screen...', '#00ff00');
  updateProgress(progressBar, progressPercent, 60);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  addTerminalLine(terminal, 'Continuing account access sequence...', '#00ffff');
  updateProgress(progressBar, progressPercent, 70);
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Password animation (simplified)
  addTerminalLine(terminal, 'Decrypting secure password...', '#ff00ff');
  updateProgress(progressBar, progressPercent, 80);
  
  // Show a quick password decryption sequence
  const targetPassword = credential.password;
  let currentPassword = "*".repeat(targetPassword.length);
  
  // Simple password reveal animation
  for (let i = 0; i < 3; i++) {
    addTerminalLine(terminal, `Password analysis: ${i*30}%`, 'yellow');
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  
  addTerminalLine(terminal, 'Password decryption complete', '#00ff00');
  updateProgress(progressBar, progressPercent, 90);
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Hide overlay to fill password
  overlay.style.opacity = '0';
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove overlay entirely
  overlay.remove();
  
  console.log("Filling PayPal password field");
  
  // Direct method for setting the password
  try {
    // Focus and fill password field
    passwordInput.focus();
    passwordInput.value = credential.password;
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Also inject a script to set the password directly
    const scriptEl = document.createElement('script');
    scriptEl.textContent = `
      setTimeout(function() {
        const pwField = document.querySelector('#password, input[name="login_password"]');
        if (pwField) {
          pwField.value = "${credential.password}";
          pwField.dispatchEvent(new Event('input', { bubbles: true }));
          pwField.dispatchEvent(new Event('change', { bubbles: true }));
          console.log("Password set via injected script");
        }
      }, 300);
    `;
    document.body.appendChild(scriptEl);
    
    // Click login button if present
    if (loginButton) {
      // Highlight the login button
      loginButton.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Click the login button directly
      loginButton.click();
      
      // Also try to click it via injected script
      const loginScriptEl = document.createElement('script');
      loginScriptEl.textContent = `
        setTimeout(function() {
          const loginBtn = document.querySelector('#btnLogin, button[name="btnLogin"]');
          if (loginBtn) {
            loginBtn.click();
            console.log("Login button clicked via injected script");
          }
        }, 800);
      `;
      document.body.appendChild(loginScriptEl);
    }
  } catch (error) {
    console.log("Error during password fill or login:", error);
  }
}

// Detect which PayPal page we're on and notify background script
if (isPayPalLoginPage()) {
  // Check if we're on the password page specifically
  const isPasswordPage = isPayPalPasswordPage();
  
  // Notify the background script that we found a PayPal page
  try {
    chrome.runtime.sendMessage({ 
      action: "pageDetected", 
      url: window.location.href,
      isPasswordPage: isPasswordPage
    });
    
    // Listen for messages from popup or background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "execute") {
        if (isPasswordPage) {
          // Handle password page differently
          handlePasswordPage(message.settings || DEFAULT_SETTINGS, message.credentials || DEFAULT_CREDENTIAL);
        } else {
          // Execute the scanner with provided settings and credentials
          executeHackPrank(message);
        }
        sendResponse({ status: "executing" });
      }
      else if (message.action === "checkPasswordPage") {
        // Respond with whether this is the password page
        sendResponse({ isPasswordPage: isPasswordPage });
      }
      return true;
    });
  } catch (e) {
    // Silent fail if we can't communicate with the extension
    console.log("Extension communication error: ", e);
  }
}