import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';
import BirthdateInput from '@/components/Form/BirthdateInput';
import GenderInput from '@/components/Form/GenderInput';
import {Picker} from '@react-native-picker/picker';

export default function SignupScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [preferredUsername, setPreferredUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setInfoMsg] = useState('');
    const [birthdate, setBirthdate] = useState<Date | null>(null);

    const handleSignUp = async () => {
        setErrorMsg('');
        setInfoMsg('');

        if (password !== confirmPassword) {
            setErrorMsg('Passwords are different');
            return;
        }
        const formattedBirthdate = birthdate ? birthdate.toISOString().split('T')[0] : '';

        try {
            const { user } = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    birthdate: formattedBirthdate,
                    gender,
                    preferred_username: preferredUsername,
                },
            });
            console.log('Signed up Successfully', user);
            setInfoMsg('Sign-up successful! Please check your email for a verification code.');
            router.replace('/screens/confirm-signup');
        } catch (err: any) {
            if (err.code === 'UsernameExistsException') {
                try {
                    await Auth.resendSignUp(email);
                    setInfoMsg('A confirmation code has been resent to your email. Please check your email.');
                    router.replace('/screens/confirm-signup');
                } catch (resendError: any) {
                    console.error('Resend sign up error:', resendError);
                    setErrorMsg(resendError.message || 'Error resending confirmation code.');
                }
            } else {
                setErrorMsg(err.message || 'An error occurred during the sign-up process.');
            }
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <Text style={styles.title}>New User Sign-Up</Text>
                    {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
                    {infoMsg ? <Text style={styles.info}>{infoMsg}</Text> : null}

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
                    <GenderInput gender={gender} setGender={setGender} />
                    <BirthdateInput birthdate={birthdate} setBirthdate={setBirthdate} />

                    <Button title="Sign Up" onPress={handleSignUp} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
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
