import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider  } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import TodayIcon from '@mui/icons-material/Today';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



import Main from './Main';



const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
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

interface DemoProps {
  window?: () => Window;
}

function DemoPageContent() {
  return (
    <Main/>
  );
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
          icon: <HomeIcon />,
        },
        {
          segment: 'org',
          title: 'organization',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'types',
          title: 'attakt types',
          icon: <FormatListBulletedIcon />,
        },
        {
          segment: 'countries',
          title: 'countries',
          icon: <PlaceIcon />,
        },
        {
          segment: 'years',
          title: 'years',
          icon: <TodayIcon />,
        },
      ]}
      theme={demoTheme}
      window={demoWindow}
      >
      <DashboardLayout>
        <DemoPageContent/>
      </DashboardLayout>
    </AppProvider>
  );
}