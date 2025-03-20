import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import CustomView from './CustomView'
import { useMemo, useState } from 'react'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
//...


const locales = {
    'en-US': enUS,
}

const CustomCal = () => {
    const [view, setView] = useState('month');

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })
    const { views, ...otherProps } = useMemo(() => ({
        views: {
            month: true,
            week: CustomView,
            day: true
        },
        localizer
        // ... other props
    }), [])

    const myEventsList = [
        {
            allDay: true,
            title: <div style={{ background: 'grey' }}>
                <div style={{ background: 'red', padding: '8px 16px', marginBottom: '10px', width: 'min-content' }}>Daily</div>
                <div>Mental Health</div>
            </div>,
            start: new Date(),
            end: new Date(),
            resource: 'this is resource tab'
        },
        {
            allDay: false,
            title: <div style={{ background: 'grey' }}>
                <div style={{ background: 'red', padding: '8px 16px', marginBottom: '10px', width: 'min-content' }}>Daily</div>
                <div>Hand Hygiene</div>
            </div>,
            start: new Date(),
            end: new Date(1742419740000),
            resource: 'this is resource tab2'
        },
        {
            allDay: false,
            title: 'this is test scheduler 3',
            start: new Date(),
            end: new Date(),
            resource: 'this is resource tab2'
        },
        {
            allDay: false,
            title: <div style={{ background: 'grey' }}>
                <div style={{ background: 'red', padding: '8px 16px', marginBottom: '10px', width: 'min-content' }}>Daily</div>
                <div>Physical Health</div>
            </div>,
            start: new Date(),
            end: new Date(1742419740000),
            resource: 'this is resource tab2'
        }
    ]
    //...
    return <Calendar
        views={views}
        {...otherProps}
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={setView}
        showAllEvents={false}
        onShowMore={(val) => console.log(val)}
        popup={false}
        enableAutoScroll={true}
    />
}

export default CustomCal