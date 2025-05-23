import { useState } from "react";
import CredentialsList from "@/components/CredentialsList";
import ConsoleOutput from "@/components/ConsoleOutput";
import TypeSpeedSettings from "@/components/TypeSpeedSettings";
import { Settings } from "@shared/types";

interface Tab {
  id?: number;
}

export default function Popup() {
  const [extensionActive] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(2);
  const [randomness, setRandomness] = useState(3);
  const [autoSubmit, setAutoSubmit] = useState(true);
  
  const handleExecute = () => {
    // Send message to content script to execute the prank
    // Check if we're in a Chrome extension environment
    const isChromeExtension = typeof window !== 'undefined' && 'chrome' in window && window.chrome?.tabs;
    
    if (isChromeExtension) {
      // Create settings object
      const settings: Settings = {
        typingSpeed,
        randomness,
        autoSubmit
      };
      
      // Use optional chaining to safely access Chrome API
      window.chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs: Tab[]) => {
        // Only proceed if tabs exist and have an id
        if (tabs && tabs.length > 0 && tabs[0].id) {
          window.chrome?.tabs?.sendMessage?.(tabs[0].id, {
            action: "execute",
            settings
          });
        }
      });
    } else {
      console.log("Chrome API not available in development mode");
      // In development mode, simulate a log message
      const devModeMessage = "> Development mode: Prank execution simulated";
      // We'd use chrome.runtime.sendMessage in the real extension, but we can't here
      // This is just to show something in dev mode
      console.log(devModeMessage);
    }
  };

  return (
    <div className="w-[400px] h-[500px] relative overflow-hidden matrix-bg">
      <div className="terminal-scanline"></div>
      
      {/* Header */}
      <header className="bg-darker-bg p-3 border-b border-hacker-green flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-user-secret text-[hsl(var(--hacker-green))] mr-2"></i>
          <h1 className="text-[hsl(var(--hacker-green))] font-bold glitch-text">PayPal Prank Extension</h1>
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
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--hacker-green))] animate-pulse mr-2"></div>
            <span className="text-xs uppercase tracking-widest">Status</span>
          </div>
          <div className="bg-darker-bg p-3 rounded border border-[hsl(var(--hacker-green))] text-sm shadow-neon-green">
            <p className="mb-1 flex justify-between">
              <span>Extension Status</span>
              <span className="text-[hsl(var(--hacker-green))]">{extensionActive ? "ACTIVE" : "INACTIVE"}</span>
            </p>
            <p className="mb-1 flex justify-between">
              <span>Target Site</span>
              <span className="text-[hsl(var(--hacker-cyan))]">paypal.com/signin</span>
            </p>
            <p className="flex justify-between">
              <span>Auto-Fill Mode</span>
              <span className="text-[hsl(var(--hacker-pink))]">ENABLED</span>
            </p>
          </div>
        </div>
        
        {/* Credentials Database Section */}
        <CredentialsList />
        
        {/* Settings Section */}
        <TypeSpeedSettings 
          typingSpeed={typingSpeed}
          randomness={randomness}
          autoSubmit={autoSubmit}
          onTypingSpeedChange={setTypingSpeed}
          onRandomnessChange={setRandomness}
          onAutoSubmitChange={setAutoSubmit}
        />
        
        {/* Console Output */}
        <ConsoleOutput />
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-darker-bg p-3 border-t border-[hsl(var(--hacker-green))] flex justify-between items-center">
        <span className="text-xs text-gray-400">v1.0.0 | PRANK MODE</span>
        <button 
          onClick={handleExecute}
          className="bg-[hsl(var(--hacker-green))] text-black px-4 py-1 rounded font-bold hover:bg-opacity-80 transition-colors"
        >
          EXECUTE
        </button>
      </footer>
    </div>
  );
}
