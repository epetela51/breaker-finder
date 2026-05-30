import { useState } from 'react';
import { sortMealsAlphabetically } from '../../utils/mealSortUtils';

/**
 * Custom hook for managing the dynamic add meal form in MealsLibrary.
 * Handles form visibility toggling and meal addition with automatic form closure.
 *
 * @param {Function} setMeals - State setter for the meals array from useFetchMeals
 * @returns {Object} Object containing { isFormOpen, handleToggleForm, handleMealAdded }
 */
export const useMealsLibraryForm = (setMeals) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleMealAdded = (newMeal) => {
    setMeals((prevMeals) => sortMealsAlphabetically([...prevMeals, newMeal]));
    setIsFormOpen(false);
  };

  return {
    isFormOpen,
    handleToggleForm,
    handleMealAdded,
  };
};
