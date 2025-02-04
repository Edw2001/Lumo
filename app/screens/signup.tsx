import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const router = useRouter();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [preferredUsername, setPreferredUsername] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const handleSignUp = async () => {
        setError('');
        setInfo('');

        if (password !== confirmPassword) {
            setError('Passwords are different');
            return;
        }

        try {
            // Use Amplify Auth.signUp to register
            const { user } = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    birthdate,
                    gender,
                    preferred_username: preferredUsername,
                },
            });
            console.log('Signed up Successfully', user);
            setInfo('Sign-up successful! Please check your email for a verification code.');
            router.replace('/screens/confirm-signup');
        } catch (err: any) {
            if (err.code === 'UsernameExistsException') {
                try {
                    await Auth.resendSignUp(email);
                    setInfo('A confirmation code has been resent to your email. Please check your email.');
                    router.replace('/screens/confirm-signup');
                } catch (resendError: any) {
                    console.error('Resend sign up error:', resendError);
                    setError(resendError.message || 'Error resending confirmation code.');
                }
            } else {
                setError(err.message || 'An error occurred during the sign-up process.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New User Sign-Up</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {info ? <Text style={styles.info}>{info}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Birthdate (YYYY-MM-DD)"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={birthdate}
                onChangeText={setBirthdate}
            />

            <TextInput
                style={styles.input}
                placeholder="Gender (MALE or FEMALE)"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={gender}
                onChangeText={setGender}
            />

            <TextInput
                style={styles.input}
                placeholder="Preferred Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={preferredUsername}
                onChangeText={setPreferredUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Button title="Sign Up" onPress={handleSignUp} />
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
