import React, { useState } from 'react';

const App = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleGenerate = () => {
    setShowResponse(true);
  };

  const handleInsert = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: "insertMessage", message: staticResponse });
    });
  };

  const staticResponse = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  return (
    <div className="p-4 w-[300px] mx-auto">
      <div className="mb-4">
        
        {showResponse && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-gray-700">{staticResponse}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Reply thanking for the opportunity"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleInsert}
          className="bg-white text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
        >
          ↓ Insert
        </button>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          ⟳ Generate
        </button>
      </div>
    </div>
  );
};

export default App;