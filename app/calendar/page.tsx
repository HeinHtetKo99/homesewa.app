'use client';

import { useState } from "react";
import { events } from "../data/calendarEvents";

type CalendarEvent = {
  date: Date;
  title: string;
};

type ImportantDay = {
  month: number; // 0 = January
  date: number;
  title: string;
};

// --- Hard-coded international days (UN + Global Observances) ---
const internationalDays: ImportantDay[] = [
  { month: 0, date: 4, title: "World Braille Day" },
  { month: 0, date: 24, title: "International Day of Education" },
  { month: 0, date: 27, title: "International Holocaust Remembrance Day" },
  { month: 1, date: 2, title: "World Wetlands Day" },
  { month: 1, date: 4, title: "International Day of Human Fraternity" },
  { month: 1, date: 6, title: "Zero Tolerance to Female Genital Mutilation Day" },
  { month: 1, date: 10, title: "World Pulses Day" },
  { month: 1, date: 11, title: "International Day of Women & Girls in Science" },
  { month: 1, date: 13, title: "World Radio Day" },
  { month: 1, date: 20, title: "World Day of Social Justice" },
  { month: 1, date: 21, title: "International Mother Language Day" },
  { month: 2, date: 1, title: "Zero Discrimination Day" },
  { month: 2, date: 3, title: "World Wildlife Day" },
  { month: 2, date: 8, title: "International Women's Day" },
  { month: 2, date: 20, title: "International Day of Happiness" },
  { month: 2, date: 21, title: "World Down Syndrome Day" },
  { month: 2, date: 21, title: "International Day of Forests" },
  { month: 2, date: 22, title: "World Water Day" },
  { month: 3, date: 2, title: "World Autism Awareness Day" },
  { month: 3, date: 4, title: "International Day for Mine Awareness" },
  { month: 3, date: 7, title: "World Health Day" },
  { month: 3, date: 22, title: "International Mother Earth Day" },
  { month: 4, date: 3, title: "World Press Freedom Day" },
  { month: 4, date: 15, title: "International Day of Families" },
  { month: 4, date: 22, title: "International Day for Biological Diversity" },
  { month: 4, date: 31, title: "World No Tobacco Day" },
  { month: 5, date: 5, title: "World Environment Day" },
  { month: 5, date: 8, title: "World Oceans Day" },
  { month: 5, date: 14, title: "World Blood Donor Day" },
  { month: 5, date: 21, title: "International Day of Yoga" },
  { month: 6, date: 11, title: "World Population Day" },
  { month: 6, date: 18, title: "Nelson Mandela International Day" },
  { month: 7, date: 9, title: "International Day of the World’s Indigenous Peoples" },
  { month: 7, date: 12, title: "International Youth Day" },
  { month: 7, date: 19, title: "World Humanitarian Day" },
  { month: 8, date: 8, title: "International Literacy Day" },
  { month: 8, date: 15, title: "International Day of Democracy" },
  { month: 8, date: 21, title: "International Day of Peace" },
  { month: 9, date: 1, title: "International Day of Older Persons" },
  { month: 9, date: 5, title: "World Teachers’ Day" },
  { month: 9, date: 10, title: "World Mental Health Day" },
  { month: 9, date: 16, title: "World Food Day" },
  { month: 10, date: 2, title: "International Day of Non‑Violence" },
  { month: 10, date: 10, title: "World Science Day for Peace & Development" },
  { month: 10, date: 14, title: "World Diabetes Day" },
  { month: 10, date: 19, title: "World Toilet Day" },
  { month: 11, date: 1, title: "World AIDS Day" },
  { month: 11, date: 3, title: "International Day of Persons with Disabilities" },
  { month: 11, date: 10, title: "Human Rights Day" },
  { month: 11, date: 18, title: "International Migrants Day" },
  { month: 11, date: 20, title: "International Human Solidarity Day" },
];

const Calendar = () => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [currentDate] = useState<Date>(new Date());
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [bannerEvents, setBannerEvents] = useState<CalendarEvent[] | null>(null);

  const daysOfWeek: string[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const getDaysInMonth = (month: number, year: number): number =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number): number =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) setSelectedYear(selectedYear - 1), setSelectedMonth(11);
    else setSelectedMonth(selectedMonth - 1);
    setBannerEvents(null);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) setSelectedYear(selectedYear + 1), setSelectedMonth(0);
    else setSelectedMonth(selectedMonth + 1);
    setBannerEvents(null);
  };

  const handleToday = () => {
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
    setSelectedDate(currentDate);
    setBannerEvents(null);
  };

  const isToday = (day: number | null) =>
    day === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

  const isInternational = (day: number | null) =>
    day !== null && internationalDays.some(d => d.date === day && d.month === selectedMonth);

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dayEvents = events.filter(
      e => e.date.getDate() === day &&
           e.date.getMonth() === selectedMonth &&
           e.date.getFullYear() === selectedYear
    );
    setBannerEvents(dayEvents.length > 0 ? dayEvents : null);
  };

  return (
    <div className="py-12 px-2 md:px-10 h-full">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-2xl font-semibold">{monthNames[selectedMonth]} {selectedYear}</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={handlePrevMonth} className="px-3 py-1 border rounded hover:bg-gray-100">‹</button>
            <button onClick={handleNextMonth} className="px-3 py-1 border rounded hover:bg-gray-100">›</button>
            <button onClick={handleToday} className="px-3 py-1 border rounded hover:bg-gray-100">Today</button>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 text-sm font-medium text-gray-600 border-b border-gray-200 mb-1">
          {daysOfWeek.map(d => <div key={d} className="text-center py-2">{d}</div>)}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px border border-gray-200 text-sm">
          {days.map((day, idx) => {
            const dayHasEvents = events.some(
              e => e.date.getDate() === day &&
                   e.date.getMonth() === selectedMonth &&
                   e.date.getFullYear() === selectedYear
            );
            return (
              <div
                key={idx}
                onClick={() => handleDayClick(day)}
                className={`min-h-[90px] p-2 flex flex-col justify-between border border-gray-200 relative cursor-pointer
                  ${isToday(day) ? "bg-blue-100 border-blue-400 font-bold" : ""}
                  ${isInternational(day) ? "bg-indigo-100 border-indigo-400 font-semibold" : ""}
                  ${day === null ? "border-none cursor-default bg-gray-50" : ""}`}
              >
                {day && (
                  <>
                    <div className="self-start">{day}</div>
                    {dayHasEvents && <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Important Days List */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Important International Days</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {internationalDays.filter(d => d.month === selectedMonth).map((d, i) => (
              <li key={i} className="p-1 border rounded bg-indigo-50">{d.date} {monthNames[d.month]} - {d.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Event Banner */}
      {bannerEvents && (
        <div className="absolute top-0 right-0 w-72 h-full p-4 bg-white border-l border-gray-200 shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Event Details</h4>
            <button onClick={() => setBannerEvents(null)} className="text-gray-500 font-bold">×</button>
          </div>
          {bannerEvents.map((e, i) => (
            <div key={i} className="mb-2 p-2 border-b border-gray-100">{e.title}</div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Calendar;