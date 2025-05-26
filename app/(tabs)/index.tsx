import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>
      <Link href="/login">Go to Login</Link>
      <Link href="/signup" style={{ marginTop: 10 }}>Go to Signup</Link>
    </View>
  );
}
