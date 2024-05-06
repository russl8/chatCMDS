import Layout from './components/Layout';
import Chat from './components/Chat';
function App() {

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
