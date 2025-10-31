import React, { useEffect, useState } from "react";
import { getSpecializations, getDoctors } from "../services/api";
import { createAppointment } from "../services/api";

import Header from "./Header";
import Step1Info from "./steps/Step1Info";
import Step2Specialization from "./steps/Step2Specialization";
import Step3Doctor from "./steps/Step3Doctor";
import Step4DateTime from "./steps/Step4DateTime";
import Step5PatientInfo from "./steps/Step5PatientInfo";

export default function BookingSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем специализации
  useEffect(() => {
    async function loadSpecializations() {
      try {
        const data = await getSpecializations();
        setSpecializations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadSpecializations();
  }, []);

  // Загружаем врачей
  async function loadDoctors(specializationId) {
    setLoading(true);
    try {
      const data = await getDoctors(specializationId);
      setDoctors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Обработка отправки формы
  const handleBookingSubmit = async (patientData) => {
    // Формируем данные для отправки на API
    const appointmentData = {
      doctorId: selectedDoctor.id,
      date: selectedDateTime.date.toISOString().split("T")[0], // Формат: "2025-10-29"
      time: selectedDateTime.time,
      patientName: patientData.firstName,
      patientPhone: patientData.phone,
    };

    try {
      // Отправляем запись на сервер
      const response = await createAppointment(appointmentData);

      console.log("Запись успешно создана:", response);

      // Показываем успешное сообщение
      alert(
        `Запись успешно создана!\n\nПациент: ${patientData.firstName}\nТелефон: ${patientData.phone}\nВрач: ${
          selectedDoctor.name
        }\nДата: ${selectedDateTime.date.toLocaleDateString("ru-RU")} в ${selectedDateTime.time}`
      );

      // Сброс формы
      setCurrentStep(1);
      setSelectedDoctor(null);
      setSelectedSpecialization(null);
      setSelectedDateTime(null);
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <Header />

      {/* ШАГ 1 - приветственное окно */}
      {currentStep === 1 && (
        <div className="loading">
          {loading ? <p>Загрузка данных...</p> : <Step1Info onSelect={() => setCurrentStep(2)} />}
        </div>
      )}

      {/* ШАГ 2 - выбор специализации */}
      {currentStep === 2 && (
        <Step2Specialization
          specializations={specializations}
          currentStep={currentStep}
          onBack={() => setCurrentStep(1)}
          onSelect={(id) => {
            const specialization = specializations.find((currentSpecialization) => currentSpecialization.id === id);
            setSelectedSpecialization(specialization);
            loadDoctors(id);
            setCurrentStep(3);
          }}
        />
      )}

      {/* ШАГ 3 - Выбор доктора */}
      {currentStep === 3 && (
        <>
          {loading ? (
            <div className="page">
              <div className="containerNoBackgraund">
                <p className="loading">Загрузка врачей...</p>
              </div>
            </div>
          ) : (
            <>
              <Step3Doctor
                currentStep={currentStep}
                onBack={() => setCurrentStep(2)}
                doctors={doctors}
                onSelect={(doctor) => {
                  setSelectedDoctor(doctor);
                  setCurrentStep(4);
                }}
              />
            </>
          )}
        </>
      )}

      {/* ШАГ 4 - Выбор даты и время */}
      {currentStep === 4 && selectedDoctor && (
        <Step4DateTime
          doctor={selectedDoctor}
          specializations={selectedSpecialization}
          onBack={() => setCurrentStep(3)}
          onSelect={(selectedDateTime) => {
            setSelectedDateTime(selectedDateTime);
            setCurrentStep(5);
          }}
        />
      )}

      {/* ШАГ 5 - Заполнить данные для записи */}
      {currentStep === 5 && <Step5PatientInfo onBack={() => setCurrentStep(4)} onSubmit={handleBookingSubmit} />}
    </div>
  );
}
