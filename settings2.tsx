import { Ionicons } from '@expo/vector-icons';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as RN from 'react-native';

const LOGO_COLOR = '#124B27';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const anim = useRef(new RN.Animated.Value(0)).current;
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ko');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const { t, i18n } = useTranslation();

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleMenu = () => {
    const toValue = menuVisible ? 0 : 1;
    RN.Animated.timing(anim, { toValue, duration: 300, useNativeDriver: true }).start();
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    RN.Alert.alert(t('logout'), t('logoutConfirm'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('confirm'), onPress: () => console.log('로그아웃됨') },
    ]);
  };

  const handleReset = () => {
    RN.Alert.alert(t('reset'), t('resetConfirm'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('confirm'),
        onPress: () => {
          setIsDarkMode(false);
          setLanguage('ko');
          setNotificationsEnabled(true);
          i18n.changeLanguage('ko');
        },
      },
    ]);
  };

  const menuItems = [
    { id: 'home', icon: 'home-outline', label: t('home'), onPress: () => navigation.navigate('Home') },
    { id: 'profile', icon: 'person-outline', label: t('profile'), onPress: () => navigation.navigate('Profile') },
    { id: 'calendar', icon: 'calendar-outline', label: t('calendar'), onPress: () => navigation.navigate('Calendar') },
    { id: 'add', icon: 'add-outline', label: t('add'), onPress: () => navigation.navigate('Add') },
    { id: 'category', icon: 'list-outline', label: t('category'), onPress: () => navigation.navigate('Category') },
  ];

  return (
    <RN.View style={[styles.root, isDarkMode && styles.darkRoot]}>
      <RN.View style={styles.content}>
        <RN.Text style={[styles.title, isDarkMode && styles.darkText]}>{t('settings')}</RN.Text>
        <RN.Text style={[styles.sub_title, isDarkMode && styles.darkText]}>{t('profileSettings')}</RN.Text>
      </RN.View>

      {/* 설정 내용 */}
      <RN.ScrollView contentContainerStyle={styles.settingsContainer}>
        <RN.View style={styles.row}>
          <RN.Text style={[styles.label, isDarkMode && styles.darkText]}>{t('darkMode')}</RN.Text>
          <RN.Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </RN.View>

        <RN.View style={styles.row}>
          <RN.Text style={[styles.label, isDarkMode && styles.darkText]}>{t('notifications')}</RN.Text>
          <RN.Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </RN.View>

        <RN.View style={styles.column}>
          <RN.Text style={[styles.label, isDarkMode && styles.darkText]}>{t('language')}</RN.Text>
          <SelectPicker
            selectedValue={language}
            onValueChange={(val) => {
              setLanguage(val);
              i18n.changeLanguage(val);
            }}
            style={[styles.picker, isDarkMode && styles.darkPicker]}
          >
            <SelectPicker.Item label="한국어" value="ko" />
            <SelectPicker.Item label="English" value="en" />
          </SelectPicker>
        </RN.View>

        <RN.View style={styles.buttonContainer}>
          <RN.Button title={t('logout')} color="#c0392b" onPress={handleLogout} />
          <RN.View style={{ height: 12 }} />
          <RN.Button title={t('reset')} color="#7f8c8d" onPress={handleReset} />
        </RN.View>
      </RN.ScrollView>

      {/* 오버레이 */}
      <RN.Animated.View pointerEvents={menuVisible ? 'auto' : 'none'} style={[styles.overlay, { opacity: anim }]}>
        <RN.TouchableWithoutFeedback onPress={toggleMenu}>
          <RN.View style={RN.StyleSheet.absoluteFillObject} />
        </RN.TouchableWithoutFeedback>
      </RN.Animated.View>

      {/* 메뉴 버튼 */}
      <RN.View style={styles.buttonWrapper} pointerEvents="box-none">
        <RN.Animated.View pointerEvents={menuVisible ? 'auto' : 'none'} style={styles.iconMenu}>
          {menuItems.map((item, index) => {
            const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -(90 + index * 60)] });
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
          <RN.Image source={require('../assets/NAV_icon.png')} style={styles.navIcon} resizeMode="contain" />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  darkRoot: { backgroundColor: '#1e1e1e' },
  content: { height: 160, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: LOGO_COLOR, fontWeight: 'bold' },
  sub_title: { fontSize: 18, color: LOGO_COLOR },

  darkText: { color: '#fff' },

  settingsContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  label: { fontSize: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  column: { marginBottom: 24 },

  picker: { height: 50, backgroundColor: '#f0f0f0', color: '#000' },
  darkPicker: { backgroundColor: '#333', color: '#fff' },

  buttonContainer: { marginTop: 20 },

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
