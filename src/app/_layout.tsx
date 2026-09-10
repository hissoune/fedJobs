import { DarkTheme, DefaultTheme, ThemeProvider, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import GeastTabs from '@/components/geast-tabs';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';




export default function TabLayout() {
  const colorScheme = useColorScheme();
 SplashScreen.preventAutoHideAsync();
  return (
       <Provider store={store}>
     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <GeastTabs />
     </ThemeProvider>

       </Provider>
   
  );
}
