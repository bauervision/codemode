export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-4 font-bold text-xl tracking-wider">
        Projects
      </div>
      <div className="flex-1 p-2 space-y-2">
        <div className="bg-zinc-800 rounded p-3">Demo Project 1</div>
        {/* More projects go here */}
      </div>
    </aside>
  );
}
