import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {
  getGiftSuggestionsByUser,
  deleteGiftSuggestion,
  updateGiftSuggestion,
} from '../database/database';
import { useRoute } from '@react-navigation/native';

const GiftHistoryScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [gifts, setGifts] = useState([]);
  const [editingGiftId, setEditingGiftId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  useEffect(() => {
    fetchGifts();
  }, [userId]);

  const fetchGifts = async () => {
    try {
      const results = await getGiftSuggestionsByUser(userId);
      setGifts(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this gift?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteGiftSuggestion(id);
              fetchGifts();
              Alert.alert('Deleted', 'Gift has been deleted.');
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (gift) => {
    setEditingGiftId(gift.id);
    setEditedTitle(gift.title);
    setEditedUrl(gift.url);
  };

  const handleSaveEdit = async () => {
    try {
      await updateGiftSuggestion(editingGiftId, editedTitle, editedUrl);
      setEditingGiftId(null);
      setEditedTitle('');
      setEditedUrl('');
      fetchGifts();
      Alert.alert('Updated', 'Gift has been updated.');
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingGiftId(null);
    setEditedTitle('');
    setEditedUrl('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gift History</Text>

      <FlatList
        data={gifts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingGiftId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  placeholder="Title"
                />
                <TextInput
                  style={styles.input}
                  value={editedUrl}
                  onChangeText={setEditedUrl}
                  placeholder="Amazon URL"
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.text}>🎁 {item.title}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.link}>{item.url}</Text>
                </TouchableOpacity>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default GiftHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#4CD964',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
