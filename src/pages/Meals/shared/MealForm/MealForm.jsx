import { useState } from 'react';

import TextInput from '../../../../components/TextInput/TextInput';

const MealForm = ({
  initialTitle = '',
  initialNote = '',
  onSubmit,
  submitButtonLabel = 'Submit',
  showCancelButton = false,
  onCancel,
  title = 'Meal Form',
  isSubmitSuccess = false,
}) => {
  const [mealTitle, setMealTitle] = useState(initialTitle);
  const [mealNote, setMealNote] = useState(initialNote);

  const handleSubmit = () => {
    onSubmit({ title: mealTitle, note: mealNote });
  };

  const handleReset = () => {
    setMealTitle(initialTitle);
    setMealNote(initialNote);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleReset();
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>

      <div className="space-y-4">
        <TextInput value={mealTitle} onChange={setMealTitle} placeholder="Meal name..." />

        <TextInput
          value={mealNote}
          onChange={setMealNote}
          placeholder="Notes (optional)..."
          isTextarea={true}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 px-4 py-2 text-white rounded transition ${
              isSubmitSuccess
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {submitButtonLabel}
          </button>

          {showCancelButton && (
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealForm;
