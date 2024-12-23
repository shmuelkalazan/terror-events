import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider  } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Main from './Main';



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
          icon: <DescriptionIcon />,
        },
        {
          segment: 'org',
          title: 'organization',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'types',
          title: 'attakt types',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'countries',
          title: 'countries',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'years',
          title: 'years',
          icon: <DescriptionIcon />,
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