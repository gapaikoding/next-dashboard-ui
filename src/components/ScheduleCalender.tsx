"use client";

import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
// Pastikan sessionsData dan classesData sudah tersedia
import { sessionsData, classesData } from "@/lib/data"; 

// --- Konfigurasi locale date-fns ---
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 🔹 Fungsi bantu untuk ubah string waktu ke Date
function parseSessionDateTime(dateStr: string, timeStr: string): { start: Date; end: Date } {
  const [startTime, endTimePart] = timeStr.split("sd").map((s) => s.trim());
  const [startHour, startMinute] = startTime.split(".").map(Number);
  const [endHour, endMinute] = endTimePart.replace("WIB", "").trim().split(".").map(Number);

  const [year, month, day] = dateStr.split("-").map(Number);
  // Bulan dalam JS Date dimulai dari 0 (Januari)
  const start = new Date(year, month - 1, day, startHour, startMinute); 
  const end = new Date(year, month - 1, day, endHour, endMinute);
  return { start, end };
}

// 🔹 Buat events dari sessionsData
const events = sessionsData.map((session, index) => {
  const { start, end } = parseSessionDateTime(session.date, session.time);

  // ambil Class Code dari classesData
  const classInfo = classesData.find((c) => c.id === session.classId);
  const classCode = classInfo ? classInfo.code : `Class ${session.classId}`;

  return {
    // Kami tetap menyimpan title, tapi kami akan memodifikasinya di komponen kustom
    title: `${classCode} - ${session.tutor}`, 
    start,
    end,
    index,
    // 💡 Tambahkan data spesifik yang ingin ditampilkan ke dalam objek event
    classCode: classCode, 
    teacher: session.tutor,
  };
});

// --- KOMPONEN KUSTOM UNTUK EVENT ---
// Komponen ini akan menggantikan tampilan default event
const CustomEvent = ({ event }: { event: any }) => {
  return (
    <div className="text-xs leading-tight font-medium overflow-hidden h-full">
      {/* Code Kelas dan Teacher (yang diambil dari objek event kustom) */}
      <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
        {event.classCode}
      </div>
      <div className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
        {event.teacher}
      </div>
    </div>
  );
};
// ------------------------------------

const ScheduleCalendar: React.FC = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const colors = ["#e2f8ff", "#fefce8", "#f2f1ff", "#fdf2fb"]; // 4 warna berulang

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4"></h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        views={{ month: true, week: true, day: true, agenda: true }}
        style={{ height: "80vh", borderRadius: "12px" }}
        min={new Date(2025, 0, 1, 8, 0, 0)}
        max={new Date(2025, 0, 1, 21, 0, 0)}
        messages={{
          today: "Today",
          previous: "←",
          next: "→",
          month: "Month",
          week: "Week",
          day: "Day",
          agenda: "Agenda",
          noEventsInRange: "No sessions in this range",
        }}
        eventPropGetter={(event) => {
          const color = colors[event.index % colors.length];
          return {
            style: {
              backgroundColor: color,
              color: "#000",
              borderRadius: "6px",
              border: "none",
              padding: "4px 6px",
            },
          };
        }}
        // 🌟 PERBAIKAN UTAMA: Gunakan properti components
        components={{
            event: CustomEvent, // Menerapkan komponen kustom untuk event
        }}
      />
    </div>
  );
};

export default ScheduleCalendar;