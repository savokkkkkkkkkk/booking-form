import React from 'react';
import styles from './BookingForm.module.css';
import { BookingFormData, FormErrors } from '../types/booking';
import { validateName, validatePhone, validateDate, validateTime, validateGuests } from '../utils/validation';

interface BookingFormProps {
    setErrors: (value: FormErrors | ((prev: FormErrors) => FormErrors)) => void;
    formData: BookingFormData;
    errors: FormErrors;
    isLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
    setErrors,
    formData,
    errors,
    isLoading,
    onChange,
    onSubmit,
}) => {
    const timeSlots = [];
    for (let i = 12; i <= 22; i++) {
        timeSlots.push(`${i}:00`);
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Имя гостя</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Иван Иванов"
                    onBlur={() => {
                        const error = validateName(formData.name);
                        setErrors(prev => ({ ...prev, name: error || '' }));
                    }}
                />
                {errors.name && <p className={styles.errors}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>Телефон</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="+7 999 123-45-67"
                    onBlur={() => {
                        const error = validatePhone(formData.phone);
                        setErrors(prev => ({ ...prev, phone: error || '' }));
                    }}
                />
                {errors.phone && <p className={styles.errors}>{errors.phone}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="date" className={styles.label}>Дата</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className={styles.input}
                    value={formData.date}
                    onChange={onChange}
                    onBlur={() => {
                        const error = validateDate(formData.date);
                        setErrors(prev => ({ ...prev, date: error || '' }));
                    }}
                />
                {errors.date && <p className={styles.errors}>{errors.date}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="time" className={styles.label}>Время</label>
                <select
                    id="time"
                    name="time"
                    className={styles.select}
                    value={formData.time}
                    onChange={onChange}
                    onBlur={() => {
                        const error = validateTime(formData.time);
                        setErrors(prev => ({ ...prev, time: error || '' }));
                    }}
                >
                    <option value="">Выберите время</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
                {errors.time && <p className={styles.errors}>{errors.time}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="guests" className={styles.label}>Количество гостей</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    className={styles.input}
                    value={formData.guests || ''}
                    onChange={onChange}
                    min='1'
                    max='12'
                    onBlur={() => {
                        const error = validateGuests(formData.guests);
                        setErrors(prev => ({ ...prev, guests: error || '' }));
                    }}
                />
                {errors.guests && <p className={styles.errors}>{errors.guests}</p>}
            </div>

            <button
                type="submit"
                className={styles.button}
                disabled={isLoading}
            >
                {isLoading ? 'Бронирую...' : 'Забронировать'}
            </button>
        </form>
    );
};

export default BookingForm;