import { Stack, router } from "expo-router";
import "../global.css"; // Import global styles
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{
          title: 'Details',
          headerBackTitleVisible: false,
          headerLeft: ({ canGoBack }) => (
            canGoBack ? (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginLeft: 0,
                  width:50,
                  
                 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ) : null
          ),
          headerStyle: {
            backgroundColor: '#0B1D51',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}