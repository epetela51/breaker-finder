import { useMemo, useState } from 'react';
import { useMealSelectionSheet } from './useMealSelectionSheet';
import { useMealSearch } from '../../../hooks/useMealSearch';
import { useSaveMealSelection } from '../../../hooks/useSaveMealSelection';
import { useDailyMealHandlers } from './useDailyMealHandlers';

/**
 * Custom hook that orchestrates all DailyMeal logic.
 * Bundles related hooks together to reduce prop drilling and improve clarity.
 *
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {string | null} mealId - Current meal ID for the day
 * @param {Array} meals - Array of all available meals
 * @param {Function} onMealSelected - Callback when meal is selected/cleared
 * @param {Function} onMealAdded - Callback when a new meal is added
 * @returns {Object} All state and handlers needed by DailyMeal component
 */
export const useDailyMeal = (
  dateString,
  mealId,
  meals,
  onMealSelected,
  onMealAdded,
  onMealUpdated
) => {
  const {
    isOpen,
    openSheet,
    closeSheet,
    isAddMealModalOpen,
    openAddMealModal,
    closeAddMealModal,
    handleMealAdded,
  } = useMealSelectionSheet(onMealAdded);

  const [isEditMealModalOpen, setIsEditMealModalOpen] = useState(false);
  const [selectedMealForEdit, setSelectedMealForEdit] = useState(null);

  const openEditMealModal = (meal) => {
    setSelectedMealForEdit(meal);
    setIsEditMealModalOpen(true);
  };

  const closeEditMealModal = () => {
    setSelectedMealForEdit(null);
    setIsEditMealModalOpen(false);
  };

  const handleMealUpdated = (updatedMeal) => {
    if (onMealUpdated) {
      onMealUpdated(updatedMeal);
    }
    closeEditMealModal();
  };

  const { searchQuery, setSearchQuery, filteredMeals } = useMealSearch();
  const saveMeal = useSaveMealSelection(onMealSelected);
  const { handleSelectMeal, handleClearMeal } = useDailyMealHandlers(
    dateString,
    mealId,
    onMealSelected,
    saveMeal,
    closeSheet,
    setSearchQuery
  );

  const selectedMeal = useMemo(() => meals.find((meal) => meal.id === mealId), [meals, mealId]);
  const filteredMealList = useMemo(() => filteredMeals(meals), [meals, filteredMeals]);

  return {
    // Picker sheet state and handlers
    isOpen,
    openSheet,
    closeSheet,
    // Search state and handlers
    searchQuery,
    setSearchQuery,
    // Meal data
    filteredMealList,
    selectedMeal,
    // Meal selection handlers
    handleSelectMeal,
    handleClearMeal,
    // Add meal modal state and handlers
    isAddMealModalOpen,
    openAddMealModal,
    closeAddMealModal,
    handleMealAdded,
    // Edit meal modal state and handlers
    isEditMealModalOpen,
    selectedMealForEdit,
    openEditMealModal,
    closeEditMealModal,
    handleMealUpdated,
  };
};
