import React from "react";

export default function Step1Info({ onSelect }) {
  return (
    <div className="page">
      <div className="containerInfo1Step">
        <h1 className="infoTitle">Запись на приём к врачу</h1>
        <hr className="line" />
        <p className="infoText">
          Это демонстрационная форма для тестирования. Вы можете выбрать услугу, врача, дату и время — но не
          переживайте, это только пример, настоящая запись никуда не отправляется. Просто попробуйте, чтобы увидеть, как
          всё работает.
        </p>
        <button className="button" onClick={() => onSelect()}>
          Начать
        </button>
      </div>
    </div>
  );
}
