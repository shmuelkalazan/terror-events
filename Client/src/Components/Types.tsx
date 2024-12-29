import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { blue } from '@mui/material/colors';


interface types  {
    name:string
    eventsCount:number
}

function  Types()  {
    const [ types , setTypes] = useState<types[]>([])
    const [ names , setNames] = useState<string[]>([])
    const [ value , setValue] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5432/api/events/");
            const data = await response.json();
            setTypes(data)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        if (types.length > 0) {
            const extractedNames = types.map((e) => e.name); 
            const extractedValues = types.map((e) => e.eventsCount);
            setNames(extractedNames);
            setValue(extractedValues);
          }
      }, [types]);

  return (
    <div >{  
        types && 
    <BarChart
      series={[
        { data: value , color :"#4caf50"},
      ]}
      height={600}
      xAxis={[{ data: names, scaleType: 'band' }]}
      
      margin={{ top: 10, bottom: 35, left: 40, right: 10 }}
    />
    }
    </div>
  )
}

export default Types