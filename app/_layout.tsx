import { Stack, router } from "expo-router";
import "../global.css"; // Import global styles
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NativeStackHeaderLeftProps } from '@react-navigation/native-stack'; // ✅ Import correct type

// Correct type here
const CustomHeaderBack = ({ canGoBack }: NativeStackHeaderLeftProps) =>
  canGoBack ? (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ marginLeft: 0, width: 50 }}
    >
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  ) : null;

const screenOptions = (title: string) => ({
  title,
  headerBackTitleVisible: false,
  headerLeft: CustomHeaderBack,
  headerTransparent: true, // ✅ Makes the header truly transparent
  headerStyle: {
    backgroundColor: 'transparent', // ✅ Transparent background
    elevation: 0, // ✅ Remove shadow on Android
    shadowOpacity: 0, // ✅ Remove shadow on iOS
    borderBottomWidth: 0, // ✅ Remove border if present
  },
  headerTintColor: '#fff', // ✅ White tint for icons/text
});


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" options={screenOptions("Details")} />
      <Stack.Screen name="episodes/[id]" options={screenOptions("Episodes")} />
    </Stack>
  );
}
