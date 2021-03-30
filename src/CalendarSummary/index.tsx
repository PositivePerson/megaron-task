import React, { useEffect, useState } from 'react';
import { getCalendarEvents } from '../api-client';

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import moment from 'moment';

const CalendarSummary: React.FunctionComponent = () => {

  const [data, setData] = useState<Array<Array<any>>[]>([]);
  const [dates, setDates] = useState<Array<any>[]>([]);

  const fetchDays = async () => {
    async function waitForPromise( day :Date ): Promise<Array<any>> {
      // let result = await any Promise, like:
      console.log(`getCalendarEvents function for ${day} should be done`);
      let result = await getCalendarEvents( day );
      console.log(result);
      return result;
  }

    console.log("Start");

    async function getDaysInOrder() {
      for(let i = 0; i < 7; i++) {
        const day = moment().day( i + 1 ).toDate();
      
      let dayInfo = await waitForPromise(day);

      console.log(`Day ${i} Info: `, dayInfo);
      }
    }
    await getDaysInOrder();
    // await [0,1,2,3,4,5,6].forEach( async (element) => {

    //   const day = moment().day( element + 1 ).toDate();
      
    //   let dayInfo = await waitForPromise(day);

    //   console.log(`Day ${element} Info: `, dayInfo);
    // });
    console.log("End");
  }

  const makeLine = async (i :number) => {

    const when = moment().day( i + 1 ).toDate();
    const dayInfo = await getCalendarEvents(when);
  
    // const dayInfo = await getEvent(i);

    const day = moment().day( i + 1 );
    const d = day.format('YYYY-MM-DD');
    const localNumberOfEvents = dayInfo.length;

    return [d, localNumberOfEvents, 'John', 'john@example.com'];
  }

  const createDataArray = () :Array<Array<any>> => {
    let response :Array<Array<any>> = [];


    [0,1,2,3,4,5,6].forEach(async (i) => {

      const line = await makeLine(i);
      // console.log("Line: ", line);
      response.push(line);

    })


    console.log("Response: ", response);
    return response;
  }

  useEffect(() => {
    fetchDays();

    const runFunctionsAsync = async () => {
      setData(createDataArray());
    }
    runFunctionsAsync();
    console.log(createDataArray());
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
