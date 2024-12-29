import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './country.css'
import 'leaflet/dist/leaflet.css';
import { BarChart } from '@mui/x-charts/BarChart';

interface Country {
  _id: string;
  name: string;
  eventsCount: number;
  average: number;
  lat: number;
  long: number;
}

interface event{
  name:string
  events:number
}

function CountryMap() {
  const [baseDisply, setBaseDisply] = React.useState(true);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [age, setAge] = React.useState('');
  const [aria, setAria] = React.useState('');
  const [allOrgByeria, setAllOrgByAria] = React.useState<event[]>([]);
  const [ names , setNames] = useState<string[]>([])
  const [ value , setValue] = useState<number[]>([])
  const [ariaInfo, setInfo] = React.useState<Country>();
  const [org5, setOrg5] = React.useState<event[]>([]);




  useEffect(() => {
    if (allOrgByeria.length > 0) {
        const extractedNames = allOrgByeria.map((e) => e.name); 
        const extractedValues = allOrgByeria.map((e) => e.events);
        setNames(extractedNames);
        setValue(extractedValues);
        // console.log(value ,names)
      }
  }, [allOrgByeria]);


  useEffect(() => {
    const Info = allCountries.find(e => e.name == aria)
    if (Info){
      setInfo(Info)
    }

  }, [allOrgByeria]);

  const handleChangeDisply = (event: SelectChangeEvent<string>) => {
    if (event.target.value as string == "true"){
      setBaseDisply(true)
    }
    else {
      setBaseDisply(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5432/api/countries/');
        const data = await response.json();
        // console.log(data)
        setAllCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  }, [allOrgByeria]);



  const getOrgMarkByEria = () => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:5432/api/countries/country/${aria}`);
        const data = await response.json();
        setAllOrgByAria(data)
        get5OrgMarkByEria()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  };
  


  const get5OrgMarkByEria = () => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:5432/api/countries/limit/${aria}/5`);
        const data = await response.json();
        setOrg5(data)
        // setAllOrgByAria(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  };
  const setAs5 = () =>{
    setAllOrgByAria(org5)

  }

  const updateAria = (event: React.ChangeEvent<HTMLInputElement>) => {
     setAria(event.target.value as string)
  }


  return (
    <div className='main'>
      <div className='disply_org_header'>
      <Box sx={{ minWidth: 120 ,maxWidth :200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">select view</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="select view"
          onChange={handleChangeDisply}
        >
          <MenuItem value={"true"}>display all areas with casualties average casualties</MenuItem>
          <MenuItem value={"false"}>display org mark in spssific aria</MenuItem>
        </Select>
      </FormControl>
    </Box>
{ !baseDisply && <div className='serch'>  <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField onChange={updateAria}  id="standard-basic" label="serch aria" variant="standard" />
      </Box>
        <Stack spacing={2} direction="row">
          <Button onClick={getOrgMarkByEria} variant="outlined">serch</Button>
        </Stack>
      </div>
  
    }
    { baseDisply && <div className='serch'>  <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField onChange={updateAria}  id="standard-basic" label="serch aria" variant="standard" />
      </Box>
        <Stack spacing={2} direction="row">
          <Button onClick={getOrgMarkByEria} variant="outlined">serch</Button>
        </Stack>
      </div>
  
    }
      </div>
{     baseDisply && <h2>all areas with casualties average casualties</h2>}
{     !baseDisply && <h2>all organiztion mark in spasific aria</h2>}

      <MapContainer
        style={{ height: '500px', width: '90%' }}
        center={[34, 32]} // מיקום ברירת המחדל
        zoom={2} // זום ברירת מחדל
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {baseDisply ?
         allCountries.map((country) => (
          <Marker
            key={country._id}
            position={[country.lat, country.long]}
            icon={
              new L.Icon({
                iconUrl: MarkerIcon,
                iconRetinaUrl: MarkerIcon,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow,
                shadowSize: [41, 41],
              })
            }
          >
            <Popup>
              <div>
                <h3>{country.name}</h3>
                <p>Events Count: {country.eventsCount}</p>
                <p>Average: {country.average}</p>
              </div>
            </Popup>
          </Marker>
        ))   
        : <>{ariaInfo &&
          <Marker
          key={"2222"}
            position={[ariaInfo?.lat, ariaInfo.long]}
            icon={
              new L.Icon({
                iconUrl: MarkerIcon,
                iconRetinaUrl: MarkerIcon,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow,
                shadowSize: [41, 41],
              })
            }
          >
            <Popup>
              <div>
                <h3>top 5 organizations</h3>
                {org5 && org5.map((e, index) => <p key={index}>{`${index}.${e.name}`}</p>)}
              </div>
            </Popup>
          </Marker>
        }
        </>
          }
        </MapContainer>
        <div >{  
          allOrgByeria && !baseDisply && <div className='graph' >
            <h1>graph</h1>
            <Stack spacing={2} direction="row">
              <Button onClick={setAs5} variant="contained">5 org</Button>
              <Button onClick={getOrgMarkByEria} variant="contained">all org</Button>
            </Stack>
            <BarChart
              series={[
                { data: value},
              ]}
              height={400}
              xAxis={[{ data: names, scaleType: 'band' }]}
              width={600}
              margin={{ top: 10, bottom: 35, left: 40, right: 10 }}
            />
          </div>
      }
      </div>
    </div>
  );
}

export default CountryMap;
