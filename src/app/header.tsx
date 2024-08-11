'use client';

import React, { useState ,useEffect,Fragment,useRef} from 'react';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { MdNotificationAdd } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { SideNavItem } from '@/components/side-nav';
import { useSong } from '@/components/songcontext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NavItems } from '@/config';
import { Menu } from 'lucide-react';
import AudioPlayer from '@/components/SeekBar';
import { Songs } from '@/config';
import SeekBar from '@/components/SeekBar';
export default function Header() {
  const audioRef = useRef(null);
  const songs=Songs();
  const { setCurrentSong } = useSong();

  const playSong = (songUrl) => {
    if (audioRef.current) {
      audioRef.current.src = songUrl;
      audioRef.current.play();
    }
  };

  const handleButtonClick = (song) => {
    setCurrentSong(song);
    console.log(song)
  };
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sidebarExpanded');
      if (saved === null) {
        return true;
      }
      return JSON.parse(saved);
    }
    return true; 
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'sidebarExpanded',
        JSON.stringify(isSidebarExpanded),
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };


  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <Avatar>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfuXe_61jVT9ncY2HK0o7nWlwt9QSW5F19w&s" />
        </Avatar>

        <span className='hidden sm:block'>Wemsc</span> <span className='hidden sm:block'>Music</span>
        <IoIosArrowBack className="ml-10 hidden sm:block" />
        <IoIosArrowForward className="mr-6 hidden sm:block" />
        
        <div className="flex items-center gap-2 ml-auto relative">
                <FaSearch className="absolute left-3 text-gray-500 text-base" />
                <input
                    type="text"
                    placeholder="Search for artists, songs, albums"
                    className=" w-full pl-12 pr-4 py-2 text-gray-700 bg-white border-b-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 md:w-96 md:pl-14 md:py-2 sm:w-10 sm:w-10 sm:pl-10 sm:py-1"
                />
            </div>
            



      </Link>

      <div className="ml-4 flex items-center gap-3 border  ">
      <Avatar>
                <AvatarImage
                  src="data:image/png;base64,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"
                  alt="Michael Jackson"
                />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
        
        <h1 className='hidden sm:block '>Rohith C</h1>
        <MdNotificationAdd size={20} className='hidden sm:block ml-8'/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              
              <FaChevronDown/>
              
              
            </Button>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
        <DropdownMenuLabel>Recently Played</DropdownMenuLabel>
        
        <DropdownMenuSeparator />

        
        
        {songs.map((song, index) => (
  <DropdownMenuItem
    key={index}
    onClick={() => handleButtonClick(song.src)}
    className="flex flex-col sm:flex-row items-center space-x-4 sm:space-x-6 p-2 hover:bg-gray-200"
  >
    <img
      src={song.image}
      alt={song.songname}
      className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded"
    />
    <div className="flex-1 flex flex-col sm:ml-4">
      <div className="text-base sm:text-lg font-semibold">{song.songname}</div>
      <div className="text-sm text-gray-600">{song.movie || "Unknown Movie"}</div>
    </div>
    <div className="text-sm text-gray-500 mt-2 sm:mt-0">{song.duration}</div>
    
   
  </DropdownMenuItem>
  
))}
 


        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>My PlayList</DropdownMenuLabel>
        {songs.map((song, index) => (
  <DropdownMenuItem
    key={index}
    onClick={() => handleButtonClick(song.src)}
    className="flex flex-col sm:flex-row items-center space-x-4 sm:space-x-6 p-2 hover:bg-gray-200"
  >
    <img
      src={song.image}
      alt={song.songname}
      className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded"
    />
    <div className="flex-1 flex flex-col sm:ml-4">
      <div className="text-base sm:text-lg font-semibold">{song.songname}</div>
      <div className="text-sm text-gray-600">{song.movie || "Unknown Movie"}</div>
    </div>
    <div className="text-sm text-gray-500 mt-2 sm:mt-0">{song.duration}</div>
    
   
  </DropdownMenuItem>
  
))}
 <DropdownMenuSeparator/>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
      
      <audio ref={audioRef} controls style={{ display: 'none' }} />
      
      
    
        </DropdownMenu>
        

        <button onClick={() => setIsOpen(true)} className="block sm:hidden">
          <Menu size={24} />
        </button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className='block md:hidden'>
            <div className="pt-4 overflow-y-auto h-fit w-full flex flex-col gap-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.href}
                  onClick={() => setIsOpen(false)}
                  className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                    navItem.active
                      ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
                      : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                  }`}
                >
                  <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
            <ThemeToggle isDropDown={true} />
            
          </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
