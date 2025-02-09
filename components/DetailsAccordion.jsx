import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailsAccordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <View style={styles.accordionContainer}>
            {/* Accordion Header */}
            <TouchableOpacity style={styles.accordionHeader} onPress={toggleAccordion}>
                <Text style={styles.title}>{title}</Text>
                <Ionicons name={isOpen ? 'chevron-down' : 'chevron-forward'}
                    size={24}
                    color="#000"
                />
            </TouchableOpacity>

            {/* Accordion Content */}
            {isOpen && (
                <View style={styles.accordionContent}>
                    <Text style={styles.accordionText}>{content}</Text>
                </View>
            )}
        </View>
    );
};

export default DetailsAccordion;

const styles = StyleSheet.create({
    accordionContainer: {
        borderTopWidth: 1, 
        borderColor: '#E2E2E2',
        overflow: 'hidden',
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        textAlign: 'left',
    },
    accordionContent: {
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    accordionText: {
        fontSize: 18,
        color: '#7C7C7C',
        fontWeight: 400,
    },
});
