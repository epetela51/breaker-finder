import { getWeekLabel, getFormattedDateRange } from '../../../../../utils/getWeekDates';

/**
 * WeekNavigationSection - Week navigation controls and date range display.
 */
const WeekNavigationSection = ({ weekOffset, weekDates, onNextWeek, successMessage }) => {
  if (successMessage) return null;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-900">{getWeekLabel(weekOffset)}</p>
        <p className="text-sm text-gray-600">{getFormattedDateRange(weekDates)}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onNextWeek}
          disabled={weekOffset === 1}
          className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default WeekNavigationSection;
