import React from 'react';

const EditButton = ({ meal, onEdit }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(meal);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Edit ${meal.meal}`}
      className="ml-3 flex-shrink-0 p-2 rounded touch-manipulation"
      style={{ lineHeight: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.414-9.414a1 1 0 000-1.414L16.707 6.293a1 1 0 00-1.414 0L5.879 15.707A1 1 0 005.586 16H4v4z"
        />
      </svg>
    </button>
  );
};

export default React.memo(EditButton);
