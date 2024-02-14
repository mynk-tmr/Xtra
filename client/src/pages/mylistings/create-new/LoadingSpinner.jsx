const LoadingSpinner = () => {
  return (
    <dialog open className="modal backdrop-blur-sm">
      <div className="modal-box w-11/12 max-w-xl text-center bg-white">
        <span className="loading loading-dots w-16"></span>
        <h4>Saving .....</h4>
      </div>
    </dialog>
  );
};

export default LoadingSpinner;
