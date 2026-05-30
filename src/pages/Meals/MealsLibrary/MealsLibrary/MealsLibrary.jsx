import { useMemo } from 'react';
import { useFetchMeals } from '../../hooks/useFetchMeals';
import { useMealSearch } from '../../hooks/useMealSearch';
import { useMealsLibraryForm } from '../hooks/useMealsLibraryForm';
import { useMealLibraryEditor } from '../hooks/useMealLibraryEditor';
import { useMealLibraryStateSync } from '../hooks/useMealLibraryStateSync';
import { useDeleteMeal } from '../hooks/useDeleteMeal';
import { useAssignMealToDate } from '../hooks/useAssignMealToDate';

import AppHeader from '../../../../components/AppHeader/AppHeader';
import MealsSubNav from '../../shared/MealsSubNav/MealsSubNav';
import TextInput from '../../../../components/TextInput/TextInput';
import ExpandableMealListItem from '../ExpandableMealListItem/ExpandableMealListItem';
import MealEditModal from '../MealEditModal/MealEditModal';
import AssignMealModal from '../AssignMealModal/AssignMealModal';
import NewMeals from '../NewMeals/NewMeals';

/**
 * MealsLibrary - Full-page view for browsing all meals with search functionality.
 * Allows users to view, search, edit, and delete meals.
 * Also includes a dynamic collapsible form to add new meals without leaving the page.
 */
const MealsLibrary = () => {
  const { meals, setMeals, weeklyPlan, isLoading } = useFetchMeals();
  const { searchQuery, setSearchQuery, filteredMeals } = useMealSearch();
  const { isFormOpen, handleToggleForm, handleMealAdded } = useMealsLibraryForm(setMeals);
  const performDelete = useDeleteMeal();
  const {
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
  } = useMealLibraryEditor(meals, setMeals, performDelete);

  const assignMealToDate = useAssignMealToDate();

  useMealLibraryStateSync(isFormOpen, expandedMealId, handleToggleMeal);

  const displayedMeals = useMemo(() => filteredMeals(meals), [meals, filteredMeals]);

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <MealsSubNav />
        <div className="sm:px-4 py-6 max-w-5xl mx-auto">
          <p className="text-2xl text-gray-600">Loading meals...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <MealsSubNav />
      <div className="sm:px-4 py-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Meals Library</h1>

          <div className="mb-6">
            <TextInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search meals..."
            />
          </div>

          <button
            onClick={handleToggleForm}
            className="mb-6 w-full md:w-auto px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition font-medium text-gray-900"
          >
            {isFormOpen ? '✕ Cancel' : '+ Add New Meal'}
          </button>

          {isFormOpen && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <NewMeals onMealAdded={handleMealAdded} />
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {displayedMeals.length > 0 ? (
              <div>
                {displayedMeals.map((meal) => (
                  <ExpandableMealListItem
                    key={meal.id}
                    meal={meal}
                    isExpanded={expandedMealId === meal.id}
                    onToggle={() => handleToggleMeal(meal.id)}
                    onEdit={() => handleEditMeal(meal)}
                    onDelete={() => handleDeleteMealClick(meal.id)}
                    onAssign={() => handleOpenAssignModal(meal)}
                  />
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">No meals found</div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {displayedMeals.length} of {meals.length} meals
          </div>
        </div>

        {/* Edit Meal Modal */}
        <MealEditModal
          isOpen={isModalOpen}
          meal={selectedMealForEdit}
          onClose={handleModalClose}
          onMealUpdated={handleMealUpdated}
        />

        {/* Assign Meal to Date Modal */}
        <AssignMealModal
          isOpen={isAssignModalOpen}
          mealId={selectedMealForAssignment?.id}
          mealName={selectedMealForAssignment?.meal}
          onClose={handleCloseAssignModal}
          onAssign={assignMealToDate}
          weeklyPlan={weeklyPlan}
          meals={meals}
        />
      </div>
    </>
  );
};

export default MealsLibrary;
