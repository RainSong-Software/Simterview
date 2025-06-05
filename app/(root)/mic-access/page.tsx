"use client";

import { useState } from "react";

export default function MicAccessComponent() {
  const [hasMicAccess, setHasMicAccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMicRequest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicAccess(true);
      stream.getTracks().forEach(track => track.stop()); // stop immediately if not recording yet
    } catch (err: any) {
      setHasMicAccess(false);
      setError(err.message || "Microphone access denied.");
    }
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-lg font-semibold mb-2">Microphone Access</h2>
      <button
        onClick={handleMicRequest}
        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded"
      >
        Request Mic Access
      </button>

      {hasMicAccess === true && (
        <p className="mt-2 text-green-400">✅ Microphone access granted.</p>
      )}
      {hasMicAccess === false && (
        <p className="mt-2 text-red-400">❌ Access denied: {error}</p>
      )}
    </div>
  );
}
