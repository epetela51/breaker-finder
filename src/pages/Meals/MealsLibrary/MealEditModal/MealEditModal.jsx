import { useEditMealModal } from './hooks/useEditMealModal';

import Modal from '../../../../components/Modal/Modal';
import MealForm from '../../shared/MealForm/MealForm';

/**
 * MealEditModal - Modal dialog for editing a meal.
 * Purely presentational component that renders the edit form in a modal overlay.
 * All logic is handled by useEditMealModal hook.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Object} meal - Meal object being edited with { id, meal, note }
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onMealUpdated - Callback when meal is successfully updated with (updatedMeal)
 */
const MealEditModal = ({ isOpen, meal, onClose, onMealUpdated }) => {
  const { isSubmitSuccess, handleSubmit, handleCancel } = useEditMealModal(
    meal,
    onClose,
    onMealUpdated
  );

  if (!isOpen) return null;
  if (!meal) return null;

  return (
    <Modal isOpen={isOpen} onBackdropClick={handleCancel}>
      <MealForm
        key={meal.id}
        initialTitle={meal.meal}
        initialNote={meal.note || ''}
        title="Edit Meal"
        submitButtonLabel="Save Meal"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        showCancelButton={true}
        isSubmitSuccess={isSubmitSuccess}
      />
    </Modal>
  );
};

export default MealEditModal;
