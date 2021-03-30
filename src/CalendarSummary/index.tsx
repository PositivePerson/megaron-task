import React, { useEffect, useState } from 'react';
import { CalendarEvent, getCalendarEvents } from '../api-client';

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import moment from 'moment';

const CalendarSummary: React.FunctionComponent = () => {

  const [data, setData] = useState<Array<CalendarEvent[]>[]>([]);


  const fetchDays = async () => {
    console.log("Start");

    async function getDaysInOrder() {
      for(let i = 0; i < 7; i++) {
        const day = moment().day( i + 1 );
      
      let dayInfo = await getCalendarEvents( day.toDate() );

      console.log(`Day ${i} Info: `, dayInfo);

      makeLine(day, dayInfo);
      }
    }

    await getDaysInOrder();
    console.log("End");
  }


  const sumTimeOfEvents = ( dayInfo :CalendarEvent[]) => {

    let result = 0;
    dayInfo.map((day) => {
      result += day.durationInMinutes;
    })

    return result;
  }


  const findLongestEvent = ( day :CalendarEvent[]) => {

    const theLongest = day.reduce(function(prev, current) {
      return (prev.durationInMinutes > current.durationInMinutes) ? prev : current
    })

    return theLongest.title;
  }


  const makeLine = async (day :moment.Moment, dayInfo :CalendarEvent[]) => {

    const d = day.format('YYYY-MM-DD');
    const localNumberOfEvents = dayInfo.length;
    const totalTime = sumTimeOfEvents( dayInfo );
    const theLongestEvent = findLongestEvent( dayInfo );

    const result = [d, localNumberOfEvents, totalTime, theLongestEvent]
    console.log("MakeLine: ", [d, localNumberOfEvents, totalTime, theLongestEvent]);

    updateData( result );
  }

  const updateData = ( line :Array<any>) => {
    setData(data => [...data, line])
  }


  useEffect(() => {
    fetchDays();
  }, [])


  return (
    <div>
      <h2>Calendar summary</h2>
      
      <Grid
  data={ data }
  columns={['Date', 'Number of events', 'Total duration [min]', 'Longest event']} 

/>

    </div>
  );
};

export default CalendarSummary;
