import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BarChart } from '@mui/x-charts/BarChart';


interface types  {
    organization:string
    eventCount:number
}

const years = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
    1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
     1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
      2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
       2011, 2012, 2013, 2014, 2015, 2016, 2017]

function  Org()  {
    const [ org , setOrg] = useState<types[]>([])
    const [ names , setNames] = useState<string[]>([])
    const [ value , setValue] = useState<number[]>([])
    const [age, setAge] = React.useState('');

    const fetchData = async (yy:number) => {
        try {
          const response = await fetch(`http://localhost:5432/api/years/allorg/${yy}}`);
          const data = await response.json();
          setOrg(data)
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

      useEffect(() => {
        if (org.length > 0) {
            const extractedNames = org.map((e) => e.organization); 
            const extractedValues = org.map((e) => e.eventCount);
            setNames(extractedNames);
            setValue(extractedValues);
          }
      }, [org]);

      // useEffect(() => {
      //   fetchData(1970)
      // }, []);


  return (
    <div>
    <Box sx={{ minWidth: 120, margin: 2, width:100}}>
      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">select year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="select year"
          onChange={(e) => {fetchData(parseInt(e.target.value))}}
        >
        {years.map((e ,index) => <MenuItem key={index} value={e}>{e}</MenuItem>)}
        </Select>
      </FormControl>
    </Box> 
        {  
        org && 
    <BarChart
      series={[
        { data: value },
      ]}
      height={600}
      xAxis={[{ data: names, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 35, left: 40, right: 10 }}
    />
    }
    </div>
  )
}

export default Org