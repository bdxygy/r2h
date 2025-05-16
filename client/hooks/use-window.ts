import { useState, useEffect } from "react";
export const useWindow = () => {
  const [windowValue, setWindowValue] = useState<Window | null>(null);
  useEffect(() => {
    setWindowValue(() => window);
  }, []);
  return windowValue;
};
