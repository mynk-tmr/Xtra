const FetchError = (refetch) => {
  if (!refetch) throw SyntaxError("missing refetch");
  return (
    <section>
      <h1 className="text-3xl text-center text-error uppercase">
        Error occured ... <span className="loading loading-infinity"></span>{" "}
      </h1>
      <button className="btn btn-info mt-8 btn-wide" onClick={refetch}>
        Retry
      </button>
    </section>
  );
};

export default FetchError;
