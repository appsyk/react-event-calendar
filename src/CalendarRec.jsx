import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RRule } from "rrule";

const localizer = momentLocalizer(moment);

const RecurringCalendar = () => {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

  // Function to generate recurring events using RRULE
  const generateRecurringEvents = () => {
    const rule = new RRule({
      freq: RRule.WEEKLY, // Repeat weekly
      interval: 1, // Every 1 week
      dtstart: new Date("2025-03-18T10:00:00"), // Start date
      count: 365, // Occur 5 times
    });

    const recurringDates = rule.all(); // Generate event dates

    console.log(234324, recurringDates);

    // Map the recurring dates into event objects
    const recurringEvents = recurringDates.map((date, index) => ({
      id: `event-${index}`,
      title: "Weekly Standup Meeting",
      start: new Date(date),
      end: new Date(new Date(date).setHours(new Date(date).getHours() + 1)), // 1-hour event
    }));

    setEvents([...events, ...recurringEvents]);
  };

  return (
    <div>
      <h2>React Big Calendar - RRULE Recurring Events</h2>
      <button onClick={generateRecurringEvents}>Add Recurring Event</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onNavigate={(date) => {
            setDate(new Date(date));
        }}
        onView={setView}
        view={view}
        date={date}
      />
    </div>
  );
};

export default RecurringCalendar;
