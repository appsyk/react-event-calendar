import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { parseISO, addDays } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RRule } from "rrule";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Sample deadline data
const deadlineData = [
    { id: 74412, deadline: "2025-03-18T23:59:59+00:00", ward_id: 100, inspection_type_id: 1289, inspection_report: null, scheduler: { id: 485, frequency: "daily" } },
    {
        id: 71608, deadline: "2025-08-21T23:59:59+00:00", ward_id: 99, inspection_type_id: 750, inspection_report: {
            "id": 47988,
            "ended_at": 1742392834,
            "score": 0,
            "issues_count": {
                "new": 0,
                "repeat": 0,
                "resolved": 0
            },
            "responded_state": "not responded",
            "inspection_mode": "self",
            "inspected_by": {
                "id": 8069,
                "email": "shekhar.m1@yopmail.com",
                "first_name": "Shekhar",
                "last_name": "M1",
                "profile_photo": {
                    "thumb": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/thumb/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=657cf0b7ae435a0ef1286d16290ac8ed41c447a49134f8dba158c4718c9d70533d9c4b2bff1b213527eeb4d2ca95af7e3e51c6e33199c90ea278a958d89fa560242209b31789101dd941d20c33be6f64fcbd19b66b7cd70214a12c6fda9b47f8b92e4717d16e31642b5fb189d9e8eb7541feb5d20b82f92d9c4731522ef5eca65197b39163fafed621d8e7bf4436a45f5a67225eae399f83635eeabca5c55dfdfbd8d8b5751db13c1b5465db97f0260f9a0070a0c7470e0ad986831f0f367b465d754822ba66e2ae0d46d8152588978c67c369b232d3d42280ee3f94551d39a12082f7dbd17cef8a772e599138888ed60e5841734d249aa84a66a1bafd80ab6e",
                    "medium": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/medium/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=19d591973d7520fee7feb2bab34829f16c0209da11f04ece08b21bc19c3785bcda569204a8888553c86ecd1cc46529ed47d136d6246816da3693d1fd6823798909220a18b4fb021cc750b632f46ae4d72afbeab64960028cd67628dc6dd5cac89c3bee8be5c255d4aa855ed508a8a51a4557259d9e19989d5f31db1fb170fe97cb0f5489ba0164df4f09a476fdc8f5e90527bf729679cb467a994fc7b91b8900395435651cb6c86ceebae3b1e6fa9f1c02885e297806fae8d3e92a530b7545e3772f85f080d00762eab84c633158e36020124ae82e8905cc8aa5cf9334cfcdefc39b9c7bd4a01ed8f97d91c6f4b35e3b7639dc37fe90f2c449da872e2d70a738",
                    "large": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/large/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=278289ac5b69855eda9dbbc5ff21331b0f09b491a57a58fce9ba2aa5a0a7cb67ae4474e1d65f6a27efbc7f80e46cb1e3a3bf667a0be685d983060e4bcb9e96c10d3fbd697734cc09d2275796a926e8beabbb2645e566414f56e4f3e6d511bcf88bbc58434f8109facc51fba828b22748689d4e4f683d474e86ae7e8442efaafa29d12cfec54cd17e15d1b234a1620941d10ec6749275b197a5fae40b39c818f0fb554bd582aef658ef84ed43b4d340e11f6ffc1a16381cc7d29fa2a9293fbc972cc0defee06d15b005285bd07f75f213843ab24d0f0d211ef1d23403eab77d850a2da14d22c79f4d8c9d4a925e74c27be416206dfc8f1abd492cfa40c77994d0"
                },
                "job_title": "Developer",
                "role_name": "Check Staff 1"
            }
        }, scheduler: { id: 480, frequency: "weekly" }
    },
    {
        id: 75064, deadline: "2025-04-28T23:59:59+00:00", ward_id: 99, inspection_type_id: 1303, inspection_report: {
            "id": 47988,
            "ended_at": 1742392834,
            "score": 0,
            "issues_count": {
                "new": 0,
                "repeat": 0,
                "resolved": 0
            },
            "responded_state": "not responded",
            "inspection_mode": "self",
            "inspected_by": {
                "id": 8069,
                "email": "shekhar.m1@yopmail.com",
                "first_name": "Shekhar",
                "last_name": "M1",
                "profile_photo": {
                    "thumb": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/thumb/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=657cf0b7ae435a0ef1286d16290ac8ed41c447a49134f8dba158c4718c9d70533d9c4b2bff1b213527eeb4d2ca95af7e3e51c6e33199c90ea278a958d89fa560242209b31789101dd941d20c33be6f64fcbd19b66b7cd70214a12c6fda9b47f8b92e4717d16e31642b5fb189d9e8eb7541feb5d20b82f92d9c4731522ef5eca65197b39163fafed621d8e7bf4436a45f5a67225eae399f83635eeabca5c55dfdfbd8d8b5751db13c1b5465db97f0260f9a0070a0c7470e0ad986831f0f367b465d754822ba66e2ae0d46d8152588978c67c369b232d3d42280ee3f94551d39a12082f7dbd17cef8a772e599138888ed60e5841734d249aa84a66a1bafd80ab6e",
                    "medium": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/medium/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=19d591973d7520fee7feb2bab34829f16c0209da11f04ece08b21bc19c3785bcda569204a8888553c86ecd1cc46529ed47d136d6246816da3693d1fd6823798909220a18b4fb021cc750b632f46ae4d72afbeab64960028cd67628dc6dd5cac89c3bee8be5c255d4aa855ed508a8a51a4557259d9e19989d5f31db1fb170fe97cb0f5489ba0164df4f09a476fdc8f5e90527bf729679cb467a994fc7b91b8900395435651cb6c86ceebae3b1e6fa9f1c02885e297806fae8d3e92a530b7545e3772f85f080d00762eab84c633158e36020124ae82e8905cc8aa5cf9334cfcdefc39b9c7bd4a01ed8f97d91c6f4b35e3b7639dc37fe90f2c449da872e2d70a738",
                    "large": "https://collab-240-v2-stg-uk-devstack-ward-inspector-images.storage.googleapis.com/users/profile_photos/8069/large/SM20240816-8-mnqvqr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-stg-uk-api-cr%40prj-tnd-stg-uk-svc-01.iam.gserviceaccount.com%2F20250319%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250319T140102Z&X-Goog-Expires=600&X-Goog-SignedHeaders=host&x-goog-signature=278289ac5b69855eda9dbbc5ff21331b0f09b491a57a58fce9ba2aa5a0a7cb67ae4474e1d65f6a27efbc7f80e46cb1e3a3bf667a0be685d983060e4bcb9e96c10d3fbd697734cc09d2275796a926e8beabbb2645e566414f56e4f3e6d511bcf88bbc58434f8109facc51fba828b22748689d4e4f683d474e86ae7e8442efaafa29d12cfec54cd17e15d1b234a1620941d10ec6749275b197a5fae40b39c818f0fb554bd582aef658ef84ed43b4d340e11f6ffc1a16381cc7d29fa2a9293fbc972cc0defee06d15b005285bd07f75f213843ab24d0f0d211ef1d23403eab77d850a2da14d22c79f4d8c9d4a925e74c27be416206dfc8f1abd492cfa40c77994d0"
                },
                "job_title": "Developer",
                "role_name": "Check Staff 1"
            }
        }, scheduler: { id: 492, frequency: "weekday" }
    },
    { id: 71541, deadline: "2025-03-31T23:59:59+01:00", ward_id: 100, inspection_type_id: 750, inspection_report: null, scheduler: { id: 478, frequency: "monthly" } }
];

