// songContext.js or similar file
'use client'
import { createContext, useContext, useState } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState("kalki.mp3");

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);
