import LandingPage from "./pages/landing/LandingPage";

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:80px_80px] opacity-20"></div>

      {/* Orange Glow */}
      <div className="absolute left-1/3 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[180px]" />

      {/* Purple Glow */}
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="relative z-10">
        <LandingPage />
      </div>

    </div>
  );
}

export default App;