// Map frequency strings to RRule constants
const frequencyMap = {
    daily: RRule.DAILY,
    weekly: RRule.WEEKLY,
    monthly: RRule.MONTHLY,
    yearly: RRule.YEARLY,
    weekday: RRule.WEEKLY, // Custom logic for weekdays
};

// Generate recurring events with deadline as end date
const generateRecurringEvents = (deadlines) => {
    let events = [];
    const recurringDates = [];

    console.log(234324, deadlines);

    deadlines.forEach((deadlineItem) => {
        const { deadline, scheduler, inspection_report, ward_id, inspection_type_id } = deadlineItem;
        console.log(324234, inspection_report);
        const startDate = parseISO(deadline);
        const endDate = parseISO(deadline); // Deadline acts as end date

        if (!scheduler || !frequencyMap[scheduler.frequency]) return;

        const ruleOptions = {
            freq: frequencyMap[scheduler.frequency],
            dtstart: new Date(2025, 1, 22),
            interval: 1,
            until: endDate, // Stop recurrence at deadline
        };

        if (scheduler.frequency === "weekday") {
            ruleOptions.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
        }

        const rule = new RRule(ruleOptions);
        recurringDates.push({
            freq: scheduler.frequency,
            dates: rule.all()
        })

        recurringDates.forEach(({ dates, freq }, index) => {
            dates.forEach(datess => {
                console.log(234234, inspection_report);
                events.push({
                    id: `${deadlineItem.id}-${index}`,
                    title: (
                        <div style={{ fontWeight: '500', margin: '1px' }}>
                            <div style={{ fontSize: '8px', width: 'min-content', borderRadius: '2px', color: 'white', background: inspection_report ? "#32A267" : '#1C64F2', padding: '2px' }}>{freq.toUpperCase()}</div>
                            <div style={{ fontSize: '11px', textOverflow: 'ellipsis', overflow: 'hidden' }}>Inspection Type {inspection_type_id}</div>
                        </div>
                    ),
                    subTitle: (
                        <div style={{ fontWeight: '500', margin: '1px' }}>
                            <div style={{ fontSize: '9px' }}>
                                <i>{inspection_report?.ended_at && `Submitted on
                        ${format(new Date(inspection_report?.ended_at * 1000), 'dd MMM yyyy')}`}</i>
                            </div>
                        </div>
                    ),
                    start: new Date(datess),
                    end: addDays(new Date(datess), 1), // One-day event
                    allDay: true,
                    status: inspection_report ? "Submitted" : "Not Submitted",
                    ward_id,
                    inspection_type_id,
                    inspection_report
                });
            })
        });
    });

    return events;
};

