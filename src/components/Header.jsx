import React from "react";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src="/logo.svg" alt="" />{" "}
      <nav>
        <ul className="listMenu">
          <li>
            <a href="#" title="Услуги" aria-label="Перейти в раздел Услуги">
              Услуги
            </a>
          </li>
          <li>
            <a href="#" title="Документы" aria-label="Перейти в раздел Документы">
              Документы
            </a>
          </li>
          <li>
            <a href="#" title="Заявления" aria-label="Перейти в раздел Заявления">
              Заявления
            </a>
          </li>
          <li>
            <a href="#" title="Помощь" aria-label="Перейти в раздел Помощь">
              Помощь
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
