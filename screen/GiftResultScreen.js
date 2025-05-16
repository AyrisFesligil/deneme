import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { insertGiftSuggestion } from '../database/database';
import { generateAmazonLinks } from '../utils/generateAmazonLinks';

const GiftResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { keywords, userId } = route.params;

  const amazonLinks = generateAmazonLinks(keywords);

  const handleOpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Hata', 'Link açılamıyor: ' + url);
    }
  };

  const handleSaveGift = async (item) => {
    try {
      await insertGiftSuggestion(userId, item.title, item.url);
      Alert.alert('Kaydedildi', 'Hediye önerisi başarıyla kaydedildi.');
    } catch (error) {
      Alert.alert('Hata', 'Kaydederken bir hata oluştu.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Gifts</Text>

      <FlatList
        data={amazonLinks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
              <Text style={styles.link}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSaveGift(item)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#999', marginTop: 20 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiftResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
