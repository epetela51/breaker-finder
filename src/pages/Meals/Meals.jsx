import { useMemo, useState } from "react";
import Button from "../../components/Button/Button";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const INITIAL_MEALS = [
  {
    id: "meal-1",
    name: "Margherita Pizza",
    note: "Tomato, basil, fresh mozzarella",
  },
  {
    id: "meal-2",
    name: "Sheet-Pan Salmon",
    note: "Roasted broccoli + lemon dill sauce",
  },
  {
    id: "meal-3",
    name: "Veggie Stir Fry",
    note: "Rainbow veggies over jasmine rice",
  },
];

const Meals = () => {
  const [meals, setMeals] = useState(INITIAL_MEALS);
  const [mealPlan, setMealPlan] = useState(() =>
    DAYS_OF_WEEK.reduce(
      (acc, day, index) => ({
        ...acc,
        [day]: INITIAL_MEALS[index % INITIAL_MEALS.length].id,
      }),
      {}
    )
  );
  const [newMealForm, setNewMealForm] = useState({ name: "", note: "" });
  const [newMealError, setNewMealError] = useState("");
  const [selectedMealId, setSelectedMealId] = useState("");
  const [manageMealForm, setManageMealForm] = useState({ name: "", note: "" });
  const [manageError, setManageError] = useState("");

  const mealSelectOptions = useMemo(
    () =>
      meals.map((meal) => (
        <option key={meal.id} value={meal.id}>
          {meal.name}
        </option>
      )),
    [meals]
  );

  const handlePlanChange = (day, mealId) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  };

  const handleResetWeek = () => {
    setMealPlan(
      DAYS_OF_WEEK.reduce(
        (acc, day) => ({
          ...acc,
          [day]: "",
        }),
        {}
      )
    );
  };

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
    setMealPlan((prev) =>
      Object.keys(prev).reduce(
        (acc, day) => ({
          ...acc,
          [day]: prev[day] === selectedMealId ? "" : prev[day],
        }),
        {}
      )
    );

    resetManageForm();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Button url="/" text="Go Home" />

      <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Weekly Dinner Plan</h1>
            <p className="text-slate-500 text-sm">Pick a dinner for each day. All data is local for now.</p>
          </div>
          <button type="button" onClick={handleResetWeek} className="text-sm px-4 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">
            Reset week
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {DAYS_OF_WEEK.map((day) => {
            const currentMeal = meals.find((meal) => meal.id === mealPlan[day]);
            return (
              <div key={day} className="border border-slate-200 rounded-md p-4 shadow-xs bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-medium text-slate-800">{day}</h2>
                  {currentMeal && <span className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">Planned</span>}
                </div>
                <select
                  value={mealPlan[day] ?? ""}
                  onChange={(event) => handlePlanChange(day, event.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select dinner</option>
                  {mealSelectOptions}
                </select>
                {currentMeal?.note && <p className="mt-3 text-sm text-slate-600">{currentMeal.note}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Meal Library</h2>
            <p className="text-slate-500 text-sm">Add new ideas or maintain existing go-to dinners.</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleAddMealSubmit} className="space-y-4 bg-slate-50 border border-slate-200 rounded-md p-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">New meal name</label>
              <input
                type="text"
                value={newMealForm.name}
                onChange={(event) => setNewMealForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="e.g. Tacos al Pastor"
                className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Notes (optional)</label>
              <textarea
                value={newMealForm.note}
                onChange={(event) => setNewMealForm((prev) => ({ ...prev, note: event.target.value }))}
                placeholder="Quick reminder about sides, ingredients, etc."
                rows={3}
                className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {newMealError && <p className="text-sm text-red-500">{newMealError}</p>}

            <div className="flex gap-3">
              <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors">
                Add meal
              </button>
              <button type="button" onClick={resetNewMealForm} className="text-sm text-slate-500 hover:text-slate-700">
                Clear form
              </button>
            </div>
          </form>

          <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-md p-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Select existing meal</label>
              <select
                value={selectedMealId}
                onChange={(event) => selectMealForManagement(event.target.value)}
                className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={meals.length === 0}
              >
                <option value="">{meals.length === 0 ? "No meals available" : "Choose a meal to edit"}</option>
                {mealSelectOptions}
              </select>
            </div>

            {manageError && <p className="text-sm text-red-500">{manageError}</p>}

            {selectedMealId ? (
              <form onSubmit={handleUpdateMeal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Meal name</label>
                  <input
                    type="text"
                    value={manageMealForm.name}
                    onChange={(event) => setManageMealForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Notes (optional)</label>
                  <textarea
                    value={manageMealForm.note}
                    onChange={(event) => setManageMealForm((prev) => ({ ...prev, note: event.target.value }))}
                    rows={3}
                    className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors">
                    Save changes
                  </button>
                  <button type="button" onClick={handleDeleteSelectedMeal} className="text-sm px-4 py-2 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                    Delete meal
                  </button>
                  <button type="button" onClick={resetManageForm} className="text-sm text-slate-500 hover:text-slate-700">
                    Clear selection
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-slate-500">Choose a meal to edit or delete it.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meals;
