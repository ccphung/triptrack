import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
setDefaultLocale('fr');

function Calendar({ onSelectedDate, selectedDate }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        onSelectedDate(date);
      }}
      locale="fr"
      className="w-72 rounded-lg border-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      calendarClassName="rounded-lg shadow-lg p-4"
      dateFormat="dd/MM/yyyy"
      dayClassName={(date) =>
        date.toDateString() === selectedDate.toDateString()
          ? 'bg-violet-500 text-white'
          : 'text-gray-800'
      }
    />
  );
}

export default Calendar;
