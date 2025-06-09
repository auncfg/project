import { Picker as SelectPicker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, StyleSheet, Switch, Text, View } from 'react-native';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ko');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const { t, i18n } = useTranslation();

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  const handleLogout = () => {
    Alert.alert(t('logout'), t('logoutConfirm'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('confirm'), onPress: () => console.log('로그아웃됨') },
    ]);
  };

  const handleReset = () => {
    Alert.alert(t('reset'), t('resetConfirm'), [
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

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>{t('settings')}</Text>

      {/* 다크모드 */}
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>{t('darkMode')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* 알림 설정 */}
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>{t('notifications')}</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* 언어 선택 */}
      <View style={styles.column}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>{t('language')}</Text>
        <SelectPicker
          selectedValue={language}
          onValueChange={(itemValue) => {
            setLanguage(itemValue);
            i18n.changeLanguage(itemValue);
          }}
          style={[styles.picker, isDarkMode && styles.darkPicker]}
        >
          <SelectPicker.Item label="한국어" value="ko" />
          <SelectPicker.Item label="English" value="en" />
        </SelectPicker>
      </View>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <Button title={t('logout')} color="#c0392b" onPress={handleLogout} />
        <View style={{ height: 12 }} />
        <Button title={t('reset')} color="#7f8c8d" onPress={handleReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  darkContainer: { backgroundColor: '#1e1e1e' },
  title: { fontSize: 24, marginBottom: 20 },
  darkText: { color: '#ffffff' },
  label: { fontSize: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  column: {
    marginTop: 12,
    marginBottom: 24,
  },
  picker: {
    height: 50,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  darkPicker: {
    backgroundColor: '#333333',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 30,
  },
});
