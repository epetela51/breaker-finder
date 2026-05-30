import { useMemo, useState } from 'react';
import { useMealPlan } from './hooks/useMealPlan';
import { useWeekReset } from './hooks/useWeekReset';
import { useFetchMeals } from '../hooks/useFetchMeals';
import { sortMealsAlphabetically } from '../utils/mealSortUtils';
import { getWeekDates } from '../../../utils/getWeekDates';
import { formatDateToString } from '../../../utils/dateUtils';
import { DAYS_OF_WEEK } from '../constants';

import AppHeader from '../../../components/AppHeader/AppHeader';
import MealsSubNav from '../shared/MealsSubNav/MealsSubNav';
import WeekNavigationBar from '../shared/WeekNavigation/WeekNavigationBar/WeekNavigationBar';
import DailyMeal from './DailyMeal/DailyMeal';
import ActionSection from '../../../components/ActionSection/ActionSection';

const Meals = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const { meals, setMeals, weeklyPlan, setWeeklyPlan, isLoading } = useFetchMeals();

  const { mealPlan, handlePlanChange, resetMealPlan } = useMealPlan({
    initialMealPlan: weeklyPlan,
  });

  const handleMealAdded = (newMeal) => {
    setMeals((prev) => sortMealsAlphabetically([...prev, newMeal]));
  };

  const handleMealUpdate = (updatedMeal) => {
    setMeals((prevMeals) =>
      sortMealsAlphabetically(
        prevMeals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
      )
    );
  };

  // Get dates for the selected week
  const weekDates = useMemo(() => getWeekDates(new Date(), weekOffset), [weekOffset]);

  const { handleResetWeek, isResetting } = useWeekReset(
    resetMealPlan,
    setWeeklyPlan,
    weekDates,
    DAYS_OF_WEEK
  );

  return (
    <>
      <AppHeader />
      <MealsSubNav />
      <div className="sm:px-4 py-6 max-w-5xl mx-auto space-y-8">
        <section>
          <WeekNavigationBar
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            weekDates={weekDates}
          />
          <ActionSection title="Reset Week">
            <button
              onClick={() => handleResetWeek(weekDates.Monday)}
              disabled={isResetting}
              className="w-full md:w-auto px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition font-medium text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isResetting ? 'Clearing...' : 'Clear All'}
            </button>
          </ActionSection>
          {isLoading ? (
            <p className="text-2xl text-gray-600">Loading meal plan for the week...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {DAYS_OF_WEEK.map((day) => {
                  const dateString = formatDateToString(weekDates[day]);
                  return (
                    <DailyMeal
                      key={day}
                      dateString={dateString}
                      mealId={mealPlan[dateString]}
                      meals={meals}
                      onMealSelected={handlePlanChange}
                      onMealAdded={handleMealAdded}
                      onMealUpdated={handleMealUpdate}
                    />
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Meals;
