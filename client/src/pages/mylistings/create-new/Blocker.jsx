const Blocker = ({ blocker }) => {
  return (
    <dialog open className="modal backdrop-blur-sm">
      <div className="modal-box w-11/12 bg-white">
        <strong>Do you want to Leave Page?</strong>
        <p>Whatever you entered will be saved ... ✅</p>
        <button
          onClick={() => blocker.reset()}
          className="btn btn-success w-[10ch]">
          NO
        </button>
        <button
          onClick={() => blocker.proceed()}
          className="btn btn-error w-[10ch] ml-4">
          YES
        </button>
      </div>
    </dialog>
  );
};

export default Blocker;
