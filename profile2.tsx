// app/profile.tsx
import React, { useState, useRef } from 'react';
import * as RN from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LOGO_COLOR = '#124B27';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const anim = useRef(new RN.Animated.Value(0)).current;

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: '장예은',
    email: 'yeeun@example.com',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  });

  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const toggleMenu = () => {
    const toValue = menuVisible ? 0 : 1;
    RN.Animated.timing(anim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { id: 'home', icon: 'home-outline', label: '홈', onPress: () => navigation.navigate('Home') },
    { id: 'calendar', icon: 'calendar-outline', label: '캘린더', onPress: () => navigation.navigate('Calendar') },
    { id: 'add', icon: 'add-outline', label: '추가', onPress: () => navigation.navigate('Add') },
    { id: 'category', icon: 'list-outline', label: '카테고리', onPress: () => navigation.navigate('Category') },
    { id: 'settings', icon: 'settings-outline', label: '설정', onPress: () => navigation.navigate('Setting') },
  ];

  const handleSave = () => {
    setUser({ ...user, name: editedName, email: editedEmail });
    setEditMode(false);
  };

  return (
    <RN.View style={styles.root}>
      {/* 프로필 정보 */}
      <RN.View style={styles.content}>
        <RN.Image source={{ uri: user.photo }} style={styles.avatar} />

        {editMode ? (
          <>
            <RN.TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="이름"
            />
            <RN.TextInput
              style={styles.input}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="이메일"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <RN.View style={styles.editBtnGroup}>
              <RN.TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <RN.Text style={styles.saveBtnText}>저장</RN.Text>
              </RN.TouchableOpacity>
              <RN.TouchableOpacity style={styles.cancelBtn} onPress={() => setEditMode(false)}>
                <RN.Text style={styles.cancelBtnText}>취소</RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
          </>
        ) : (
          <>
            <RN.Text style={styles.name}>{user.name}</RN.Text>
            <RN.Text style={styles.email}>{user.email}</RN.Text>
            <RN.TouchableOpacity onPress={() => setEditMode(true)} style={styles.editBtn}>
              <Ionicons name="pencil" size={18} color="#fff" />
              <RN.Text style={styles.editText}>편집</RN.Text>
            </RN.TouchableOpacity>
          </>
        )}
      </RN.View>

      {/* 오버레이 */}
      <RN.Animated.View
        pointerEvents={menuVisible ? 'auto' : 'none'}
        style={[styles.overlay, { opacity: anim }]}
      >
        <RN.TouchableWithoutFeedback onPress={toggleMenu}>
          <RN.View style={RN.StyleSheet.absoluteFillObject} />
        </RN.TouchableWithoutFeedback>
      </RN.Animated.View>

      {/* FAB 메뉴 */}
      <RN.View style={styles.buttonWrapper} pointerEvents="box-none">
        <RN.Animated.View pointerEvents={menuVisible ? 'auto' : 'none'} style={styles.iconMenu}>
          {menuItems.map((item, index) => {
            const translateY = anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(90 + index * 60)],
            });
            return (
              <RN.Animated.View
                key={item.id}
                style={[styles.menuItem, { transform: [{ translateY }], opacity: anim }]}
              >
                <RN.TouchableOpacity
                  style={styles.touch}
                  onPress={() => {
                    toggleMenu();
                    item.onPress();
                  }}
                >
                  <Ionicons name={item.icon} size={30} color="#fff" />
                  <RN.Text style={styles.menuText}>{item.label}</RN.Text>
                </RN.TouchableOpacity>
              </RN.Animated.View>
            );
          })}
        </RN.Animated.View>

        <RN.TouchableOpacity style={styles.homeButton} onPress={toggleMenu}>
          <RN.Image
            source={require('../assets/NAV_icon.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
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
    color: LOGO_COLOR,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  editBtn: {
    flexDirection: 'row',
    backgroundColor: LOGO_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },

  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  editBtnGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  saveBtn: {
    backgroundColor: LOGO_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#999',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: '#fff',
  },

  overlay: {
    ...RN.StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },

  buttonWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 3,
  },
  iconMenu: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  menuItem: {
    position: 'absolute',
    alignItems: 'center',
    width: 60,
  },
  touch: { alignItems: 'center' },
  menuText: { marginTop: 5, color: '#fff', fontSize: 12 },

  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: LOGO_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});
