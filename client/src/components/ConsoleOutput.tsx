import { useState, useEffect } from "react";

interface LogMessage {
  text: string;
  color: string;
}

interface ChromeMessage {
  type: string;
  text: string;
  color?: string;
}

export default function ConsoleOutput() {
  const [logs, setLogs] = useState<LogMessage[]>([
    { text: "> Extension initialized", color: "text-green-500" },
    { text: "> Waiting for PayPal login page...", color: "text-yellow-400" },
    { text: "> Loaded 4 credential pairs", color: "text-[hsl(var(--hacker-cyan))]" },
    { text: "> Ready to execute prank sequence", color: "text-[hsl(var(--hacker-green))]" },
    { text: "> Press EXECUTE to begin when ready", color: "text-[hsl(var(--hacker-pink))]" }
  ]);

  useEffect(() => {
    // Listen for messages from content script
    // Check if we're in a Chrome extension environment
    const isChromeExtension = typeof window !== 'undefined' && 'chrome' in window && window.chrome?.runtime?.onMessage;
    
    if (isChromeExtension) {
      window.chrome?.runtime?.onMessage?.addListener((message: ChromeMessage) => {
        if (message.type === "log") {
          setLogs(prev => [...prev, {
            text: `> ${message.text}`,
            color: message.color || "text-[hsl(var(--hacker-green))]"
          }]);
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse mr-2"></div>
        <span className="text-xs uppercase tracking-widest">Console Output</span>
      </div>
      
      <div className="bg-black rounded border border-gray-700 p-3 font-terminal text-xs h-[120px] overflow-y-auto">
        {logs.map((log, index) => (
          <p key={index} className={`${log.color} ${index === logs.length - 1 ? "typing-cursor" : ""}`}>
            {log.text}
          </p>
        ))}
      </div>
    </div>
  );
}
