export function generateTimeSlots(start, end, intervalMinutes = 30) {
  const slots = [];

  // Разбираем время на числа
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // Создаем переменные для работы
  let hour = startHour; // 9
  let minute = startMinute; // 0

  // ЦИКЛ: пока не дошли до конца
  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    // Форматируем в строку "09:00"
    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    slots.push(`${hh}:${mm}`);

    // Прибавляем 30 минут
    minute += intervalMinutes;

    // прибавляем интервал
    if (minute === 60) {
      hour += 1;
      minute = 0;
    }
  }

  return slots;
}
