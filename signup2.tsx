// app/signup/index.tsx
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../lib/firebase';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = async () => {
    if (password !== confirm) {
      Alert.alert('비밀번호가 일치하지 않습니다');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('회원가입 성공!');
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('회원가입 실패', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="비밀번호 확인" value={confirm} onChangeText={setConfirm} style={styles.input} secureTextEntry />
      <Button title="회원가입" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 6,
  },
});
