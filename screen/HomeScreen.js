import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [interests, setInterests] = useState('');

  const handleSuggestGift = () => {
    if (!age || !gender || !relationship || !interests) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }

    navigation.navigate('SuggestGift', {
      age,
      gender,
      relationship,
      interests: interests.split(',').map(i => i.trim()) // Dilersen virgülle ayır
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Giftora 🎁</Text>
        <Text style={styles.subtitle}>
          Hediye önerisi için aşağıdaki bilgileri doldur:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Kaç yaşında?"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Cinsiyeti (örn. kadın, erkek)"
          value={gender}
          onChangeText={setGender}
        />

        <TextInput
          style={styles.input}
          placeholder="Seninle olan ilişkisi (örn. arkadaş, sevgili, anne)"
          value={relationship}
          onChangeText={setRelationship}
        />

        <TextInput
          style={styles.input}
          placeholder="Neleri sever? (örn. kahve, oyun, kitap)"
          value={interests}
          onChangeText={setInterests}
        />

        <TouchableOpacity style={styles.button} onPress={handleSuggestGift}>
          <Text style={styles.buttonText}>Hediye Öner!</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4e8cff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
