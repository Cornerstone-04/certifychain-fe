export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>
      <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-1500"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-2000"></div>
    </div>
  );
};
