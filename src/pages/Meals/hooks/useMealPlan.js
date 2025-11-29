import { useCallback, useState } from "react";

const buildInitialMealPlan = (daysOfWeek, seedMeals = []) =>
  daysOfWeek.reduce((acc, day, index) => {
    if (seedMeals.length === 0) {
      return {
        ...acc,
        [day]: "",
      };
    }

    const meal = seedMeals[index % seedMeals.length];
    return {
      ...acc,
      [day]: meal?.id ?? "",
    };
  }, {});

export const useMealPlan = ({ initialMeals = [], daysOfWeek = [] }) => {
  const [mealPlan, setMealPlan] = useState(() => buildInitialMealPlan(daysOfWeek, initialMeals));

  const handlePlanChange = useCallback((day, mealId) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  }, []);

  const handleResetWeek = useCallback(() => {
    setMealPlan(buildInitialMealPlan(daysOfWeek, initialMeals));
  }, [daysOfWeek, initialMeals]);

  const unlinkMealFromPlan = useCallback((mealId) => {
    if (!mealId) return;

    setMealPlan((prev) =>
      Object.keys(prev).reduce(
        (acc, day) => ({
          ...acc,
          [day]: prev[day] === mealId ? "" : prev[day],
        }),
        {}
      )
    );
  }, []);

  return { mealPlan, handlePlanChange, handleResetWeek, unlinkMealFromPlan };
};

