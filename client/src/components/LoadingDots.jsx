const LoadingDots = ({ children }) => {
  return (
    <dialog open className="modal backdrop-blur-sm">
      <div className="modal-box w-11/12 max-w-xl text-center bg-white">
        <span className="loading loading-dots w-16"></span>
        {children}
      </div>
    </dialog>
  );
};

export default LoadingDots;
