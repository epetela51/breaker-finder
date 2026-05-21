import { useState, useCallback, useMemo, useEffect } from 'react';
import { getWeekDates } from '../../../../utils/getWeekDates';
import { formatDateToString } from '../../../../utils/dateUtils';

/**
 * Custom hook to manage state for the AssignMealModal.
 * Handles week navigation, date selection, submission, and success feedback.
 *
 * @param {string} mealId - ID of the meal being assigned
 * @param {Function} onAssign - Callback when meal is assigned (mealId, dateString) => void
 * @param {Function} onClose - Callback when modal should close
 * @returns {Object} containing:
 *   - weekOffset: current week offset (-1, 0, 1)
 *   - selectedDateString: currently selected date (YYYY-MM-DD or null)
 *   - weekDates: date objects for the current week
 *   - successMessage: success message to display (or null)
 *   - handleNextWeek: navigate to next week
 *   - handleSelectDate: select a date
 *   - handleSubmit: submit and assign meal
 *   - handleCancel: cancel assignment
 */
export const useAssignMealModalState = (mealId, onAssign, onClose) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDateString, setSelectedDateString] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Calculate week dates based on offset
  const weekDates = useMemo(() => getWeekDates(new Date(), weekOffset), [weekOffset]);

  // Auto-close modal after success message displays
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setWeekOffset(0);
        setSelectedDateString(null);
        setSuccessMessage(null);
        onClose();
      }, 1000); // Show message for 1 second
      return () => clearTimeout(timer);
    }
  }, [successMessage, onClose]);

  const handleNextWeek = useCallback(() => {
    setWeekOffset((prev) => Math.min(prev + 1, 1));
    setSelectedDateString(null);
  }, []);

  const handleSelectDate = useCallback(
    (dayName) => {
      const date = weekDates[dayName];
      setSelectedDateString(formatDateToString(date));
    },
    [weekDates]
  );

  const handleReset = useCallback(() => {
    setWeekOffset(0);
    setSelectedDateString(null);
    setSuccessMessage(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedDateString && mealId) {
      onAssign(mealId, selectedDateString);
      setSuccessMessage('✓ Meal assigned!');
    }
  }, [selectedDateString, mealId, onAssign]);

  const handleCancel = useCallback(() => {
    handleReset();
    onClose();
  }, [handleReset, onClose]);

  return {
    weekOffset,
    selectedDateString,
    weekDates,
    successMessage,
    handleNextWeek,
    handleSelectDate,
    handleSubmit,
    handleCancel,
  };
};
