import React from 'react';

import MealListItem from '../MealListItem/MealListItem';

/**
 * MealList - Component for rendering a list of meals in the meal picker sheet.
 *
 * @param {Array} meals - Array of meal objects to display
 * @param {Function} onSelectMeal - Callback when a meal is selected (optional)
 * @param {string} emptyMessage - Custom message when no meals are found (optional)
 */
const MealList = ({
  meals,
  onSelectMeal = () => {},
  onEditMeal = () => {},
  emptyMessage = 'No meals found',
}) => {
  if (meals.length > 0) {
    return (
      <div>
        {meals.map((meal) => (
          <MealListItem
            key={meal.id}
            meal={meal}
            onClick={() => onSelectMeal(meal.id)}
            onEdit={() => onEditMeal(meal)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-gray-500 text-lg">{emptyMessage}</p>
    </div>
  );
};

export default React.memo(MealList);
