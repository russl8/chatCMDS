import React from 'react';
import Layout from './components/Layout';
import Chat from './components/Chat';
function App() {
  const [question, setQuestion] = React.useState<string>("");
  const [result, setResult] = React.useState();
  const [file, setFile] = React.useState();

  const handleQuestionChange = (e: any) => {
    setQuestion(e?.target.value)
  }

  const handleFileChange = (e: any) => {
    setFile(e?.target.files[0])
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData()

    if (file) {
      formData.append('file', file);
    }

    if (question) {
      formData.append('question', question)
    }

   
  }
  return (
    <div className="h-[100dvh] text-white">
      {/* <form onSubmit={handleSubmit}>
        <input type="text" id="question" value={question} onChange={handleQuestionChange} />
        <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" className="bg-red-500">Submit</button>
      </form>
      AI says:  {result} */}

      <Layout>
        <Chat/>
      </Layout>
    </div>
  );
}
export default App;
