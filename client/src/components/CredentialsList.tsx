import { useState } from "react";
import { mockCredentials } from "@/lib/credentials";
import { Credential } from "@shared/types";

export default function CredentialsList() {
  const [credentials] = useState<Credential[]>(mockCredentials);
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--hacker-cyan))] animate-pulse mr-2"></div>
          <span className="text-xs uppercase tracking-widest">Credentials Database</span>
        </div>
        <button className="text-xs border border-[hsl(var(--hacker-cyan))] text-[hsl(var(--hacker-cyan))] px-2 py-1 rounded hover:bg-[hsl(var(--hacker-cyan))] hover:bg-opacity-20 transition-colors">
          + Add New
        </button>
      </div>
      
      {/* Credential List */}
      <div className="bg-darker-bg rounded border border-[hsl(var(--hacker-cyan))] p-3 shadow-neon-cyan">
        <div className="mb-2 border-b border-gray-700 pb-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">Email</span>
          <span className="text-xs text-gray-400">Password</span>
        </div>
        
        {credentials.map((cred, index) => (
          <div key={index} className="text-sm mb-2 flex justify-between">
            <span className="text-[hsl(var(--hacker-green))]">{cred.email}</span>
            <span className="text-[hsl(var(--hacker-pink))]">••••••••</span>
          </div>
        ))}
      </div>
    </div>
  );
}
