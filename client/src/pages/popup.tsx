import { useState, useEffect } from "react";
import { Settings } from "@shared/types";

interface Tab {
  id?: number;
}

interface LogMessage {
  text: string;
  color: string;
}

export default function Popup() {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [logs, setLogs] = useState<LogMessage[]>([
    { text: "> Initializing PayPal Scanner...", color: "text-[hsl(var(--hacker-green))]" },
  ]);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  
  // Simulate connection to PayPal servers on load
  useEffect(() => {
    const simulateConnection = async () => {
      // Add initial logs
      await addLog("> Establishing secure connection to PayPal servers...", "text-[hsl(var(--hacker-cyan))]");
      await delay(1000);
      
      // Simulate connection attempt
      await addLog("> Attempting connection to api.paypal.com...", "text-yellow-400");
      await delay(1500);
      
      // Simulate failure and retry
      await addLog("> Connection failed. Retrying with alternative endpoint...", "text-[hsl(var(--hacker-red))]");
      await delay(1200);
      
      await addLog("> Connecting to secure.paypal.com...", "text-yellow-400");
      await delay(1800);
      
      // Success
      await addLog("> Connection established successfully", "text-[hsl(var(--hacker-green))]");
      await delay(800);
      
      await addLog("> Bypassing security protocols...", "text-[hsl(var(--hacker-pink))]");
      await delay(1500);
      
      await addLog("> Security bypassed. Scanner ready.", "text-[hsl(var(--hacker-green))]");
      setConnectionStatus('connected');
    };
    
    simulateConnection();
  }, []);
  
  // Helper function to add logs with a delay
  const addLog = async (text: string, color: string) => {
    setLogs(prev => [...prev, { text, color }]);
    return new Promise<void>(resolve => setTimeout(resolve, 100));
  };
  
  // Helper delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Simulated scanning function
  const simulateScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    await addLog("> Initiating PayPal account scan...", "text-[hsl(var(--hacker-cyan))]");
    await delay(1000);
    
    await addLog("> Scanning network for vulnerable sessions...", "text-yellow-400");
    
    // Simulate progress
    for (let i = 1; i <= 10; i++) {
      setScanProgress(i * 10);
      await delay(500);
    }
    
    await addLog("> Found active PayPal session", "text-[hsl(var(--hacker-green))]");
    await delay(1000);
    
    await addLog("> Extracting account data...", "text-[hsl(var(--hacker-pink))]");
    await delay(1500);
    
    await addLog("> Account found: rzgtrk@gmail.com", "text-[hsl(var(--hacker-green))]");
    await delay(800);
    
    await addLog("> Password identified: ********", "text-[hsl(var(--hacker-green))]");
    await delay(500);
    
    await addLog("> Preparing for automated login...", "text-yellow-400");
    await delay(1000);
    
    await addLog("> Opening PayPal login page...", "text-[hsl(var(--hacker-cyan))]");
    await delay(800);
    
    await addLog("> Injecting credentials...", "text-[hsl(var(--hacker-pink))]");
    await delay(1200);
    
    await addLog("> Login successful. Access granted.", "text-[hsl(var(--hacker-green))]");
    setIsScanning(false);
  };
  
  const handleExecute = () => {
    // Don't do anything if already scanning
    if (isScanning) return;
    
    // Use real Chrome API in extension environment
    const isChromeExtension = typeof window !== 'undefined' && 'chrome' in window && window.chrome?.tabs;
    
    if (isChromeExtension) {
      // Fixed settings for a better experience
      const settings: Settings = {
        typingSpeed: 2,
        randomness: 3,
        autoSubmit: true
      };
      
      // Navigate to PayPal if not already there
      try {
        // Using non-optional chaining for type safety
        if (window.chrome && window.chrome.tabs && window.chrome.tabs.create) {
          window.chrome.tabs.create({ url: "https://www.paypal.com/signin" }, (tab: { id?: number }) => {
            if (tab && tab.id) {
              // Wait a moment for the page to load
              setTimeout(() => {
                if (window.chrome && window.chrome.tabs && window.chrome.tabs.sendMessage) {
                  window.chrome.tabs.sendMessage(tab.id, {
                    action: "execute",
                    settings,
                    credentials: {
                      email: "rzgtrk@gmail.com",
                      password: "Kingsm22"
                    }
                  });
                }
                
                // Start simulation in popup
                simulateScan();
              }, 1500);
            }
          });
        } else {
          console.log("Chrome tabs create API not available");
          simulateScan();
        }
      } catch (error) {
        console.log("Error accessing Chrome API:", error);
        simulateScan();
      }
    } else {
      console.log("Development mode - simulating scan");
      simulateScan();
    }
  };

  return (
    <div className="w-[400px] h-[500px] relative overflow-hidden matrix-bg">
      <div className="terminal-scanline"></div>
      
      {/* Header */}
      <header className="bg-darker-bg p-3 border-b border-hacker-green flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-user-secret text-[hsl(var(--hacker-green))] mr-2"></i>
          <h1 className="text-[hsl(var(--hacker-green))] font-bold glitch-text">PayPal Scanner v3.5</h1>
        </div>
        <div className="flex space-x-2">
          <button className="w-3 h-3 rounded-full bg-[hsl(var(--hacker-red))]"></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400"></button>
          <button className="w-3 h-3 rounded-full bg-[hsl(var(--hacker-green))]"></button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="p-4 h-[calc(100%-60px)] overflow-y-auto">
        {/* Status Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connecting' ? 'bg-yellow-400' : connectionStatus === 'connected' ? 'bg-[hsl(var(--hacker-green))]' : 'bg-[hsl(var(--hacker-red))]'} animate-pulse mr-2`}></div>
              <span className="text-xs uppercase tracking-widest">System Status</span>
            </div>
            <span className="text-xs text-[hsl(var(--hacker-cyan))]">
              {connectionStatus === 'connecting' ? 'CONNECTING...' : 
               connectionStatus === 'connected' ? 'CONNECTED' : 'CONNECTION ERROR'}
            </span>
          </div>
          
          {/* Scan progress when active */}
          {isScanning && (
            <div className="bg-darker-bg p-3 rounded border border-[hsl(var(--hacker-pink))] mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Scanning Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
                <div 
                  className="bg-[hsl(var(--hacker-pink))] h-full transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Console Output */}
        <div>
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse mr-2"></div>
            <span className="text-xs uppercase tracking-widest">Terminal Output</span>
          </div>
          
          <div className="bg-black rounded border border-gray-700 p-3 font-terminal text-xs h-[300px] overflow-y-auto">
            {logs.map((log, index) => (
              <p key={index} className={`${log.color} ${index === logs.length - 1 ? "typing-cursor" : ""}`}>
                {log.text}
              </p>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-darker-bg p-3 border-t border-[hsl(var(--hacker-green))] flex justify-between items-center">
        <span className="text-xs text-gray-400">ACCESS LEVEL: ROOT</span>
        <button 
          onClick={handleExecute}
          disabled={connectionStatus !== 'connected' || isScanning}
          className={`px-6 py-2 rounded font-bold transition-colors uppercase ${connectionStatus !== 'connected' || isScanning 
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
            : 'bg-[hsl(var(--hacker-green))] text-black hover:bg-opacity-80'}`}
        >
          {isScanning ? 'SCANNING...' : 'SCAN'}
        </button>
      </footer>
    </div>
  );
}
