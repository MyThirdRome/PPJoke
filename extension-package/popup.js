// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const scanButton = document.getElementById('scan-button');
  const terminal = document.getElementById('terminal');
  const progressSection = document.getElementById('progress-section');
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');
  
  let isScanning = false;
  
  // Function to add a log line to the terminal
  function addLog(text, color = 'green') {
    const logLine = document.createElement('div');
    logLine.className = `log-line ${color}`;
    logLine.textContent = `> ${text}`;
    
    // Remove typing-cursor class from previous last line
    const lastLine = terminal.querySelector('.typing-cursor');
    if (lastLine) {
      lastLine.classList.remove('typing-cursor');
    }
    
    // Add typing-cursor to this new line
    logLine.classList.add('typing-cursor');
    
    terminal.appendChild(logLine);
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Function to update progress bar
  function updateProgress(percent) {
    progressBar.style.width = `${percent}%`;
    progressPercentage.textContent = `${percent}%`;
  }
  
  // Function to simulate the scanning process
  async function simulateScan() {
    if (isScanning) return;
    
    isScanning = true;
    scanButton.disabled = true;
    scanButton.textContent = 'SCANNING...';
    progressSection.style.display = 'block';
    updateProgress(0);
    
    // Start scanning sequence
    addLog('Initiating PayPal account scan...', 'cyan');
    await delay(1000);
    updateProgress(10);
    
    addLog('Scanning network for vulnerable sessions...', 'yellow');
    updateProgress(20);
    await delay(1000);
    
    // Simulate scanning progress
    for (let i = 3; i <= 7; i++) {
      updateProgress(i * 10);
      await delay(500);
    }
    
    addLog('Found active PayPal session', 'green');
    updateProgress(80);
    await delay(1000);
    
    addLog('Extracting account data...', 'pink');
    updateProgress(90);
    await delay(1500);
    
    addLog('Account found: rzgtrk@gmail.com', 'green');
    await delay(800);
    
    addLog('Password identified: ********', 'green');
    await delay(500);
    
    addLog('Preparing for automated login...', 'yellow');
    await delay(1000);
    
    addLog('Opening PayPal login page...', 'cyan');
    await delay(800);
    
    addLog('Injecting credentials...', 'pink');
    await delay(1200);
    
    addLog('Login successful. Access granted.', 'green');
    updateProgress(100);
    
    // Reset UI after scan is complete
    setTimeout(() => {
      scanButton.disabled = false;
      scanButton.textContent = 'SCAN';
      isScanning = false;
    }, 2000);
  }
  
  // Helper function for delays
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Add click event listener to scan button
  scanButton.addEventListener('click', function() {
    // Try to use Chrome extension API
    try {
      // Check if we're in a Chrome extension environment
      if (chrome && chrome.tabs) {
        // First check if PayPal is already open in any tab
        chrome.tabs.query({url: ["*://www.paypal.com/signin*", "*://paypal.com/signin*"]}, function(tabs) {
          // Settings and credentials to use for the scan
          const settings = {
            typingSpeed: 2,
            randomness: 3,
            autoSubmit: true
          };
          
          const credentials = {
            email: "rzgtrk@gmail.com",
            password: "Kingsm22"
          };
          
          // Notify background script that scan is starting
          chrome.runtime.sendMessage({
            action: "scanStarted",
            settings: settings,
            credentials: credentials
          });
          
          if (tabs && tabs.length > 0) {
            // PayPal is already open, use that tab
            const paypalTab = tabs[0];
            
            // Activate the existing tab
            chrome.tabs.update(paypalTab.id, {active: true}, function() {
              // Send message to the content script
              setTimeout(() => {
                chrome.tabs.sendMessage(paypalTab.id, {
                  action: "execute",
                  settings: settings,
                  credentials: credentials
                });
                
                // Start simulation in popup
                simulateScan();
              }, 500);
            });
          } else {
            // PayPal is not open, create a new tab
            chrome.tabs.create({ url: "https://www.paypal.com/signin" }, (tab) => {
              if (tab && tab.id) {
                // Wait for page to load before sending message
                setTimeout(() => {
                  chrome.tabs.sendMessage(tab.id, {
                    action: "execute",
                    settings: settings,
                    credentials: credentials
                  });
                  
                  // Start simulation in popup
                  simulateScan();
                }, 1500);
              } else {
                console.log("Tab ID not available");
                simulateScan();
              }
            });
          }
        });
      } else {
        console.log("Chrome API not available");
        simulateScan();
      }
    } catch (error) {
      console.log("Error accessing Chrome API:", error);
      simulateScan();
    }
  });
  
  // Listen for logs from content script
  try {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'log') {
        // Map color name from content script to CSS class
        let colorClass = 'green';
        if (message.color && message.color.includes('cyan')) colorClass = 'cyan';
        if (message.color && message.color.includes('pink')) colorClass = 'pink';
        if (message.color && message.color.includes('yellow')) colorClass = 'yellow';
        if (message.color && message.color.includes('red')) colorClass = 'red';
        
        addLog(message.text, colorClass);
      }
    });
  } catch (e) {
    // Silent fail for non-extension environments
  }
});