const InspectionCalendar = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedWard, setSelectedWard] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        const generatedEvents = generateRecurringEvents(deadlineData);
        setEvents(generatedEvents);
        setFilteredEvents(generatedEvents);
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = events;

        if (selectedWard !== "all") {
            filtered = filtered.filter((event) => event.ward_id.toString() === selectedWard);
        }

        if (selectedType !== "all") {
            filtered = filtered.filter((event) => event.inspection_type_id.toString() === selectedType);
        }

        setFilteredEvents(filtered);
    }, [selectedWard, selectedType, events]);

    // Custom event styling
    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.status === "Submitted" ? "#EBF7F1" : "#EBF5FF", // Green for Submitted, Red for open
            borderRadius: "5px",
            color: event.status === "Submitted" ? "#32A267" : '#1C64F2',
            borderLeft: "2px solid",
            borderLeftColor: event.status === "Submitted" ? "#32A267" : '#1C64F2',
            padding: "5px",
        };
        return { style };
    };

    const formats = {
        weekdayFormat: (date, culture, localizer) => {
            return format(date, 'EEE').toUpperCase()
        },
    }

    return (
        <div>
            <h2>Hospital Inspection Calendar</h2>

            {/* Filters */}
            <div style={{ marginBottom: "10px" }}>
                <label>Filter by Ward:</label>
                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                    <option value="all">All</option>
                    <option value="100">Ward 100</option>
                    <option value="99">Ward 99</option>
                </select>

                <label style={{ marginLeft: "10px" }}>Filter by Inspection Type:</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="1289">Type 1289</option>
                    <option value="750">Type 750</option>
                    <option value="1303">Type 1303</option>
                </select>
            </div>

            <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter} // Apply custom styling
                view={view}
                onView={setView}
                date={date}
                onNavigate={(date) => setDate(new Date(date))}
                showAllEvents={false}
                formats={formats}
                toolbar={true}
                components={{
                    week: {
                        header: ({ date, localizer }) => <div>
                            <div style={{ color: '#161616', fontSize: '14px' }}>{format(date, 'dd')} {format(date, 'MMM')}</div>
                            <div style={{ color: 'rgba(33, 33, 33, 0.70)', fontSize: '12px' }}>{format(date, 'EEEE')}</div>
                        </div>
                    },
                    month: {
                        header: ({ date, localizer }) =>
                            <div style={{ color: 'rgba(33, 33, 33, 0.70)', fontSize: '14px', fontWeight: 500 }}>{format(date, 'EEE').toUpperCase()}</div>
                    },
                    // toolbar: () => <div>Toolbar</div> // Can implement custom toolbar
                }}
                onSelectSlot={(data) => console.log(3323, data)}
                onShowMore={(events, date) => {
                    setView(view)
                    console.log(32423, events, date);
                    setPopup({
                        show: true,
                        events,
                        date
                    })
                }}
            />
            {
                popup.show && <div style={{ background: '#F9FAFB', border: '1px solid #DCE4E8', boxShadow: 'grey 0px 0px 50px -5px', position: 'fixed', height: '100vh', right: '0px', top: '0px', zIndex: '7', width: '300px' }}>
                    <div>
                        <div style={{ display: 'flex', padding: '0.5rem 1rem', alignItems: 'center', justifyContent: 'space-between', background: '#E5E7EB' }}>
                            <div>{format(popup.date, 'EEE, do MMM yyyy')}</div>
                            <button style={{ border: 'none', background: 'transparent' }} onClick={() => setPopup({ ...popup, show: false })}>x</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '1rem' }}>
                            {
                                popup?.events?.length && popup.events.map(item => {
                                    console.log(23424, item);
                                    return (
                                        <div key={item.id} style={{ fontSize: 'larger', backgroundColor: item.status === 'Submitted' ? "#EBF7F1" : "#EBF5FF", borderRadius: '5px', color: item.status === 'Submitted' ? "#32A267" : '#1C64F2', borderLeft: item.status === 'Submitted' ? '2px solid #32A267' : '2px solid #1C64F2', padding: '5px' }}>
                                            <div>
                                                {item.title}
                                                {item.subTitle}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default InspectionCalendar;
