# Medical Appointment System

Веб-приложение для записи на прием к врачам. Проект включает React frontend и serverless API на Vercel.

**Важно:** Это тестовая работа, созданная для демонстрации навыков разработки. Реальная запись к врачам не осуществляется.

## Описание

Это система онлайн-записи к врачам с пошаговым интерфейсом. Пользователь выбирает специализацию, врача, дату и время приема. Система автоматически проверяет доступность временных слотов и не позволяет записаться на уже занятое время.

Проект разделен на две части:

- **Frontend** - React приложение с формой записи

  ![внешний вид](/public/screen.png)

- **Backend** - REST API на Vercel Serverless Functions с базой данных Vercel KV

## Ссылки

- **Демо приложения:** [med-form-pi.vercel.app](https://med-form-pi.vercel.app/)
- **API:** https://apimed-lilac.vercel.app/api

API доступен публично, вы можете протестировать эндпоинты напрямую:

### Получить специализации

```bash
curl https://apimed-lilac.vercel.app/api/specializations
```

**Пример ответа:**

![Ответ API specializations](/public/api-specializations.png)

### Получить врачей

```bash
curl https://apimed-lilac.vercel.app/api/doctors
```

**Пример ответа:**

![Ответ API doctors](/public/api-doctors.png)

### Получить записи

```bash
curl https://apimed-lilac.vercel.app/api/appointments
```

**Пример ответа:**

![Ответ API appointments](/public/api-appointments.png)

## Основные возможности

- Выбор медицинской специализации
- Выбор врача из доступных специалистов
- Календарь с отображением рабочих дней врача
- Проверка занятых временных слотов в реальном времени
- Валидация выбранного времени (нельзя выбрать прошедшее время)
- Защита от двойной записи на одно и то же время
- Простая форма для ввода данных пациента

## Технологии

### Frontend

- React 18
- Vite
- React DatePicker
- date-fns
- Vanilla CSS

### Backend

- Vercel Serverless Functions
- Vercel KV (Redis)
- REST API

## Установка и запуск

### Требования

- Node.js версии 18 или выше
- npm или yarn

### Шаги установки

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Mazalovalex/med-form.git
cd medical-appointment-system
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=https://apimed-lilac.vercel.app/api
```

4. Запустите dev-сервер:

```bash
npm run dev
```

5. Откройте браузер по адресу `http://localhost:5173`

## Структура проекта

```
medical-appointment-system/
├── src/
│   ├── components/
│   │   ├── BookingSteps.jsx           # Главный компонент
│   │   ├── Header.jsx                 # Шапка сайта
│   │   └── steps/
│   │       ├── Step1Info.jsx          # Приветственный экран
│   │       ├── Step2Specialization.jsx # Выбор специализации
│   │       ├── Step3Doctor.jsx        # Выбор врача
│   │       ├── Step4DateTime.jsx      # Выбор даты и времени
│   │       └── Step5PatientInfo.jsx   # Форма данных пациента
│   │
│   ├── services/
│   │   └── api.js                     # Функции для работы с API
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── reset.css
│   │   └── variables.css
│   │   └── form-steps.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

## API Endpoints

Базовый URL: `https://apimed-lilac.vercel.app/api`

### Получить специализации

```http
GET /specializations
```

Возвращает список всех медицинских специализаций.

**Пример ответа:**

```json
[
  {
    "id": 1,
    "name": "Кардиология",
    "description": "Болезни сердца и сосудов"
  },
  {
    "id": 2,
    "name": "Терапия",
    "description": "Общие заболевания"
  }
]
```

### Получить врачей

```http
GET /doctors
GET /doctors?specializationId=1
```

Возвращает список врачей. Можно фильтровать по специализации.

**Пример ответа:**

```json
[
  {
    "id": 1,
    "name": "Иванов Иван Иванович",
    "specializationId": 1,
    "workDays": ["пн", "ср", "пт"],
    "timeSlots": ["08:00", "08:30", "09:00", "09:30", "10:00"]
  }
]
```

### Получить записи

```http
GET /appointments?doctorId=1&date=2025-10-29
```

Возвращает список записей. Можно фильтровать по врачу и дате.

**Пример ответа:**

```json
[
  {
    "id": 1730123456789,
    "doctorId": 1,
    "date": "2025-10-29",
    "time": "10:00",
    "patientName": "Петров Иван",
    "patientPhone": "+79991234567",
    "createdAt": "2025-10-28T12:30:45.123Z"
  }
]
```

---

Последнее обновление: 31 октября 2025
