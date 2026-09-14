import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Tabs } from "expo-router";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function AppTabs() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 60,
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#645d5df6",
            borderTopWidth: 0,
            elevation: 10,
            position: "absolute",
            bottom: 40,
            borderRadius: 30,
            marginHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
              borderRadius: 10,
              padding: 5,
              backgroundColor: "#645d5df6",
              color: "#fff",
            },
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
                <Path
                  d="M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001M12 12.0001V16.0001M14 14.0001H10"
                  stroke={colorScheme === "dark" ? "#fff" : "#000"}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarLabel: "Explore",
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
              borderRadius: 10,
              padding: 5,
              backgroundColor: "#645d5df6",
              color: "#fff",
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
                <Path
                  d="M12 2a10 10 0 1 0 10 10 8 8 0 1 1-10-10Z"
                  fill={colorScheme === "dark" ? "#fff" : "#000"}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            ),
          }}
        />
        <Tabs.Screen
          name="jobs"
          options={{
            title: "Jobs",
            tabBarLabel: "Jobs",
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
              borderRadius: 10,
              padding: 5,
              backgroundColor: "#645d5df6",
              color: "#fff",
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
