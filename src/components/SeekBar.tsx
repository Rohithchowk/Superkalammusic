

'use client'
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward, FaThumbsUp, FaRedo } from 'react-icons/fa';
import { useSong } from './songcontext';
import { CiHeart } from "react-icons/ci";
import { TiArrowLoop } from "react-icons/ti";
import { CiMicrophoneOn } from "react-icons/ci";
import { PiShuffleBold } from "react-icons/pi";
import { ShuffleIcon } from 'lucide-react';
import { MdLibraryAdd } from "react-icons/md";
import { CiVolumeHigh } from "react-icons/ci";
import { CiBluetooth } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

export default function SeekBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const [currentDate, setCurrentDate] = useState('');

useEffect(() => {
  setCurrentDate(new Date().toLocaleDateString());
}, []);

  const { currentSong } = useSong();

  useEffect(() => {
    if (currentSong) {
      console.log(`Playing: ${currentSong}`);
    }
  }, [currentSong]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Load the new song
      audioRef.current.play(); // Play the new song automatically
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setIsSeeking(true);
      audioRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Skip forward by 10 seconds
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Skip backward by 10 seconds
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    }
  };


  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {

    
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    
    const updateDuration = () => {
      console.log(duration)
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, []);

  const progressPercent = (currentTime / duration) * 100;
  console.log(currentTime,duration,progressPercent)

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <div className="hidden:sm-block flex items-center mb-2 md:mb-0">
      <h1 className=" text-green-500 bg-transparent border-2 border-green-500 rounded-full p-1 mr-2 ">
  Date: {currentDate}
</h1>
    
     <button onClick={toggleLike} className="p-2 md:p-1 bg-transparent hover:bg-white-600 rounded-full mr-2">
          <CiHeart size={18} className={`text-white ${isLiked ? 'bg-red-500 bg-red rounded-full' : ''}`} />
        </button>
        <button  className="p-2 md:p-1 bg-transparent hover:bg-green-200 rounded-full mr-2">
          <MdLibraryAdd className="text-white hover:bg-green-500" />
        </button>
       
      </div>

      <div className="w-full md:w-2/3 relative">
      <div className="flex items-center mb-2 md:mb-0 gap-2  justify-center items-center">
      <button onClick={handleBackward} className="p-2 md:p-1 bg-transparent hover:bg-[#E90074] rounded-full mr-2">
          <ShuffleIcon size={16} className="text-white" />
        </button>
        <button onClick={handleBackward} className="p-2 md:p-1 bg-transparent hover:bg-[#E90074] rounded-full mr-2">
          <FaBackward className="text-white" />
        </button>
        <button onClick={handlePlayPause} className="p-2 md:p-1 bg-white hover:bg-grey-500 rounded-full mr-2">
          {audioRef.current?.paused ? <FaPlay className="text-black" /> : <FaPause className="text-black" />}
        </button>
        <button onClick={handleForward} className="p-2 md:p-1 bg-transparent hover:bg-[#E90074] rounded-full mr-2">
          <FaForward className="text-white" />
        </button>
        <button  className="p-2 md:p-1 bg-transparent hover:bg-[#E90074] rounded-full mr-2">
          <TiArrowLoop size={20} className="text-white" />
        </button>
        <h1 className=" text-green-500 bg-transparent border-2 border-green-500 rounded-full p-1 mr-2 ">
  {currentSong}
</h1>
      </div>
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSeek}
          onMouseUp={handleSeekEnd}
          onTouchEnd={handleSeekEnd}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          style={{ 
            background: `linear-gradient(to right, #3b82f6 ${progressPercent}%, #1f2937 ${progressPercent}%)` ,
            height:'5px'
          }}
        />
      </div>

      <div className=" flex items-center mt-2 md:mt-0">
        <CiVolumeHigh size={20} className=" mr-2 mt-1"/>
      <input
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          className="w-20 h-2 bg-gray-600 rounded-lg appearance-none mr-2  cursor-pointer mt-1"
          style={{ 
            background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #1f2937 ${volume * 100}%)` 
          }}
        />
       
        <button onClick={toggleLoop} className="p-2 md:p-1 bg-transparent hover:bg-green-500  rounded-full">
          <CiMicrophoneOn size={18} className={`text-white  ${isLooping ? 'text-green-500' : ''} `} />
        </button>
        <button onClick={toggleLike} className="p-2 md:p-1 bg-transprent hover:bg-green-500 text-black rounded-full mr-1">
          <CiBluetooth size={18} className={`text-white ${isLiked ? 'text-red-500 bg-red' : ''}`} />
        </button>
        <button onClick={toggleLike} className="p-2 md:p-1 bg-transprent hover:bg-green-500 rounded-full ">
          <CiShare2 size={18} className={`text-white ${isLiked ? 'text-red-500 bg-red' : ''}`} />
        </button>
      </div>

      <audio ref={audioRef} src={currentSong} />
    </div>
  );
}