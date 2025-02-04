import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';

export default function ConfirmSignUpScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const handleConfirmSignUp = async () => {
        setError('');
        setInfo('');

        try {
            Auth.confirmSignUp(username, confirmationCode);
            setInfo('Confirmation successful! You can now log in.');
            router.replace('/screens/login');
        } catch (err: any) {
            console.error('Confirmation error:', err);
            setError(err.message || 'Error during confirmation.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Sign Up</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {info ? <Text style={styles.info}>{info}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email or Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmation Code"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
            />

            <Button title="Confirm Sign Up" onPress={handleConfirmSignUp} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    info: {
        color: 'green',
        marginBottom: 16,
        textAlign: 'center',
    },
});


