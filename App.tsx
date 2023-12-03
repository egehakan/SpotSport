// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import TracksScreen from './src/screens/TracksScreen';
import type { RootStackParamList } from './src/navigationTypes';
import { PlaybackProvider } from './src/controls/PlaybackContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <PlaybackProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Playlists" component={PlaylistScreen} />
          <Stack.Screen name="Tracks" component={TracksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlaybackProvider>
  );
};

export default App;
