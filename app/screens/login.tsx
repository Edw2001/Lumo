import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Toast from "react-native-toast-message";
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setInfoMsg] = useState('');

    const handleSignIn = async () => {
        try {
            const user = await Auth.signIn(email, password);
            console.log('Logged in successfully', user);
            setErrorMsg('')
            setInfoMsg('Logged in successfully')
            setTimeout(() => {
                router.replace('/(tabs)/chat'); // route to chat page
            }, 1000);
        } catch (error: any) {
            console.error('failed to log in', error)
            setErrorMsg(error.message || 'Failed to log in, please try again');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <Text style={styles.title}>Sign in</Text>
                    {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
                    {infoMsg ? <Text style={styles.info}>{infoMsg}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button title="sign in" onPress={handleSignIn} />
                    <Button title="New User? Sign Up" onPress={() => router.push('/screens/signup')} />

                </View>
            </ScrollView>
        </KeyboardAvoidingView >
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
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
    info: {
        color: 'green',
        marginBottom: 12,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});
