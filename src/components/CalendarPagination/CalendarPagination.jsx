import css from './CalendarPagination.module.css';
import sprite from '../../assets/icons/sprite.svg';
const CalendarPagination = ({ dateForCalendar, setDateForCalendar }) => {
  const formattedMonth = new Date(dateForCalendar).toLocaleString('en-US', {
    month: 'long',
  });

  const formattedYear = new Date(dateForCalendar).toLocaleString('en-US', {
    year: 'numeric',
  });

  const handlePreviousMonth = () => {
    setDateForCalendar(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDateForCalendar(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className={[css.calender_pag_div]}>
      <h2 className={css.word_month}>Month</h2>

      <div className={css.pag_element}>
        <button className={css.button_back_month} onClick={handlePreviousMonth}>
          <svg className={css.icon_arrow_calendar_left}>
            <use href={`${sprite}#icon-chevron-down`}></use>
          </svg>
        </button>

        <span className={css.current_month_year}>
          {formattedMonth}, {formattedYear}
        </span>

        <button className={css.button_next_month} onClick={handleNextMonth}>
          <svg className={css.icon_arrow_calendar_right}>
            <use href={`${sprite}#icon-chevron-down`}></use>
          </svg>
        </button>

        <button className={css.show_info_button}>
          <svg className={css.icon_pie_chart}>
            <use href={`${sprite}#icon-pie-chart`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
