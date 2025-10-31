import React, { useState } from "react";

export default function Step5PatientInfo({ onBack, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка заполнения полей
    if (!firstName.trim() || !phone.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Отправляем данные
    onSubmit({
      firstName,

      phone,
    });
  };

  return (
    <div className="page">
      <div className="containerNoBackgraund">
        <button onClick={onBack} className="buttonOnBack">
          ← Назад
        </button>

        <h2 className="stepTitle">Шаг 5: Введите ваши данные</h2>

        {/* Форма для ввода данных */}
        <form onSubmit={handleSubmit} className="patientForm">
          <div className="containerInputs">
            <div className="formGroup">
              <input
                type="text"
                id="firstNameAndLastName"
                className="formInput"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ваше Имя и Фамилия"
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="tel"
                id="phone"
                className="formInput"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 999-99-99"
                required
              />
            </div>
          </div>
          <button type="submit" className="button confirmButton">
            Записаться к врачу
          </button>
        </form>
      </div>
    </div>
  );
}
