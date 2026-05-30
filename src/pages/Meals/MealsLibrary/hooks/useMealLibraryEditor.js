import { useState, useCallback } from 'react';
import { sortMealsAlphabetically } from '../../utils/mealSortUtils';

/**
 * Custom hook for managing the meal library editor state and actions.
 * Handles state management for expanded rows, edit modal, assignment modal, and all related actions.
 *
 * @param {Array} meals - Array of all meals
 * @param {Function} setMeals - Setter for meals array
 * @param {Function} performDelete - Function to delete a meal from API
 * @returns {Object} Object containing:
 *   State:
 *   - expandedMealId: ID of the currently expanded meal (null if none)
 *   - selectedMealForEdit: Meal object being edited (null if none)
 *   - isModalOpen: Whether the edit modal is open
 *   - selectedMealForAssignment: Meal object being assigned to a date (null if none)
 *   - isAssignModalOpen: Whether the assignment modal is open
 *   Handlers:
 *   - handleToggleMeal: Toggle expand/collapse for a meal row
 *   - handleEditMeal: Open edit modal for a meal
 *   - handleDeleteMealClick: Delete a meal
 *   - handleMealUpdated: Update meal data after successful edit
 *   - handleModalClose: Close the edit modal
 *   - handleOpenAssignModal: Open assignment modal for a meal
 *   - handleCloseAssignModal: Close the assignment modal
 */
export const useMealLibraryEditor = (meals, setMeals, performDelete) => {
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [selectedMealForEdit, setSelectedMealForEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealForAssignment, setSelectedMealForAssignment] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleToggleMeal = useCallback((mealId) => {
    setExpandedMealId((prevId) => (prevId === mealId ? null : mealId));
  }, []);

  const handleEditMeal = useCallback((meal) => {
    setSelectedMealForEdit(meal);
    setIsModalOpen(true);
  }, []);

  const handleDeleteMealClick = useCallback(
    async (mealId) => {
      try {
        await performDelete(mealId);
        setMeals((prevMeals) => prevMeals.filter((m) => m.id !== mealId));
        setExpandedMealId(null);
      } catch (err) {
        console.error('Failed to delete meal:', err);
      }
    },
    [performDelete, setMeals]
  );

  const handleMealUpdated = useCallback(
    (updatedMeal) => {
      setMeals((prevMeals) =>
        sortMealsAlphabetically(
          prevMeals.map((m) =>
            m.id === updatedMeal.id ? { ...m, meal: updatedMeal.meal, note: updatedMeal.note } : m
          )
        )
      );
      setExpandedMealId(null);
    },
    [setMeals]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMealForEdit(null);
  }, []);

  const handleOpenAssignModal = useCallback((meal) => {
    setSelectedMealForAssignment(meal);
    setIsAssignModalOpen(true);
  }, []);

  const handleCloseAssignModal = useCallback(() => {
    setIsAssignModalOpen(false);
    setSelectedMealForAssignment(null);
  }, []);

  return {
    expandedMealId,
    selectedMealForEdit,
    isModalOpen,
    handleToggleMeal,
    handleEditMeal,
    handleDeleteMealClick,
    handleMealUpdated,
    handleModalClose,
    selectedMealForAssignment,
    isAssignModalOpen,
    handleOpenAssignModal,
    handleCloseAssignModal,
  };
};
