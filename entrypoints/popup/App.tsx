import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
  
  function handleClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: "insertMessage" });
    });
  }

  return (
    <>
      <div className="card">
        <button onClick={handleClick}>Insert Message</button>
      </div>
    </>
  );
}

export default App;