import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const Search = () => {
  const router = useRouter();
  const { query } = router.query; // Access the dynamic route parameter
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query); // Trigger the search function when the query changes
    }
  }, [query]);

  const performSearch = async (searchTerm) => {
    setLoading(true);

    // Simulate fetching data (replace with your API call or data filtering logic)
    const mockData = [
      { id: 1, title: 'Apple' },
      { id: 2, title: 'Banana' },
      { id: 3, title: 'Cherry' },
      { id: 4, title: 'Date' },
      { id: 5, title: 'Elderberry' },
    ];

    const results = mockData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results for "{query}"</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  resultItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
  },
});

export default Search;
