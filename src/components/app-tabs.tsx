import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useColorScheme } from '@/hooks/use-color-scheme.web';

export default function AppTabs() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1,backgroundColor: 'transparent' }}>
       <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 0,
          paddingTop: 0,
          backgroundColor: '#645d5df6',
          borderTopWidth: 0,
          elevation: 10,
          position: 'absolute',
          bottom: 40,
          borderRadius: 30,
          marginHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          

        },
      }}
    >
      <Tabs.Screen name="index"   options={{
          title: 'Home',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 ,borderRadius: 10, padding: 5, backgroundColor: '#645d5df6', color: '#fff' },
          tabBarLabel: 'Home',
           headerShown: false,
          tabBarIcon: ({ color, size }) => (
              <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
                <Path
                  d="M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001M12 12.0001V16.0001M14 14.0001H10"
                  stroke={colorScheme === 'dark' ? '#fff' : '#000'}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
          ),
        }}  />
      <Tabs.Screen name="explore" options={{
          
          title: 'Explore',
          tabBarLabel: 'Explore',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 ,borderRadius: 10, padding: 5, backgroundColor: '#645d5df6', color: '#fff' },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
               <Path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z"
                stroke={colorScheme === 'dark' ? '#fff' : '#000'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ),
        }} />
      <Tabs.Screen
  name="jobs"
  options={{
    title: 'Jobs',
    tabBarLabel: 'Jobs',
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: 5,
      borderRadius: 10,
      padding: 5,
      backgroundColor: '#645d5df6',
      color: '#fff',
    },
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M9 6V5C9 3.895 9.895 3 11 3H13C14.105 3 15 3.895 15 5V6M4 8H20C21.105 8 22 8.895 22 10V18C22 19.105 21.105 20 20 20H4C2.895 20 2 19.105 2 18V10C2 8.895 2.895 8 4 8Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M2 12H22M10 12V14H14V12"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
  }}
/>
        
    </Tabs>

   
    </View>
  );
}