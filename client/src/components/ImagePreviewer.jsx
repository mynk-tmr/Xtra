const ImagePreviewer = ({ files }) => {
  return (
    <article className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
      {files?.map((file, index) => (
        <figure key={index}>
          <img src={file.url} className="object-contain" />
          <figcaption className="text-center font-semibold">
            {file.name} ({(file.size / 2 ** 10).toFixed(2)} KB)
          </figcaption>
        </figure>
      ))}
    </article>
  );
};

export default ImagePreviewer;
