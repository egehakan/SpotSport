// LoginScreen.tsx
import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { authorize, AuthConfiguration, AuthorizeResult } from 'react-native-app-auth';
import spotifyAuthConfig from '../auth/SpotifyAuthConfig';

type Props = {
  navigation: {
    reset: (options: { index: number; routes: Array<{ name: string; params?: Record<string, unknown> }> }) => void;
  };
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleAuth = async () => {
    try {
      const result: AuthorizeResult = await authorize(spotifyAuthConfig as AuthConfiguration);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Playlists', params: { authState: result } }],
      });
    } catch (error) {
      console.error('Failed to authenticate', error);
      Alert.alert('Authentication Error', 'Failed to login with Spotify.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Spotify" onPress={handleAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});

export default LoginScreen;
