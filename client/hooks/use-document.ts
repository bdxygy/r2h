import { useState, useEffect } from "react";

export const useDocument = () => {
  const [documentValue, setDocumentValue] = useState<Document | null>(null);
  useEffect(() => {
    setDocumentValue(() => document);
  }, []);
  return documentValue;
};
