import React from 'react';
import { BookingFormData } from '../types/booking';
import styles from './ConfirmationScreen.module.css'

interface Props {
  data: BookingFormData;
  onReset: () => void;
}

const ConfirmationScreen: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className={styles.container}>
      <h2>Бронирование подтверждено!</h2>
      <p><strong>Имя:</strong> {data.name}</p>
      <p><strong>Телефон:</strong> {data.phone}</p>
      <p><strong>Дата:</strong> {data.date}</p>
      <p><strong>Время:</strong> {data.time}</p>
      <p><strong>Гостей:</strong> {data.guests}</p>
      <button onClick={onReset} className={styles.button}>
        Забронировать ещё
      </button>
    </div>
  );
};

export default ConfirmationScreen;