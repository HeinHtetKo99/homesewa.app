type CalendarEvent = {
  date: Date;
  title: string;
};

export const events: CalendarEvent[] = [
  { date: new Date(), title: "Today: Cleaning Check" },
  { date: new Date(new Date().setDate(new Date().getDate() + 3)), title: "Follow-up Appointment" },
  { date: new Date(new Date().setDate(new Date().getDate() + 7)), title: "Weekly Service Reminder" },
];
