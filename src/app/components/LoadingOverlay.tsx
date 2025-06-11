export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur">
      <div className="flex flex-col items-center">
        <svg className="animate-spin mb-4" width={48} height={48} viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" stroke="#06b6d4" strokeWidth="4" fill="none" opacity="0.3" />
          <path d="M44 24a20 20 0 0 1-20 20" stroke="#06b6d4" strokeWidth="4" fill="none" />
        </svg>
        <div className="text-cyan-300 font-semibold text-xl">Scaffolding Project…</div>
      </div>
    </div>
  );
}
