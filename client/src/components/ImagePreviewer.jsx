const ImagePreviewer = ({ files, urlArray, renderControlBtns }) => {
  //uses either urlArray or files returned by useImagePreview
  //render absolutely postitioned controlBtns on each image for interactivty

  if (urlArray) {
    return (
      <section className="!grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
        {urlArray?.map((url, index) => (
          <article key={index} className="relative group">
            <img src={url} className="object-contain" />
            {renderControlBtns && (
              <div className="hidden group-hover:flex w-full justify-center absolute z-10 top-12 *:btn-sm *:btn">
                {renderControlBtns(url)}
              </div>
            )}
          </article>
        ))}
      </section>
    );
  }
  return (
    <article className="!grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
      {files?.map((file, index) => (
        <figure key={index} className="relative group">
          <img src={file.url} className="object-contain" />
          {renderControlBtns && (
            <div className="hidden group-hover:flex gap-5 absolute z-10 top-12 left-1/4 *:btn-sm *:btn">
              {renderControlBtns(file.url)}
            </div>
          )}
          <figcaption className="text-center font-semibold">
            {file.name} ({(file.size / 2 ** 10).toFixed(2)} KB)
          </figcaption>
        </figure>
      ))}
    </article>
  );
};

export default ImagePreviewer;
