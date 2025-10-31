import React from "react";

export default function Step2Specialization({ specializations, onSelect, currentStep, onBack }) {
  return (
    <div className="page">
      <div className="containerNoBackgraund">
        <button onClick={onBack} className="buttonOnBack">
          ← Назад
        </button>
        <h2 className="stepTitle">Шаг {currentStep}: Выберете специализацию</h2>
        <div className="cardGrid">
          {specializations.map((specialization) => {
            return (
              <button key={specialization.id} className="card" onClick={() => onSelect(specialization.id)}>
                <h3 className="cardTitle">{specialization.name}</h3>
                <p className="cardDescription">{specialization.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
