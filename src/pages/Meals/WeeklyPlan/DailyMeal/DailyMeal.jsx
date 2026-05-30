import React from 'react';

import { parseLocalDate } from '../../../../utils/getWeekDates';
import { formatDayAndDate, formatDateToString } from '../../../../utils/dateUtils';
import { useDailyMeal } from './hooks/useDailyMeal';
import { useNoteModal } from './hooks/useNoteModal';

import MealPickerSheet from '../MealPickerSheet/MealPickerSheet/MealPickerSheet';
import NoteModal from './NoteModal/NoteModal';
import DateBox from '../DateBox/DateBox';
import MealDisplay from '../MealDisplay/MealDisplay';

const DailyMeal = ({ dateString, mealId, meals, onMealSelected, onMealAdded, onMealUpdated }) => {
  const { isOpen: noteModalOpen, noteContent, openNote, closeNote } = useNoteModal();

  const {
    isOpen,
    openSheet,
    closeSheet,
    searchQuery,
    setSearchQuery,
    filteredMealList,
    handleSelectMeal,
    handleClearMeal,
    selectedMeal,
    isAddMealModalOpen,
    openAddMealModal,
    closeAddMealModal,
    handleMealAdded,
    isEditMealModalOpen,
    selectedMealForEdit,
    openEditMealModal,
    closeEditMealModal,
    handleMealUpdated,
  } = useDailyMeal(dateString, mealId, meals, onMealSelected, onMealAdded, onMealUpdated);

  // Parse as local date to avoid timezone offset (parseLocalDate handles YYYY-MM-DD correctly)
  const date = parseLocalDate(dateString);
  const formattedDate = formatDayAndDate(date);

  // Check if this is today's date
  const todayString = formatDateToString(new Date());
  const isToday = dateString === todayString;

  const handleNoteButtonClick = (e) => {
    e.stopPropagation();
    if (selectedMeal?.note) {
      openNote(selectedMeal.note);
    }
  };

  return (
    <>
      <div
        onClick={openSheet}
        className={`flex gap-4 p-4 rounded-lg transition-shadow cursor-pointer ${
          isToday
            ? 'border-2 border-black shadow-lg'
            : 'border border-gray-200 shadow-sm hover:shadow-md'
        }`}
      >
        <DateBox formattedDate={formattedDate} />
        <MealDisplay
          selectedMeal={selectedMeal}
          dayAbbreviation={formattedDate.day}
          onNoteButtonClick={handleNoteButtonClick}
        />
      </div>

      <MealPickerSheet
        isOpen={isOpen}
        onClose={closeSheet}
        filteredMeals={filteredMealList}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectMeal={handleSelectMeal}
        currentMeal={selectedMeal}
        onClearMeal={handleClearMeal}
        isAddMealModalOpen={isAddMealModalOpen}
        onOpenAddMealModal={openAddMealModal}
        onCloseAddMealModal={closeAddMealModal}
        handleMealAdded={handleMealAdded}
        onEditMeal={openEditMealModal}
        isEditMealModalOpen={isEditMealModalOpen}
        selectedMealForEdit={selectedMealForEdit}
        onCloseEditMealModal={closeEditMealModal}
        onMealUpdated={handleMealUpdated}
      />

      <NoteModal isOpen={noteModalOpen} noteContent={noteContent} onClose={closeNote} />
    </>
  );
};

export default React.memo(DailyMeal);
