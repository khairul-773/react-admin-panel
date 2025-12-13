import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-10 max-w-md sm:max-w-2xl lg:max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {title && <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 tracking-tight">{title}</h2>}
        <div>{children}</div>
        <button
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-colors text-sm font-semibold tracking-wide"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;