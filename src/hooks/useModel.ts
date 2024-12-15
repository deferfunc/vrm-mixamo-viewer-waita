import { useState, useEffect } from 'react';

export const useModel = (selectedFile: File | undefined) => {
  const [modelUrl, setModelUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchInitialModel = async () => {
      try {
        const response = await fetch('/assets/vrm/example.vrm');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setModelUrl(url);
      } catch (error) {
        console.error('Failed to fetch initial model:', error);
      }
    };

    if (!selectedFile) {
      fetchInitialModel();
    } else {
      const url = URL.createObjectURL(selectedFile);
      setModelUrl(url);
    }
  }, [selectedFile]);

  return { modelUrl };
};

