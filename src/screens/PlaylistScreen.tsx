// PlaylistScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import SpotifyService from '../SpotifyService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '..//navigationTypes'; // Adjust the path

type Props = {
    route: RouteProp<RootStackParamList, 'Playlists'>;
    navigation: {
        navigate: (screen: string, params?: Record<string, unknown>) => void;
        reset: (options: { index: number; routes: Array<{ name: string; params?: Record<string, unknown> }> }) => void;
    };
};

const PlaylistScreen: React.FC<Props> = ({ route, navigation }) => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const accessToken = route.params.authState.accessToken;
    const spotifyApi = new SpotifyService({ accessToken });

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const userPlaylists = await spotifyApi.getUserPlaylists();
                setPlaylists(userPlaylists.items);
            } catch (error) {
                console.error('Error fetching playlists', error);
            }
        };

        fetchPlaylists();
    }, [accessToken]);

    const handleLogout = async () => {
        try {
            // Clear the stored auth state
            await AsyncStorage.removeItem('authToken'); // Adjust this line based on how you handle tokens

            // Reset the navigation stack to the Login Screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={handleLogout} />
            <FlatList
                data={playlists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.playlistItem}
                        onPress={() => navigation.navigate('Tracks', { playlistId: item.id, accessToken })}>
                        <Text style={styles.playlistText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    playlistItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    playlistText: {
        fontSize: 18
    }
});

export default PlaylistScreen;
