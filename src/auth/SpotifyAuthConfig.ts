interface SpotifyAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string[];
  serviceConfiguration: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
  };
}

const spotifyAuthConfig: SpotifyAuthConfig = {
  clientId: '5b7c0ba3f4024757b82d2fd37ee63a08', // Replace with your Spotify Client ID
  clientSecret: '9e7ebc24e76d4b1b8f6f2a145a3e65f1', // Replace with your Spotify Client Secret
  redirectUrl: 'myappspotifyauth://callback', // Replace with your redirect URI
  scopes: ['playlist-read', 'playlist-read-private', 'user-library-read', 'streaming'], // Define the scopes your app requires
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export default spotifyAuthConfig;
