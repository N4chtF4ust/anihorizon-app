import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const animeList = [
  'Naruto',
  'One Piece',
  'Bleach',
  'Attack on Titan',
  'My Hero Academia',
  'Jujutsu Kaisen',
  'Demon Slayer',
  'Fullmetal Alchemist',
  'Death Note',
  'Tokyo Ghoul',
  'Sword Art Online',
  'Fairy Tail',
  'Black Clover',
  'Blue Exorcist',
  'Hunter x Hunter',
  'Dragon Ball Z',
  'Dragon Ball Super',
  'Boruto',
  'Mob Psycho 100',
  'Chainsaw Man',
  'The Promised Neverland',
  'Vinland Saga',
  'Fire Force',
  'Dr. Stone',
  'Re:Zero',
  'Steins;Gate',
  'Erased',
  'Parasyte',
  'Code Geass',
  'Cowboy Bebop',
  'Trigun',
  'Samurai Champloo',
  'Berserk',
  'Psycho-Pass',
  'Claymore',
  'Gintama',
  'Noragami',
  'Soul Eater',
  'Inuyasha',
  'Hellsing',
  'Akame ga Kill!',
  'The Rising of the Shield Hero',
  'No Game No Life',
  'That Time I Got Reincarnated as a Slime',
  'Overlord',
  'Fate/Stay Night',
  'Fate/Zero',
  'The Seven Deadly Sins',
  'Kill la Kill',
  'Devilman Crybaby',
  'Made in Abyss',
  'Your Lie in April',
  'Vivy: Fluorite Eye’s Song',
  'Darling in the Franxx',
  'Charlotte',
  'Angel Beats!',
  'Assassination Classroom',
  'Bungo Stray Dogs',
  'Zom 100: Bucket List of the Dead',
  'Plunderer',
  'High School DxD',
  'Bakuman',
  'Haikyuu!!',
  'Kuroko no Basket',
  'Free!',
  'Yuri on Ice',
  'Clannad',
  'Toradora!',
  'K-On!',
  'Anohana',
  'Golden Time',
  'Horimiya',
  'Komi Can’t Communicate',
  'Spy x Family',
  'Rent-a-Girlfriend',
  'The Quintessential Quintuplets',
  'Nagatoro-san',
  'Uzaki-chan Wants to Hang Out!',
  'My Dress-Up Darling',
  'Chains of Fate',
  'Neo Tokyo Blaze',
  'Shadows of Kyoto',
  'Dream Circuit',
  'Silent Blade',
  'Crimson Moon Requiem',
  'Spirit Pulse',
  'Iron Soul Chronicle',
  'Storm Hearts',
  'Cyber Ronin',
  'Arcadia Drift',
  'Dragon Nova',
  'Ghost Spiral',
  'Midnight Shuriken',
  'Tempest Fury',
  'Infinity Zero',
  'Solar Eclipse Saga',
  'Phantom Mirage',
  'Mecha Symphony',
  'Winds of Aether',
  'Bloom Code',
  'Twilight Katana',
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(animeList);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = animeList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView className=" bg-black flex-1 px-4 pb-20">
      <TextInput
        className="bg-white rounded-lg px-4 py-2 text-black mt-4 mb-2"
        placeholder="Search anime..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
      />

      {query.trim() === '' ? (
        <Text className="text-gray-400 text-center mt-10">
          🔍 Please enter a search query.
        </Text>
      ) : filteredData.length === 0 ? (
        <Text className="text-gray-400 text-center mt-10">
          ❌ No results found.
        </Text>
      ) : (
        <FlatList className=' w-[100%] h-[84%]  '
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text className="text-white text-base py-2 border-b border-sky-300 justify-self-center">
              {item}
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
