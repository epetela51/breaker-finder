import { getWeekLabel, getFormattedDateRange } from '../../../../../utils/getWeekDates';

const WeekNavigationBar = ({ weekOffset, setWeekOffset, weekDates }) => {
  const handlePreviousWeek = () => {
    setWeekOffset(Math.max(weekOffset - 1, 0));
  };

  const handleNextWeek = () => {
    setWeekOffset(Math.min(weekOffset + 1, 1));
  };

  const BUTTON_CLASSES = 'text-2xl text-blue-500 hover:text-blue-600 transition px-2';

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center my-8 px-4">
      <div className="flex justify-start">
        {weekOffset > 0 && (
          <button onClick={handlePreviousWeek} className={BUTTON_CLASSES}>
            &lt;
          </button>
        )}
      </div>
      <div className="text-center">
        <p className="text-4xl font-semibold text-gray-900">{getWeekLabel(weekOffset)}</p>
        <p className="text-xl text-gray-600">{getFormattedDateRange(weekDates)}</p>
      </div>
      <div className="flex justify-end">
        {weekOffset < 1 && (
          <button onClick={handleNextWeek} className={BUTTON_CLASSES}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default WeekNavigationBar;
