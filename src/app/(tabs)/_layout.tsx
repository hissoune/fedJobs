import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';


import { useEffect } from 'react';
import { getAuthToken } from '@/helpers/storage';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {

  return (
    <>
      <AppTabs />
         
    </>
      
   
  );
}
