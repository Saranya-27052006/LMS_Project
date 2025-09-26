// components/ErrorToast.tsx
import { useEffect } from "react";

interface ErrorToastProps {
  message: string | null;
  onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 flex items-center justify-between min-w-[250px]">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-lg">×</button>
    </div>
  );
};

export default ErrorToast;
