import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const FormField = ({ title, value, placeholder, handleChangeText, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPasswordField = title.toLowerCase() === 'password';

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>{title}</Text>
            <View
                style={[
                    styles.inputContainer,
                    isFocused ? styles.focusedBorder : styles.defaultBorder,
                ]}
            >
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)}
                />
                {isPasswordField && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={22}
                            color="#7C7C7C"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginVertical: 20,
    },
    label: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray',
        fontWeight: '500',
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: 'black',
        fontSize: 18,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    defaultBorder: {
        borderWidth: 0,
    },
});

export default FormField;
