// Listen for message from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "execute") {
    showHackingOverlay();
  }
});

// Function to create an overlay on the PayPal page
function showHackingOverlay() {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'hacking-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.backdropFilter = 'blur(3px)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontFamily = 'monospace';
  overlay.style.color = '#00ff00';
  
  // Add scanning animation
  const scanline = document.createElement('div');
  scanline.style.position = 'absolute';
  scanline.style.top = '0';
  scanline.style.left = '0';
  scanline.style.width = '100%';
  scanline.style.height = '2px';
  scanline.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
  scanline.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
  scanline.style.animation = 'scan 3s linear infinite';
  overlay.appendChild(scanline);
  
  // Add animation styles
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
  
  // Create terminal container
  const terminal = document.createElement('div');
  terminal.style.width = '80%';
  terminal.style.maxWidth = '800px';
  terminal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  terminal.style.border = '1px solid #00ff00';
  terminal.style.borderRadius = '5px';
  terminal.style.padding = '15px';
  terminal.style.maxHeight = '300px';
  terminal.style.overflowY = 'auto';
  terminal.style.marginBottom = '20px';
  terminal.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
  
  // Create progress container
  const progressContainer = document.createElement('div');
  progressContainer.style.width = '80%';
  progressContainer.style.maxWidth = '800px';
  progressContainer.style.display = 'flex';
  progressContainer.style.flexDirection = 'column';
  
  // Create progress text
  const progressText = document.createElement('div');
  progressText.style.display = 'flex';
  progressText.style.justifyContent = 'space-between';
  progressText.style.marginBottom = '5px';
  
  const progressLabel = document.createElement('span');
  progressLabel.textContent = 'SCANNING';
  progressLabel.style.color = '#00ffff';
  
  const progressPercent = document.createElement('span');
  progressPercent.textContent = '0%';
  progressPercent.style.color = '#00ffff';
  
  progressText.appendChild(progressLabel);
  progressText.appendChild(progressPercent);
  progressContainer.appendChild(progressText);
  
  // Create progress bar
  const progressBarContainer = document.createElement('div');
  progressBarContainer.style.width = '100%';
  progressBarContainer.style.height = '10px';
  progressBarContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  progressBarContainer.style.border = '1px solid #00ff00';
  progressBarContainer.style.borderRadius = '5px';
  progressBarContainer.style.overflow = 'hidden';
  
  const progressBar = document.createElement('div');
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.style.backgroundColor = '#00ff00';
  progressBar.style.transition = 'width 0.3s ease';
  progressBar.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
  
  progressBarContainer.appendChild(progressBar);
  progressContainer.appendChild(progressBarContainer);
  
  // Add terminal and progress to overlay
  overlay.appendChild(terminal);
  overlay.appendChild(progressContainer);
  document.body.appendChild(overlay);
  
  // Function to add log messages
  function addLog(text, color = '#00ff00') {
    const logLine = document.createElement('div');
    logLine.textContent = `> ${text}`;
    logLine.style.color = color;
    logLine.style.marginBottom = '5px';
    terminal.appendChild(logLine);
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Function to update progress
  function updateProgress(percent, status = null) {
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    if (status) {
      progressLabel.textContent = status;
    }
  }
  
  // Helper function for delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Start the hacking simulation
  async function runHackingSimulation() {
    // Phase 1: Connection and Vulnerability Scan
    addLog('Initializing PayPal security module v3.7.2...', '#00ff00');
    updateProgress(5, 'STARTING');
    await delay(800);
    
    addLog('Loading vulnerability database...', '#00ffff');
    updateProgress(8);
    await delay(600);
    
    addLog('Connecting to secure relay nodes...', '#ffff00');
    updateProgress(12);
    await delay(500);
    
    addLog('Establishing secure connection to PayPal network...', '#00ffff');
    updateProgress(15);
    await delay(1000);
    
    addLog('Attempting connection to api.paypal.com:443...', '#ffff00');
    updateProgress(18);
    await delay(1200);
    
    addLog('Connection timeout. Retrying...', '#ff0000');
    updateProgress(20);
    await delay(700);
    
    addLog('Attempting connection to api-m.paypal.com:443...', '#ffff00');
    updateProgress(23);
    await delay(900);
    
    addLog('Connection established', '#00ff00');
    updateProgress(25);
    await delay(600);
    
    // Phase 2: Security Tests
    addLog('Initializing SSL handshake...', '#00ffff');
    updateProgress(28);
    await delay(800);
    
    addLog('Negotiating TLS 1.3 encryption...', '#00ffff');
    updateProgress(32);
    await delay(700);
    
    addLog('Analyzing security certificate chain...', '#ffff00');
    updateProgress(35);
    await delay(1000);
    
    addLog('Certificate validated', '#00ff00');
    updateProgress(38);
    await delay(600);
    
    addLog('Scanning for network vulnerabilities...', '#ff00ff');
    updateProgress(42, 'SCANNING');
    await delay(1200);
    
    addLog('Testing CORS configuration...', '#ffff00');
    updateProgress(45);
    await delay(800);
    
    addLog('Testing WAF bypass techniques...', '#ff00ff');
    updateProgress(48);
    await delay(1000);
    
    addLog('Vulnerability found: CVE-2023-#### (redacted)', '#00ff00');
    updateProgress(52);
    await delay(800);
    
    // Phase 3: Account Extraction
    addLog('Exploiting authentication token generation...', '#ff00ff');
    updateProgress(55);
    await delay(1200);
    
    addLog('Executing memory analysis on session handlers...', '#00ffff');
    updateProgress(58);
    await delay(1000);
    
    addLog('Intercepting active sessions...', '#ffff00');
    updateProgress(62);
    await delay(1100);
    
    addLog('Session data acquired', '#00ff00');
    updateProgress(65);
    await delay(700);
    
    addLog('Decrypting session tokens...', '#ff00ff');
    updateProgress(68);
    await delay(1000);
    
    addLog('Scanning database shadow copies...', '#00ffff');
    updateProgress(72);
    await delay(1200);
    
    addLog('Enumerating active accounts...', '#ffff00');
    updateProgress(75);
    await delay(900);
    
    // Show a few fake accounts
    addLog('Account detected: j*****n@gmail.com', '#ff00ff');
    updateProgress(78);
    await delay(400);
    
    addLog('Account detected: s*****5@yahoo.com', '#ff00ff');
    updateProgress(81);
    await delay(400);
    
    addLog('Account detected: rzgtrk@gmail.com', '#ff00ff');
    updateProgress(84);
    await delay(700);
    
    addLog('Selected target: rzgtrk@gmail.com', '#00ff00');
    updateProgress(87);
    await delay(800);
    
    // Phase 4: Password Cracking
    addLog('Cracking password hash...', '#ffff00');
    updateProgress(90);
    await delay(1000);
    
    // Show fake password cracking progress
    addLog('Hash analysis: 25%', '#00ffff');
    await delay(400);
    addLog('Hash analysis: 57%', '#00ffff');
    await delay(500);
    addLog('Hash analysis: 89%', '#00ffff');
    await delay(600);
    addLog('Hash analysis: 100%', '#00ffff');
    await delay(500);
    
    addLog('Password identified: K******2', '#ff00ff');
    updateProgress(93);
    await delay(800);
    
    addLog('Validating credentials against PayPal API...', '#ffff00');
    updateProgress(96);
    await delay(1200);
    
    addLog('Credentials validated', '#00ff00');
    updateProgress(98);
    await delay(700);
    
    // Phase 5: Execution
    addLog('Preparing for secure injection...', '#00ffff');
    await delay(800);
    
    addLog('Initiating form automation sequence...', '#ffff00');
    updateProgress(100, 'COMPLETE');
    await delay(1000);
    
    addLog('Injecting credentials into target session...', '#ff00ff');
    await delay(500);
    
    // Hide overlay temporarily to show the form filling
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    await delay(500);
    
    // Execute the credential filling
    executeCredentialFill();
    
    // Wait some time and then remove the overlay completely
    setTimeout(() => {
      overlay.remove();
      style.remove();
    }, 10000);
  }
  
  // Start the simulation
  runHackingSimulation();
}

// Function to fill in credentials
function executeCredentialFill() {
  // Function to simulate typing
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