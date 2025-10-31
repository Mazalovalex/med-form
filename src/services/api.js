// Api данных созданых на Vercel
const API_URL = import.meta.env.VITE_API_URL || "https://apimed-lilac.vercel.app/api";

// Получить все специализации
export async function getSpecializations() {
  const response = await fetch(`${API_URL}/specializations`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Ошибка загрузки специализаций");
  }
  return response.json();
}

// Получить врачей по специальности

export async function getDoctors(specializationId) {
  let url = `${API_URL}/doctors`;
  if (specializationId) {
    url = url + `?specializationId=${specializationId}`;
  }

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error("Ошибка загрузки врачей");
  }
  return response.json();
}


// Получить записи к врачу на дату
export async function getAppointments(doctorId, date) {
  const url = `${API_URL}/appointments?doctorId=${doctorId}&date=${date}`;

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error("Ошибка загрузки записи");
  }
  return response.json();
}

// Создаем запись
export async function createAppointment(data) {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка созадния записи");
  }
  return response.json();
}
