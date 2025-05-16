import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GiftFormScreen() {
  const navigation = useNavigation();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [interests, setInterests] = useState('');

  const handleNext = () => {
    if (!age || !gender || !relationship || !interests) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    navigation.navigate('SuggestGift', {
      age,
      gender,
      relationship,
      interests
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🎁 Hediye Formu</Text>
        <Text style={styles.description}>Hediye önerisi için lütfen aşağıdaki bilgileri doldur:</Text>

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
          placeholder="Seninle ilişkisi (örn. arkadaş, kardeş, sevgili)"
          value={relationship}
          onChangeText={setRelationship}
        />

        <TextInput
          style={styles.input}
          placeholder="Nelerden hoşlanır? (örn. çay, kamp, oyun)"
          value={interests}
          onChangeText={setInterests}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Hediyeyi Göster!</Text>
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
