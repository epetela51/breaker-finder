/**
 * Sorts an array of meal objects alphabetically by the meal name.
 *
 * @param {Array<{id: string, meal: string, note?: string}>} meals - Array of meal objects to sort.
 * @returns {Array<{id: string, meal: string, note?: string}>} Sorted copy of the meals array.
 */
export const sortMealsAlphabetically = (meals) =>
  [...meals].sort((a, b) => a.meal.localeCompare(b.meal, undefined, { sensitivity: 'base' }));
