// Type definitions for Chrome extension API
// This is a simplified version just for development purposes

interface Chrome {
  runtime?: {
    onMessage?: {
      addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => void;
    };
    sendMessage?: (message: any) => void;
  };
  tabs?: {
    query: (
      queryInfo: { active: boolean; currentWindow: boolean },
      callback: (tabs: { id?: number }[]) => void
    ) => void;
    create?: (
      createProperties: { url: string },
      callback?: (tab: { id?: number }) => void
    ) => void;
    sendMessage?: (tabId: number, message: any, callback?: (response: any) => void) => void;
  };
}

declare global {
  var chrome: Chrome | undefined;
}

export {};