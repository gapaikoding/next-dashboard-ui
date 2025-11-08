"use client";

import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
// Asumsi Anda memiliki tipe dan data yang benar di sini
import { calendarEvents } from "@/lib/data"; 
// Asumsikan data ini memiliki struktur seperti:
// const calendarEvents = [{ title: 'Meeting', start: new Date(), end: new Date() }, ...];

// --- Konfigurasi date-fns localizer ---
const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar: React.FC = () => {
  // 💡 Perubahan di sini: Mengatur tampilan default menjadi Views.DAY
  const [view, setView] = useState<View>(Views.DAY); 
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      // Memastikan semua views yang relevan tersedia
      views={{
        month: true,
        week: true,
        day: true,
        agenda: true,
      }}
      // Menggunakan state 'view' yang sekarang default ke Views.DAY
      view={view}
      date={date}
      onView={setView}
      onNavigate={setDate}
      style={{ height: "100vh" }}
      // Properti min/max ini membatasi slot waktu yang terlihat dalam tampilan 'Day' dan 'Week'
      min={new Date(2025, 1, 0, 8, 0, 0)} // Waktu mulai jam 8 pagi
      max={new Date(2025, 1, 0, 21, 0, 0)} // Waktu berakhir jam 9 malam
      messages={{
        today: "This Time", // Mengubah teks tombol Today
        previous: "←",
        next: "→",
        month: "Month",
        week: "Week",
        day: "Day",
        agenda: "Agenda",
        showMore: (total) => `+${total} more`,
        noEventsInRange: "No events in this range",
      }}
      // Logika untuk pewarnaan event
      eventPropGetter={(event) => {
        const index = calendarEvents.findIndex((e) => e === event);
        const colors = ["#e2f8ff", "#fefce8", "#f2f1ff", "#fdf2fb"];
        const color = colors[index % 4];
        return {
          style: {
            backgroundColor: color,
            color: "#000",
            border: "none",
          },
        };
      }}
    />
  );
};

export default BigCalendar;