import React, { createContext, useState, useContext, ReactNode } from 'react';
import SpotifyService from '../SpotifyService'; // Path to your SpotifyService

interface PlaybackContextProps {
    currentTrackId: string | null;
    setCurrentTrackId: (id: string | null) => void;
    spotifyApi: SpotifyService;
}

const PlaybackContext = createContext<PlaybackContextProps>({
    currentTrackId: null,
    setCurrentTrackId: (id: string | null) => {},
    spotifyApi: new SpotifyService({ accessToken: '' }), // Dummy initial value
});

export const usePlayback = () => useContext(PlaybackContext);

interface PlaybackProviderProps {
    children: ReactNode;
}

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
        const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
        const spotifyApi = new SpotifyService({ accessToken: 'YOUR_ACCESS_TOKEN' }); // Replace with actual token retrieval

        return (
                <PlaybackContext.Provider value={{ currentTrackId, setCurrentTrackId, spotifyApi }}>
                        {children}
                </PlaybackContext.Provider>
        );
};
