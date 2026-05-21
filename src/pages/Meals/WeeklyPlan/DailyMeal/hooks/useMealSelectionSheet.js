import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage meal selection sheet and add meal modal visibility.
 * Handles sheet display and embedded add meal modal within the sheet.
 *
 * @param {Function} onMealAdded - Callback when a new meal is successfully added (receives newMeal)
 * @returns {Object} Object containing:
 *   - Sheet state: { isOpen, openSheet, closeSheet }
 *   - Add modal state: { isAddMealModalOpen, openAddMealModal, closeAddMealModal }
 *   - Callback: { handleMealAdded }
 */
export const useMealSelectionSheet = (onMealAdded) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);

  /**
   * Locks the page body when the sheet is open to prevent background scrolling.
   * Uses position:fixed instead of overflow:hidden, which iOS Safari ignores on body.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);
  const openAddMealModal = () => setIsAddMealModalOpen(true);
  const closeAddMealModal = () => setIsAddMealModalOpen(false);

  // Wrap the meal added callback to close the modal after meal is added
  const handleMealAdded = useCallback(
    (newMeal) => {
      if (onMealAdded) {
        onMealAdded(newMeal);
      }
      setIsAddMealModalOpen(false);
    },
    [onMealAdded]
  );

  return {
    // Sheet state and handlers
    isOpen,
    openSheet,
    closeSheet,
    // Add meal modal state and handlers
    isAddMealModalOpen,
    openAddMealModal,
    closeAddMealModal,
    handleMealAdded,
  };
};
