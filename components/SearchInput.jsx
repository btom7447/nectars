import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search/${searchQuery.trim()}`); // Navigate to the search results page
        }
    };

    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={28} color="#000" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Store"
                placeholderTextColor="#7C7C7C"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch} // Trigger search on return/enter
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F2F3F2',
        borderRadius: 20,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingVertical: 10,
        marginLeft: 5,
        fontSize: 18,
        textAlign: 'left',
        color: 'black',
    },
});

export default SearchInput;
