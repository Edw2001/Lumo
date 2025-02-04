import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSignIn = async () => {
        try {
            const user = await Auth.signIn(username, password);
            console.log('logged in successfully', user);
            router.replace('/(tabs)/chat'); // route to chat page
        } catch (error: any) {
            console.error('failed to log in', error)
            setErrorMsg(error.message || 'failed to log in, please try it again')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="sign in" onPress={handleSignIn} />
            <Button title="New User? Sign Up" onPress={() => router.push('/screens/signup')} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
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
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});
