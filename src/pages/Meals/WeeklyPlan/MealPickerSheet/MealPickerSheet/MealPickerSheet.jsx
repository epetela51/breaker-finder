import React from 'react';

import TextInput from '../../../../../components/TextInput/TextInput';
import CloseButton from '../../../../../components/CloseButton/CloseButton';
import MealList from '../MealList/MealList';
import MealAddModal from '../../../shared/MealAddModal/MealAddModal';

import './MealPickerSheet.css';

/**
 * MealPickerSheet - Bottom sheet component for selecting meals.
 * Presentational component (UI only, logic is in parent/hooks).
 *
 * @param {boolean} isOpen - Whether the sheet is currently open
 * @param {Function} onClose - Callback when the sheet should close (X button clicked)
 * @param {Array} filteredMeals - Pre-filtered array of meals to display
 * @param {string} searchQuery - Current search query value
 * @param {Function} onSearchChange - Callback when search input changes
 * @param {Function} onSelectMeal - Callback when a meal is selected
 * @param {Object} currentMeal - The currently selected meal object (null if none selected)
 * @param {Function} onClearMeal - Callback to clear the meal for the current day
 * @param {boolean} isAddMealModalOpen - Whether the add meal modal is open
 * @param {Function} onOpenAddMealModal - Callback to open the add meal modal
 * @param {Function} onCloseAddMealModal - Callback to close the add meal modal
 * @param {Function} handleMealAdded - Callback when a meal is successfully added
 */
const MealPickerSheet = ({
  isOpen,
  onClose,
  filteredMeals,
  searchQuery,
  onSearchChange,
  onSelectMeal,
  currentMeal,
  onClearMeal,
  isAddMealModalOpen,
  onOpenAddMealModal,
  onCloseAddMealModal,
  handleMealAdded,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 transition-opacity ${isAddMealModalOpen ? 'bg-black/70' : 'bg-black/50'}`}
      />

      {/* Bottom sheet */}
      <div
        className={`meal-picker-sheet fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Select a Meal</h2>
          <div className="flex gap-2">
            <button
              onClick={onOpenAddMealModal}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-medium"
            >
              + Add Meal
            </button>
            <CloseButton onClick={onClose} />
          </div>
        </div>

        {/* Search Input */}
        <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <TextInput value={searchQuery} onChange={onSearchChange} placeholder="Search meals..." />
        </div>

        {/* Clear Day Button - Only show if a meal is currently selected */}
        {currentMeal && (
          <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <button
              onClick={onClearMeal}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Clear Day
            </button>
          </div>
        )}

        {/* Meal List */}
        <div className="overflow-y-auto flex-1 overscroll-contain pb-safe">
          <MealList meals={filteredMeals} onSelectMeal={onSelectMeal} />
        </div>

        {/* Dark overlay when add meal modal is open */}
        {isAddMealModalOpen && (
          <div className="absolute inset-0 z-40 bg-black/50 rounded-t-2xl pointer-events-none" />
        )}
      </div>

      {/* Add Meal Modal */}
      <MealAddModal
        isOpen={isAddMealModalOpen}
        onClose={onCloseAddMealModal}
        onMealAdded={handleMealAdded}
      />
    </>
  );
};

export default MealPickerSheet;
