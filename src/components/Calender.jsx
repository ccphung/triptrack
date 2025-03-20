import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
setDefaultLocale('fr');

const Calendar = ({ field }) => {
  return (
    <DatePicker
      selected={field.value ? new Date(field.value) : null}
      onChange={(date) => field.onChange(date.toISOString())}
      locale="fr"
      className="input"
      calendarClassName="custom-calendar"
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default Calendar;
