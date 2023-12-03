// TracksScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Linking } from 'react-native';
import SpotifyService from '../SpotifyService';
import { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigationTypes';
import PlaybackControls from '../controls/PlaybackControls';

type Props = {
  route: RouteProp<RootStackParamList, 'Tracks'>;
};

const TracksScreen: React.FC<Props> = ({ route }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const { playlistId, accessToken } = route.params;
  const spotifyApi = new SpotifyService({ accessToken });

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId);
        setTracks(playlistTracks.items);
      } catch (error) {
        console.error(`Error fetching tracks for playlist ${playlistId}`, error);
      }
    };

    fetchTracks();
  }, [playlistId, accessToken]);

  const startPlayback = async (trackId: string) => {
    const trackUri = `spotify:track:${trackId}`;

    try {
      await spotifyApi.startPlayback(trackUri);
      // Playback started on an active device, so no need to open the app.
    } catch (error) {
      console.error('Error starting playback', error);
      // Handle the error, possibly by notifying the user.
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.track.id}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <Text style={styles.trackText}>{item.track.name}</Text>
            <Button
              title="Play"
              onPress={() => startPlayback(item.track.id)}
            />
            <PlaybackControls />
          </View>
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
  trackItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  trackText: {
    fontSize: 18
  }
});

export default TracksScreen;
