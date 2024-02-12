import { useCallback, useState } from "react";

export default function () {
  const [images, setImages] = useState([]);
  const changeImages = useCallback((ev) => {
    for (let file of ev.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file); //start async reading
      reader.onload = () =>
        setImages((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            url: reader.result,
          },
        ]);
    }
  }, []);
  const clearImages = useCallback(() => setImages([]), []);

  return { images, changeImages, clearImages };
}
