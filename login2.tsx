// app/login/index.tsx
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../lib/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/profile');
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('로그인 성공!');
      router.replace('/profile');
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="로그인" onPress={handleLogin} />
      <View style={{ marginTop: 20 }}>
        <Button title="회원가입 하러가기" onPress={() => router.push('/signup')} />
      </View>
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
