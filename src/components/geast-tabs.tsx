import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useEffect } from 'react';
import { getAuthToken } from '@/helpers/storage';
import { Colors } from '@/constants/theme';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { profileAction } from '@/redux/slices/authSlice';
import Animated from 'react-native-reanimated';

export default function GeastTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  
 const dispatch = useDispatch<AppDispatch>()
 const router = useRouter();
 const {loading} = useSelector((state:RootState)=> state.auth )
  useEffect(() => {
    const initializeApp = async () => {
      
    
      const token = await getAuthToken();
      if (token) {
        await dispatch(profileAction());
       router.replace('/(tabs)');
      }else{
        router.replace('/(auth)/login');
      }
      await SplashScreen.hideAsync();

      
    };

    

    initializeApp();
  }, []);


  // if (loading) {
  //   return (
  //   <View style={styles.loadingContainer}>
  //     <Animated.View style={styles.loader}>
  //       <Text style={styles.loaderText}>F</Text>
  //     </Animated.View>

  //     <Text style={styles.loadingText}>
  //       Loading...
  //     </Text>
  //   </View>
  // );
    
  // }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="details/jobDetails" options={{headerShown: true, title: "Job Details"}} />
    </Stack>
  );


}

 const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  loader: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
});