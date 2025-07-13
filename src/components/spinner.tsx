const Spinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-10">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-0" />
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-300" />
      <style >{`
        .animate-bounce {
          animation: bounce 0.6s infinite alternate;
        }

        .delay-0 {
          animation-delay: 0s;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
