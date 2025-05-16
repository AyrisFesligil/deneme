import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

// Veritabanı bağlantısını oluştur
const db = SQLite.openDatabase('giftora.db');

export default function RegisterScreen() {
  const navigation = useNavigation();

  // Kullanıcıdan alınacak veriler için state'ler
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Kayıt işlemi
  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    // Veritabanında user tablosu yoksa oluştur
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT
        );`
      );
    });

    // Kullanıcıyı veritabanına kaydet
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (_, result) => {
          Alert.alert('Başarılı', 'Kayıt başarılı!');
          navigation.navigate('Login');
        },
        (_, error) => {
          if (error.message.includes('UNIQUE constraint failed')) {
            Alert.alert('Hata', 'Bu e-posta zaten kayıtlı');
          } else {
            Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu');
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giftora'ya Kayıt Ol</Text>

      {/* İsim girişi */}
      <TextInput
        style={styles.input}
        placeholder="Adınız"
        value={name}
        onChangeText={setName}
      />

      {/* E-posta girişi */}
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Şifre girişi */}
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Kayıt ol butonu */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      {/* Zaten hesabın var mı? */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Zaten bir hesabın var mı? Giriş yap</Text>
      </TouchableOpacity>
    </View>
  );
}

// Görsel stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4e8cff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#4e8cff',
    textAlign: 'center',
    fontSize: 14,
  },
});
