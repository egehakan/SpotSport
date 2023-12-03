export type RootStackParamList = {
    Login: undefined;
    Playlists: { authState: { accessToken: string } };
    Tracks: { playlistId: string, accessToken: string };
  };
  