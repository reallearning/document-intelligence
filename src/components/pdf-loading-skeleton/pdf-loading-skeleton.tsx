import React from 'react';

export const PDFLoadingSkeleton: React.FC = () => {
  return (
    <div className="flex w-full h-full bg-gray-100 animate-pulse">

      {/* PDF Content Skeleton */}
      <div className="flex-1 flex flex-col p-6 space-y-4">
        {/* Header Skeleton */}
        <div className="h-8 w-1/3 bg-gray-300 rounded"></div>

        {/* Content Placeholder */}
        <div className="flex-1 bg-gray-200 rounded-lg">
          <div className="h-full bg-gray-300 rounded-lg"></div>
        </div>

        {/* Footer / Controls Skeleton */}
        <div className="flex space-x-4">
          <div className="h-8 w-1/5 bg-gray-300 rounded"></div>
          <div className="h-8 w-1/5 bg-gray-300 rounded"></div>
          <div className="h-8 w-1/5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
