export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Имя обязательно';
  if (name.trim().length < 2) return 'Минимум 2 символа';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }
  return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
};

export const validateDate = (date: string): string | null => {
  if (!date) return 'Дата обязательна';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(date);
  if (selected < today) return 'Дата не может быть раньше сегодня';
  return null;
};

export const validateTime = (time: string): string | null => {
  if (!time) return 'Выберите время';
  return null;
};

export const validateGuests = (guests: number): string | null => {
  if (guests < 1 || guests > 12) return 'Количество гостей от 1 до 12';
  return null;
};


