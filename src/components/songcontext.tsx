// src/context/SongContext.js
'use client'
import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext({
  currentSong: "kalki.mp3",
  setCurrentSong: () => {}
});


export  const useSong = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState("kalki.mp3");

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

