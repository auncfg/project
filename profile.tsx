// app/profile.tsx
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const user = {
    name: '장예은',
    email: 'yeeun@example.com',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photo }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});
