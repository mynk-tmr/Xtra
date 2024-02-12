import { useCallback, useState } from "react";

export default function (key) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (er) {
      return null;
    }
  });
  const storeValue = useCallback(
    (value) => {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  const removeValue = useCallback(() => {
    setValue(null);
    localStorage.removeItem(key);
  }, [key]);

  return [value, storeValue, removeValue];
}
