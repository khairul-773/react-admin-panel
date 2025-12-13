import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

/**
 * Skeleton Component
 * Loading placeholder with animation
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-md';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const baseClasses = 'animate-pulse bg-gray-200';
  const variantClasses = getVariantClasses();

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  if (count === 1) {
    return <div className={`${baseClasses} ${variantClasses} ${className}`} style={style} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${baseClasses} ${variantClasses} ${className}`} style={style} />
      ))}
    </div>
  );
};

/**
 * TableSkeleton Component
 * Skeleton loader for tables
 */
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="40px" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * CardSkeleton Component
 * Skeleton loader for cards
 */
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="32px" className="mt-2" />
            </div>
            <Skeleton variant="circular" width="48px" height="48px" />
          </div>
          <Skeleton width="50%" height="12px" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
