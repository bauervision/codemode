import CodeEditor from "./components/CodeEditor";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-zinc-950 p-6">
          <CodeEditor />
        </main>
      </div>
    </div>
  );
}
