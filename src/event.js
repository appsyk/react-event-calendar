const now = new Date()

export default [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2025, 2, 0),
    end: new Date(2025, 2, 1),
  }, */
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2025, 2, 7),
    end: new Date(2025, 2, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2025, 2, 9, 0, 0, 0),
    end: new Date(2025, 2, 9, 0, 0, 0),
    allDay: true,
  },

  {
    id: 92,
    title: 'Some Other Event',
    start: new Date(2025, 2, 9, 8, 0, 0),
    end: new Date(2025, 2, 10, 11, 30, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2025, 2, 11),
    end: new Date(2025, 2, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2025, 2, 12, 10, 30, 0, 0),
    end: new Date(2025, 2, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2025, 2, 12, 12, 0, 0, 0),
    end: new Date(2025, 2, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2025, 2, 12, 14, 0, 0, 0),
    end: new Date(2025, 2, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2025, 2, 12, 17, 0, 0, 0),
    end: new Date(2025, 2, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2025, 2, 12, 20, 0, 0, 0),
    end: new Date(2025, 2, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2025, 2, 13, 8, 0, 0),
    end: new Date(2025, 2, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2025, 2, 13, 9, 30, 0),
    end: new Date(2025, 2, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2025, 2, 13, 11, 30, 0),
    end: new Date(2025, 2, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2025, 2, 13, 15, 30, 0),
    end: new Date(2025, 2, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2025, 2, 17, 19, 30, 0),
    end: new Date(2025, 2, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2025, 2, 17, 19, 30, 0),
    end: new Date(2025, 2, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2025, 2, 20, 19, 30, 0),
    end: new Date(2025, 2, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today\'s test event',
    allDay: true,
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 24)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    allDay: true,
    start: now,
    end: now,
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2025, 2, 14, 15, 30, 0),
    end: new Date(2025, 2, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2025, 2, 14, 16, 30, 0),
    end: new Date(2025, 2, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: 'Itaewon Meeting',
    start: new Date(2025, 2, 14, 16, 30, 0),
    end: new Date(2025, 2, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2025, 2, 14, 17, 30, 0),
    end: new Date(2025, 2, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2025, 2, 14, 17, 0, 0),
    end: new Date(2025, 2, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2025, 2, 14, 17, 0, 0),
    end: new Date(2025, 2, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2025, 2, 14, 17, 30, 0),
    end: new Date(2025, 2, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2025, 2, 14, 18, 30, 0),
    end: new Date(2025, 2, 14, 20, 0, 0),
  },
  {
    id: 24,
    title: 'DST ends on this day (Europe)',
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
  },
  {
    id: 25,
    title: 'DST ends on this day (America)',
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 26,
    title: 'DST starts on this day (America)',
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
  },
  {
    id: 27,
    title: 'DST starts on this day (Europe)',
    start: new Date(2023, 2, 26, 0, 0, 0),
    end: new Date(2023, 2, 26, 4, 30, 0),
  },
]