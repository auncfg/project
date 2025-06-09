import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddUser() {
  const [userId, setUserId] = useState('');
  const [userList, setUserList] = useState<string[]>([]);

  const handleAddUser = () => {
    const trimmed = userId.trim();
    if (!trimmed) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }

    if (userList.includes(trimmed)) {
      Alert.alert('중복', '이미 추가된 사용자입니다.');
      return;
    }

    setUserList(prev => [...prev, trimmed]);
    setUserId('');
  };

  const handleDeleteUser = (id: string) => {
    Alert.alert('삭제 확인', `${id} 사용자를 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setUserList(prev => prev.filter(user => user !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 추가</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        value={userId}
        onChangeText={setUserId}
      />

      <Button title="추가" onPress={handleAddUser} />

      <Text style={styles.subtitle}>사용자 목록</Text>
      <FlatList
        data={userList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteUser(item)}>
              <Text style={styles.deleteText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>아직 추가된 사용자가 없습니다.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  userText: { fontSize: 16 },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
