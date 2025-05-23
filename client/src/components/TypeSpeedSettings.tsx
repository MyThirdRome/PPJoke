interface TypeSpeedSettingsProps {
  typingSpeed: number;
  randomness: number;
  autoSubmit: boolean;
  onTypingSpeedChange: (value: number) => void;
  onRandomnessChange: (value: number) => void;
  onAutoSubmitChange: (value: boolean) => void;
}

export default function TypeSpeedSettings({
  typingSpeed,
  randomness,
  autoSubmit,
  onTypingSpeedChange,
  onRandomnessChange,
  onAutoSubmitChange
}: TypeSpeedSettingsProps) {
  const getSpeedText = (speed: number) => {
    switch(speed) {
      case 1: return "SLOW";
      case 2: return "MEDIUM";
      case 3: return "FAST";
      default: return "MEDIUM";
    }
  };
  
  const getRandomnessText = (rand: number) => {
    switch(rand) {
      case 1: return "LOW";
      case 2: return "MEDIUM";
      case 3: return "HIGH";
      default: return "MEDIUM";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--hacker-pink))] animate-pulse mr-2"></div>
        <span className="text-xs uppercase tracking-widest">Input Settings</span>
      </div>
      
      <div className="bg-darker-bg rounded border border-[hsl(var(--hacker-pink))] p-3 shadow-neon-pink">
        {/* Typing Speed Setting */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm">Typing Speed:</label>
            <span className="text-xs text-[hsl(var(--hacker-pink))]">{getSpeedText(typingSpeed)}</span>
          </div>
          <input 
            type="range" 
            className="w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer" 
            min="1" 
            max="3" 
            value={typingSpeed}
            onChange={(e) => onTypingSpeedChange(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
        
        {/* Typing Randomness */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm">Typing Randomness:</label>
            <span className="text-xs text-[hsl(var(--hacker-pink))]">{getRandomnessText(randomness)}</span>
          </div>
          <input 
            type="range" 
            className="w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer" 
            min="1" 
            max="3" 
            value={randomness}
            onChange={(e) => onRandomnessChange(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        {/* Auto Submit Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Auto-Submit Form:</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              name="auto-submit" 
              id="auto-submit" 
              checked={autoSubmit}
              onChange={(e) => onAutoSubmitChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="block h-6 rounded-full bg-gray-700 w-10"></div>
            <div className={`absolute w-4 h-4 rounded-full bg-[hsl(var(--hacker-pink))] transition-transform duration-200 ease-in-out top-1 left-1 ${autoSubmit ? 'translate-x-full' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
