import React from 'react';

import { useAssignMealModalState } from './useAssignMealModalState';

import Modal from '../../../../components/Modal/Modal';
import AssignMealModalHeader from '../AssignMealModalHeader/AssignMealModalHeader';
import WeekNavigationSection from '../../shared/WeekNavigation/WeekNavigationSection/WeekNavigationSection';
import DaySelectionGrid from '../DaySelectionGrid/DaySelectionGrid';
import AssignmentActionButtons from '../AssignmentActionButtons/AssignmentActionButtons';

/**
 * AssignMealModal - Modal for assigning a meal to a specific day/date.
 * Displays week navigation and a 7-day calendar for date selection.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {string} mealId - ID of the meal being assigned
 * @param {string} mealName - Name of the meal being assigned (for display)
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onAssign - Callback when a date is selected and submitted
 *   Signature: (mealId: string, dateString: string) => void
 * @param {Object} weeklyPlan - Object mapping date strings (YYYY-MM-DD) to meal IDs
 * @param {Array} meals - Array of meal objects with id and meal properties
 */
const AssignMealModal = ({ isOpen, mealId, mealName, onClose, onAssign, weeklyPlan, meals }) => {
  const {
    weekOffset,
    selectedDateString,
    weekDates,
    successMessage,
    handleNextWeek,
    handleSelectDate,
    handleSubmit,
    handleCancel,
  } = useAssignMealModalState(mealId, onAssign, onClose);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onBackdropClick={handleCancel}>
      <div className="space-y-6">
        <AssignMealModalHeader mealName={mealName} successMessage={successMessage} />
        <WeekNavigationSection
          weekOffset={weekOffset}
          weekDates={weekDates}
          onNextWeek={handleNextWeek}
          successMessage={successMessage}
        />
        <DaySelectionGrid
          selectedDateString={selectedDateString}
          weekDates={weekDates}
          onSelectDate={handleSelectDate}
          successMessage={successMessage}
          weeklyPlan={weeklyPlan}
          meals={meals}
        />
        <AssignmentActionButtons
          selectedDateString={selectedDateString}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          successMessage={successMessage}
        />
      </div>
    </Modal>
  );
};

export default AssignMealModal;
