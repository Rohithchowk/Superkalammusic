'use client'
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context value
interface SongContextType {
  currentSong: string;
  setCurrentSong: (song: string) => void;
}

// Create the context with a default value
const SongContext = createContext<SongContextType | undefined>(undefined);

// Create a provider component
export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<string>('');

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSong must be used within a SongProvider');
  }
  return context;
};
