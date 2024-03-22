import React from 'react';
import './App.css';

function App() {
  const [content, setContent] = React.useState<string>("");
  return (
    <div >
      <form onSubmit={(e) => {
        e.preventDefault();
        fetch('/message?'
          + new URLSearchParams({
            message: content,
          })
        ).then(res => res.json())
          .then(data => alert(data));
      }}>
        <input
          name="msg"
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default App;
