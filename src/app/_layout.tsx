import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';
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
         <FlashMessage
            position="top"
            style={{
              marginTop: 80,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
          />
     </ThemeProvider>

       </Provider>
   
  );
}
