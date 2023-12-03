// SpotifyService.ts
import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

interface SpotifyApiService {
  accessToken: string;
}

class SpotifyService {
  accessToken: string;

  constructor({ accessToken }: SpotifyApiService) {
    this.accessToken = accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserPlaylists() {
    try {
      const response = await axios.get(`${BASE_URL}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching playlists', error);
      throw error;
    }
  }

  async getPlaylistTracks(playlistId: string) {
    try {
      const response = await axios.get(`${BASE_URL}/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching tracks for playlist ${playlistId}`, error);
      throw error;
    }
  }

  async startPlayback(trackUri: string) {
    try {
      await axios.put(
        `${BASE_URL}/me/player/play`,
        { uris: [trackUri] },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error starting playback', error);
      throw error;
    }
  }

  async stopPlayback() {
    try {
      await axios.put(
        `${BASE_URL}/me/player/pause`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error stopping playback', error);
      throw error;
    }
  }

}

export default SpotifyService;
