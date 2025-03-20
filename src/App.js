import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import InspectionCalendar from './CalendarData';
// import RecurringCalendar from './CalendarRec';

function App() {
  return (
    <div className="App">
      {/* <MyCalendar /> */}
      {/* <RecurringCalendar /> */}
      <InspectionCalendar />
      {/* <CustomCal /> */}
    </div>
  );
}

export default App;
