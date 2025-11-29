import { useMemo, useState } from "react";

export const useMealsLibrary = ({ initialMeals = [], onMealDelete } = {}) => {
  const [meals, setMeals] = useState(initialMeals);
  const [newMealForm, setNewMealForm] = useState({ name: "", note: "" });
  const [newMealError, setNewMealError] = useState("");
  const [selectedMealId, setSelectedMealId] = useState("");
  const [manageMealForm, setManageMealForm] = useState({ name: "", note: "" });
  const [manageError, setManageError] = useState("");

  const mealOptions = useMemo(
    () =>
      meals.map((meal) => ({
        id: meal.id,
        name: meal.name,
      })),
    [meals]
  );

  const resetNewMealForm = () => {
    setNewMealForm({ name: "", note: "" });
    setNewMealError("");
  };

  const resetManageForm = () => {
    setSelectedMealId("");
    setManageMealForm({ name: "", note: "" });
    setManageError("");
  };

  const selectMealForManagement = (mealId) => {
    setSelectedMealId(mealId);
    setManageError("");

    if (!mealId) {
      setManageMealForm({ name: "", note: "" });
      return;
    }

    const meal = meals.find((item) => item.id === mealId);
    if (meal) {
      setManageMealForm({ name: meal.name, note: meal.note ?? "" });
      return;
    }

    // Meal no longer exists; clear form to avoid stale data
    setManageMealForm({ name: "", note: "" });
  };

  const handleAddMealSubmit = (event) => {
    event.preventDefault();
    const trimmedName = newMealForm.name.trim();

    if (!trimmedName) {
      setNewMealError("Meal name is required.");
      return;
    }

    const newMeal = {
      id: `meal-${Date.now()}`,
      name: trimmedName,
      note: newMealForm.note.trim(),
    };

    setMeals((prev) => [...prev, newMeal]);
    resetNewMealForm();
  };

  const handleUpdateMeal = (event) => {
    event.preventDefault();

    if (!selectedMealId) {
      setManageError("Select a meal first.");
      return;
    }

    const trimmedName = manageMealForm.name.trim();
    if (!trimmedName) {
      setManageError("Meal name is required.");
      return;
    }

    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === selectedMealId
          ? {
              ...meal,
              name: trimmedName,
              note: manageMealForm.note.trim(),
            }
          : meal
      )
    );
    setManageError("");
    resetManageForm();
  };

  const handleDeleteSelectedMeal = () => {
    if (!selectedMealId) {
      setManageError("Select a meal first.");
      return;
    }

    setMeals((prev) => prev.filter((meal) => meal.id !== selectedMealId));
    onMealDelete?.(selectedMealId);
    resetManageForm();
  };

  return {
    meals,
    mealOptions,
    newMealForm,
    newMealError,
    setNewMealForm,
    selectedMealId,
    manageMealForm,
    manageError,
    setManageMealForm,
    handleAddMealSubmit,
    handleUpdateMeal,
    handleDeleteSelectedMeal,
    selectMealForManagement,
    resetNewMealForm,
    resetManageForm,
  };
};

