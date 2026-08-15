import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import ConfirmationScreen from '../components/ConfirmationScreen';
import { BookingFormData, BookingStatus, FormErrors } from '../types/booking';
import { validateName, validatePhone, validateDate, validateTime, validateGuests } from '../utils/validation';


export default function Home() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  });
  const [status, setStatus] = useState<BookingStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }));
  };

const validateForm = (): boolean => {
  const newErrors: FormErrors = {
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  };
  const nameError = validateName(formData.name);
  if (nameError) newErrors.name = nameError;
  const phoneError = validatePhone(formData.phone);
  if (phoneError) newErrors.phone = phoneError;
  const dateError = validateDate(formData.date);
  if (dateError) newErrors.date = dateError;
  const timeError = validateTime(formData.time);
  if (timeError) newErrors.time = timeError;
  const guestsError = validateGuests(formData.guests);
  if (guestsError) newErrors.guests = guestsError;

  setErrors(newErrors);
  return Object.values(newErrors).every(error => error === '');
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
    });
    setErrors({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
    });
  };

  return (
    <main >
      <h1 style={{ margin: '0 0 30px 0', textAlign: 'center' }}>Бронирование столика</h1>
      {status === 'success' ? (
        <ConfirmationScreen data={formData} onReset={resetForm} />
      ) : (
        <BookingForm
          setErrors={setErrors}
          formData={formData}
          errors={errors}
          isLoading={status === 'loading'}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}