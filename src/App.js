import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRandomQuote = () => {
    fetch('https://quotes-ar6b.onrender.com/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const speakQuote = () => {
    const utterance = new SpeechSynthesisUtterance(`${quote.text} by ${quote.author}`);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = () => {
    const textToCopy = `${quote.text}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
        setCopied(false);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
<>
<div>
 
  <div className="wrapper">
    <header>Quote of the Day</header>
    <div className="content">
      <div className="quote-area">
        <i className="fas fa-quote-left" />
        <p className="quote">{quote.text}</p>
        <i className="fas fa-quote-right" />
      </div>
      <div className="author">
        <span>__</span>
        <span className="name">{quote.author}</span>
      </div>
    </div>
    <div className="buttons">
      <div className="features">
        <ul>
          <li className="speech" onClick={speakQuote}><i className="fas fa-volume-up" /></li>
          <li className="copy" onClick={copyToClipboard}><i className="fas fa-copy" /></li>
        </ul>
        <button onClick={fetchRandomQuote}>New Quote</button>
      </div>
    </div>
  </div>
</div>

</>
  );
}

export default App;
