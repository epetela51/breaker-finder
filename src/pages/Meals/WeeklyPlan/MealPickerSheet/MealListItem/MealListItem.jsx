import React from 'react';

import EditButton from './EditButton/EditButton';

/**
 * MealListItem - Individual meal item in the meal picker sheet.
 * Presentational component (UI only, no business logic).
 *
 * @param {Object} meal - Meal object with { id, meal, note }
 * @param {Function} onClick - Callback when the meal item is clicked
 */
const MealListItem = ({ meal, onClick, onEdit }) => {
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="w-12 flex-shrink-0" />
      <div className="flex-1 min-w-0 text-center">
        <div className="text-base font-medium text-gray-900 truncate">{meal.meal}</div>
        {meal.note && <div className="text-sm text-gray-500 truncate mt-0.5">{meal.note}</div>}
      </div>
      {/* Small edit button (pencil) - compact for mobile */}
      <EditButton meal={meal} onEdit={onEdit} />
    </div>
  );
};

export default React.memo(MealListItem);
