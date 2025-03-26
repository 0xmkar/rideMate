import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
  placeHolder: string;
  onPress?: () => void;
  value: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeHolder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-black rounded-full px-10 py-4 mt-4">
      <TouchableOpacity onPress={onPress}>
        <Image
          source={icons.search}
          className="size-8"
          resizeMode="contain"
          tintColor="#ab8bff"
        />
      </TouchableOpacity>

      <TextInput
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-black"
      />
    </View>
  );
};

export default SearchBar;
