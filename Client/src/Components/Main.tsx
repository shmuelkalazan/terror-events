
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom';
import Org from './Org';
import Types from './Types';
import Years from './Years';
import Country from './Country';

export default function Main() {
  return (
    <div>
    <Box
    >
      <Routes>
        <Route path="/home"
         element={
          <Box 
                sx={{
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 4,
                }}
          >
            <h1>about us</h1>
            <p>blah blah</p>

          </Box> }
          />
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/org" element={<Org />} />
        <Route path="/countries" element={<Country />} />
        <Route path="/types" element={<Types />} />
        <Route path="/years" element={<Years />} />
        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </Box>

    </div>
  )
}
