import React, { useEffect, useCallback } from 'react';

/**
 * Modal component props
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Size class mappings for modal
 */
const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
};

/**
 * Modal Component
 * Displays content in a modal overlay with backdrop
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Modal: React.FC<ModalProps> = React.memo(({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}) => {
  /**
   * Handle escape key press to close modal
   */
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900 opacity-50 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className={`bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-10 ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto relative`}
      >
        {title && (
          <h2 
            id="modal-title"
            className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 tracking-tight"
          >
            {title}
          </h2>
        )}
        
        <div>{children}</div>
        
        <button
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-colors text-sm font-semibold tracking-wide"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Modal;
