import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import React, { useState } from 'react'
import event from './event';
import schedulerData from './schedulerData';
import { RRule } from "rrule";

const locales = {
    'en-US': enUS,
}

console.log(34535, schedulerData);

const MyCalendar = (props) => {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false);
    const [events, setEvents] = useState(event);

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

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    return (
        <div>

      <button onClick={generateRecurringEvents}>Add Recurring Event</button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100vh' }}
                view={view}
                onView={setView}
                date={date}
                defaultDate={new Date(2015, 3, 1)}
                showAllEvents={false}
                onShowMore={(val) => console.log(val)}
                popup={false}
                enableAutoScroll={true}
                onNavigate={(date) => {
                    setDate(new Date(date));
                }}
                toolbar={true}
                timeslots={12}
                step={60}
                onShowMore={(events, date) => {
                    setView(view)
                    console.log(32423, events, date);
                    setPopup({
                        show: true,
                        events
                    })
                }}
            />
            {
                popup.show && <div style={{background: 'white', position: 'fixed', height: '100vh', right: '0px', top: '0px', zIndex: '7', width: '300px'}}>
                    <div>
                        <button onClick={() => setPopup({...popup, show: false})}>Close</button>
                        {
                            popup?.events?.length && popup.events.map(item => {
                                console.log(42342, item);
                                return (
                                <div key={item.id} style={{background: 'green', marginBottom: '1rem', padding: '1rem', textAlign: 'left'}}>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div>
                                        Start: {new Date(item.start).toDateString()} | 
                                        End: {new Date(item.end).toDateString()}
                                    </div>
                                </div>
                            )})
                        }
                    </div>
                </div>
            }
        </div>
    )

}
export default MyCalendar;