
import { Box } from '@mui/material'
import PieColor from './PieColor'
import { Routes, Route, Navigate } from 'react-router-dom';
import Map from './Map'
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
