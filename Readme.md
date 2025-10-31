# Medical Appointment System

Веб-приложение для записи на прием к врачам. Проект включает React frontend и serverless API на Vercel.

**Важно:** Это тестовая работа, созданная для демонстрации навыков разработки. Реальная запись к врачам не осуществляется.

## Описание

Это система онлайн-записи к врачам с пошаговым интерфейсом. Пользователь выбирает специализацию, врача, дату и время приема. Система автоматически проверяет доступность временных слотов и не позволяет записаться на уже занятое время.

Проект разделен на две части:

- **Frontend** - React приложение с формой записи
- **Backend** - REST API на Vercel Serverless Functions с базой данных Vercel KV

## Ссылки

- **Демо приложения:** [ваша-ссылка-на-vercel.app](https://med-form-pi.vercel.app/)
- **API:** https://apimed-lilac.vercel.app/api
- **GitHub репозиторий:** [github.com/your-username/your-repo](https://github.com/your-username/your-repo)

API доступен публично, вы можете протестировать эндпоинты напрямую:

```bash
# Получить специализации
curl https://apimed-lilac.vercel.app/api/specializations

# Получить врачей
curl https://apimed-lilac.vercel.app/api/doctors

# Получить записи
curl https://apimed-lilac.vercel.app/api/appointments
```

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
git clone https://github.com/your-username/medical-appointment-system.git
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
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── api/                               # Backend
│   ├── specializations.js             # Эндпоинт специализаций
│   ├── doctors.js                     # Эндпоинт врачей
│   └── appointments.js                # Эндпоинт записей
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

### Создать запись

```http
POST /appointments
Content-Type: application/json
```

**Тело запроса:**

```json
{
  "doctorId": 1,
  "date": "2025-10-29",
  "time": "10:00",
  "patientName": "Петров Иван Сергеевич",
  "patientPhone": "+79991234567"
}
```

**Ответ при успехе (201):**

```json
{
  "id": 1730123456789,
  "doctorId": 1,
  "date": "2025-10-29",
  "time": "10:00",
  "patientName": "Петров Иван Сергеевич",
  "patientPhone": "+79991234567",
  "createdAt": "2025-10-29T10:30:45.123Z"
}
```

**Ответ при ошибке (409):**

```json
{
  "error": "Это время уже занято"
}
```

### Удалить запись

```http
DELETE /appointments?id=1730123456789
Content-Type: application/json
```

Требуется подтверждение через номер телефона.

**Тело запроса:**

```json
{
  "patientPhone": "+79991234567"
}
```

**Ответ при успехе (200):**

```json
{
  "success": true,
  "message": "Ваша запись успешно отменена"
}
```

Полная документация API доступна в файле [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Примеры использования

### Базовый пример

```javascript
import { getSpecializations, getDoctors, createAppointment } from "./services/api";

// Загрузить специализации
const specializations = await getSpecializations();
console.log(specializations);

// Загрузить врачей кардиологии
const doctors = await getDoctors(1);
console.log(doctors);

// Создать запись
const appointment = await createAppointment({
  doctorId: 1,
  date: "2025-10-29",
  time: "11:00",
  patientName: "Сидоров Петр",
  patientPhone: "+79991234567",
});
console.log(appointment);
```

### Проверка доступных слотов

```javascript
async function getAvailableSlots(doctorId, date, doctorTimeSlots) {
  const appointments = await getAppointments(doctorId, date);
  const bookedTimes = appointments.map((apt) => apt.time);
  const availableSlots = doctorTimeSlots.filter((slot) => !bookedTimes.includes(slot));
  return availableSlots;
}

const doctor = {
  id: 1,
  timeSlots: ["08:00", "08:30", "09:00", "09:30", "10:00"],
};

const available = await getAvailableSlots(doctor.id, "2025-10-29", doctor.timeSlots);
console.log(available); // ["08:00", "08:30", "09:30"]
```

### Проверка рабочих дней

```javascript
function isDoctorAvailable(doctor, date) {
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
}

const doctor = {
  name: "Иванов И.И.",
  workDays: ["пн", "ср", "пт"],
};

const monday = new Date("2025-10-27");
console.log(isDoctorAvailable(doctor, monday)); // true
```

## Развертывание

### Vercel (рекомендуется)

1. Установите Vercel CLI:

```bash
npm i -g vercel
```

2. Залогиньтесь:

```bash
vercel login
```

3. Выполните деплой:

```bash
vercel --prod
```

Backend автоматически деплоится вместе с frontend, если папка `api/` находится в корне проекта.

**Важно:** Не забудьте создать Vercel KV Database в панели управления и подключить её к проекту.

### Альтернативные варианты

#### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### GitHub Pages

```bash
npm install --save-dev gh-pages

# В package.json добавьте:
"homepage": "https://yourusername.github.io/your-repo",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Деплой
npm run deploy
```

## Конфигурация

### Переменные окружения

Создайте файл `.env`:

```env
VITE_API_URL=https://apimed-lilac.vercel.app/api
```

Для локальной разработки можно использовать:

```env
VITE_API_URL=http://localhost:3000/api
```

### Настройка стилей

Основные переменные находятся в `src/styles/variables.css`:

```css
:root {
  --height-header: 80px;
}
```

## Команды

```bash
npm run dev      # Запустить dev-сервер
npm run build    # Собрать проект
npm run preview  # Предпросмотр сборки
```

## Как это работает

### Процесс записи

1. Пользователь видит приветственный экран
2. Выбирает специализацию из списка
3. Выбирает врача из доступных по этой специализации
4. Выбирает дату (доступны только рабочие дни врача)
5. Выбирает время (занятые слоты отмечены и недоступны)
6. Вводит свои данные (имя и телефон)
7. Отправляет форму

### Валидация

Приложение проверяет:

- Выбран ли рабочий день врача
- Не прошло ли уже выбранное время (для сегодняшнего дня)
- Не занят ли выбранный временной слот
- Заполнены ли все поля формы

### Хранение данных

Backend использует Vercel KV (Redis) для хранения:

- `specializations` - массив специализаций
- `doctors` - массив врачей
- `appointments` - массив записей

ID записи генерируется через `Date.now()`, что дает уникальный timestamp в миллисекундах.

## Известные ограничения

- Нет адаптивной версии для мобильных устройств (только desktop 1024px+)
- Нет системы аутентификации
- Нет email или SMS уведомлений
- Нет административной панели
- Данные врачей и специализаций временно перезаписываются при каждом запросе (для тестирования)

## Планы на будущее

- Добавить адаптивный дизайн для мобильных
- Реализовать систему аутентификации
- Добавить email уведомления о записи
- Создать административную панель
- Добавить возможность редактирования записи
- Реализовать историю записей пользователя

## Разработка

### Добавление новой специализации

Отредактируйте `api/specializations.js`:

```javascript
const initialSpecializations = [
  {
    id: 7,
    name: "Стоматология",
    description: "Лечение и профилактика заболеваний зубов",
  },
];
```

### Добавление нового врача

Отредактируйте `api/doctors.js`:

```javascript
const initialDoctors = [
  {
    id: 14,
    name: "Новиков Сергей Петрович",
    specializationId: 7,
    workDays: ["пн", "вт", "ср", "чт", "пт"],
    timeSlots: ["09:00", "10:00", "11:00", "12:00"],
  },
];
```

### Изменение цветовой схемы

В `src/styles/global.css` найдите нужные цвета и измените их:

```css
.button {
  background-color: #224bcb; /* Основной цвет кнопок */
}

.button:hover {
  background-color: #1940b6; /* Цвет при наведении */
}
```

## Устранение неполадок

### Ошибка CORS

Если видите ошибку CORS в консоли браузера, проверьте:

1. Правильно ли указан URL API в `.env`
2. Включены ли CORS заголовки на backend

### Не загружаются данные

1. Проверьте подключение к интернету
2. Откройте Network tab в DevTools
3. Убедитесь что запросы возвращают статус 200
4. Проверьте консоль на наличие ошибок JavaScript

### Не работает выбор даты

1. Проверьте что у врача указаны рабочие дни
2. Убедитесь что выбираете будущую дату
3. Проверьте что дата попадает на рабочий день врача

## Лицензия

MIT License - подробности в файле LICENSE

## Контакты

GitHub: [github.com/your-username](https://github.com/your-username)

---

Последнее обновление: 31 октября 2025
