import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

// 🔹 Props ile dışarıdan başlık, URL ve görsel alıyoruz
const GiftCard = ({ title, url, image }) => {
  // 🔗 Link'e tıklanınca Amazon sayfası açılsın
  const handleOpenLink = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleOpenLink}>
      {/* Hediye görseli */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Hediye başlığı */}
      <Text style={styles.title}>{title}</Text>

      {/* Amazon bağlantısı */}
      <Text style={styles.link} numberOfLines={1}>
        {url}
      </Text>
    </TouchableOpacity>
  );
};

export default GiftCard;

// 💅 Stiller
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
  },
});
