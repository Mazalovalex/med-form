import React from "react";

export default function Step3Doctor({ doctors, onSelect, currentStep, onBack }) {
  return (
    <div className="page">
      <div className="containerNoBackgraund">
        <button onClick={onBack} className="buttonOnBack">
          ← Назад
        </button>

        <h2 className="stepTitle">Шаг {currentStep}: Выберете врача</h2>

        <div className="cardGrid">
          {doctors.map((doctor) => {
            return (
              <button key={doctor.id} className="card" onClick={() => onSelect(doctor)}>
                <h3 className="cardTitle">{doctor.name}</h3>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
