import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider , type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Types from './Types';
import Year from './Years';
import Years from './Years';


const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DemoPageContent({ pathname }: { pathname: string }) {
  const nav = pathname
  return (
    <>
    {
      nav === "/home" && <Main/>
    }    
    {
      nav === "/types" && <Types/>
    }
        {
      nav === "/years" && <Years/>
    }
    </>
  );
}

interface DemoProps {
  window?: () => Window;
}



export default function DashboardLayoutNavigationLinks(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/home');

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        {
          segment: 'home',
          title: 'main',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'types',
          title: 'attakt types',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'country',
          title: 'countries',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'years',
          title: 'years',
          icon: <DescriptionIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      // navigation={NAVIGATION}
      
      >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}