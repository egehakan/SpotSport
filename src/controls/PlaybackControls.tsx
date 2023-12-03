import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { usePlayback } from './PlaybackContext'; // Import the PlaybackContext

const PlaybackControls: React.FC = () => {
  const { currentTrackId, spotifyApi } = usePlayback();

  const playTrack = async () => {
    if (currentTrackId) {
      await spotifyApi.startPlayback(currentTrackId);
    }
  };

  const stopTrack = async () => {
    await spotifyApi.stopPlayback();
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
      <Button title="Play" onPress={playTrack} />
      <Button title="Stop" onPress={stopTrack} />
    </View>
  );
};

export default PlaybackControls;
