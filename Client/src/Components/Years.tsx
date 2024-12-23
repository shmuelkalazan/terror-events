import React ,{ useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import './years.css'

interface info  {
  name:number
  average:number
}
const yy = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
   1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
     2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
      2011, 2012, 2013, 2014, 2015, 2016, 2017]


function Years() {
      const [ info , setInfo] = useState<info[]>([])
      const [ names , setNames] = useState<number[]>([])
      const [ averages , setAvarage] = useState<number[]>([])
      const [year, setYear] = React.useState("");
      const [range, setRange] = React.useState<number[]>([1970, 2017]);

      const BASE_URL = "http://localhost:5432/api/years/"

      useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`${BASE_URL}get/0/5`);
              const data = await response.json();
              setInfo(data)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchData();
        }, []);
  
        useEffect(() => {
          if (info.length > 0) {
              const extractedNames = info.map((e) => e.name);
              const extractedValues = info.map((e) => e.average); 
              setNames(extractedNames);
              setAvarage(extractedValues);
            }
          }, [info]);
        useEffect(() => {
          handleRange()

        }, [range]);  

          const handleRange = () => {
            const fetchData = async () => {
              try {
                const response = await fetch(`${BASE_URL}range/${range[0]}/${range[1]}`);
                const data = await response.json();
                setInfo(data)
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchData();
          }

          const handle5Years= (n:number) => {
            const fetchData = async () => {
              try {
                const response = await fetch(`${BASE_URL}get/0/${n}`);
                const data = await response.json();
                setInfo(data)
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchData();
          }
          
          const handleYears= (n:number) => {
            const fetchData = async () => {
              try {
                const response = await fetch(`${BASE_URL}get/${n}/0`);
                const data = await response.json();
                setInfo(data)
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchData();
          }

          
          const handleChange2 = (event: Event, newValue: number | number[],activeThumb: number,) => {
            if (!Array.isArray(newValue)) {
              return;
            }
            const minDistance = 1
        
            if (newValue[1] - newValue[0] < minDistance) {
              if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2017 - minDistance);
                setRange([clamped, clamped + minDistance]);
              } else {
                const clamped = Math.max(newValue[1], 1970 + minDistance);
                setRange([clamped - minDistance, clamped]);
              }
            } else {
              setRange(newValue);
            }
          };
          
          return (
            <div>
      <div className='header_years'>
        <Button onClick={()=>{handle5Years(5)}} variant="contained">5 years</Button>
        <Button onClick={()=>{handle5Years(10)}} variant="contained">10 years</Button>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={range}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            min={1970}
            max={2017}
            step={1}
            disableSwap
          />
        </Box>
        {/* <p>choosh a date </p> */}
        <Box sx={{ minWidth: 120  , maxWidth:200}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">select year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="select year"
              onChange={(e) => {handleYears(parseInt(e.target.value))}}
            >{yy.map((e ,index) => <MenuItem key={index} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </div>
      {info &&
      <BarChart
      series={[
        { data: averages },
      ]}
      height={450}
      xAxis={[{ data: names, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
      }
    </div>
  )
}

export default Years