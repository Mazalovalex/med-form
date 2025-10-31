import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { getAppointments } from "../../services/api";

registerLocale("ru", ru);

export default function Step4DateTime({ doctor, specializations, onSelect, onBack }) {
  const [selectedDate, setSelectDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Проверка, работает ли врач в этот день
  const isDoctorAvailable = (date) => {
    const dayNames = {
      0: "вс",
      1: "пн",
      2: "вт",
      3: "ср",
      4: "чт",
      5: "пт",
      6: "сб",
    };

    const dayOfWeek = dayNames[date.getDay()];
    return doctor.workDays.includes(dayOfWeek);
  };

  // Проверка является ли выбранная дата сегоднешщним днем
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Проверка, прошло ли уже это время сегодня
  const isTimePassed = (timeSlot) => {
    if (!isToday(selectedDate)) {
      return false;
    }

    const timeNow = new Date();
    const [hours, minutes] = timeSlot.split(":").map((str) => Number(str));

    const currentHours = timeNow.getHours();
    const currentMinutes = timeNow.getMinutes();

    // Сравниваем время
    if (hours < currentHours) {
      return true; // Час уже прошел
    }
    if (hours === currentHours && minutes <= currentMinutes) {
      return true; // Тот же час, но минуты прошли
    }
    return false; // Время еще не наступило
  };

  // Функция загрузки занятых слотов

  useEffect(() => {
    const loadBookedSlots = async (date) => {
      setLoading(true);
      try {
        const dateString = date.toISOString().split("T")[0]; // "2025-10-29"
        const appointments = await getAppointments(doctor.id, dateString);

        // Извлекаем только время из записей
        const bookedTimes = appointments.map((apt) => apt.time);
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error("Ошибка загрузки записей:", error);
        setBookedSlots([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      loadBookedSlots(selectedDate);
    }
  }, [selectedDate, doctor.id]);

  const isTimeSlotBooked = (time) => {
    return bookedSlots.includes(time);
  };

  return (
    <div className="page">
      <div>
        <button onClick={onBack} className="buttonOnBack">
          ← Назад
        </button>
        <div className="doctorInfo">
          <div>
            <h3 className="doctorInfoTitle">Cпециализация</h3>
            <span className="inputSelected">{specializations.name}</span>
          </div>
          <div>
            <h3 className="doctorInfoTitle">Врач</h3>
            <span className="inputSelected">{doctor.name}</span>
          </div>
          <div>
            <h3 className="doctorInfoTitle">Рабочии дни: </h3>
            <span className="inputSelected">{doctor.workDays.join(", ")}</span>
          </div>
        </div>
        <div className="container">
          {/* Календарь */}
          <div className="kalendar">
            <div className="datePickerWrapper">
              <h3 className="kalendarTitle">Выберите дату посещения: </h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectDate(date);
                  setSelectedTime(null);
                }}
                filterDate={isDoctorAvailable}
                minDate={new Date()}
                locale="ru"
                isClearable
                // inline
                dateFormat="dd.MM.yyyy"
              />
            </div>
          </div>

          {/* Временные слоты */}
          {selectedDate && (
            <div className="timeSlots">
              <h3 className="timeSlotsTitle">
                Выберете время на{" "}
                <span className="timeSlotsTitleCurrentDate">{selectedDate.toLocaleDateString("ru-RU")}</span>:
              </h3>

              {loading ? (
                <p>Загрузка доступного времени...</p>
              ) : (
                <div className="timeSlotGrid">
                  {doctor.timeSlots.map((currentTimeSlot) => {
                    const isPassed = isTimePassed(currentTimeSlot);
                    const isBooked = isTimeSlotBooked(currentTimeSlot);
                    return (
                      <button
                        key={currentTimeSlot}
                        className={`timeSlot ${selectedTime === currentTimeSlot ? "selected" : ""} ${
                          isBooked ? "booked" : ""
                        }`}
                        onClick={() => setSelectedTime(currentTimeSlot)}
                        disabled={isBooked || isPassed}>
                        {currentTimeSlot}
                        {isBooked && <span className="bookedLabel"> (занято)</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Дата и время подверждения */}
          {selectedDate && selectedTime && (
            <div className="confirmation">
              Вы выбрали: {selectedDate.toLocaleDateString("ru-RU")} в {selectedTime}
            </div>
          )}

          {/* Кнопка подтверждения */}

          {selectedDate && selectedTime && (
            <button
              className="button confirmButton"
              onClick={() => onSelect({ date: selectedDate, time: selectedTime })}>
              Заполнить персональные данные
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
