import { Button, Text, TextInput, View } from 'react-native';

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, width: '100%', marginBottom: 10, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: '100%', marginBottom: 10, padding: 8 }} />
      <Button title="Login" onPress={() => {}} />
    </View>
  );
}
