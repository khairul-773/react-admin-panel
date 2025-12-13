import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonPath?: string;
  onButtonClick?: () => void;
}

const PageHeader = ({ 
  title, 
  description, 
  buttonText, 
  buttonPath, 
  onButtonClick 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonPath) {
      navigate(buttonPath);
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-700 mt-1">{description}</p>}
      </div>
      {buttonText && (
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
