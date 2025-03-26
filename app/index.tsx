import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    console.log("Search pressed:", searchQuery);
  };

  return (
    <View className="flex-1 p-6">
      <Text className="text-blue-400 text-3xl mb-8 text-center">RideMate 🏍️</Text>

      <View className="flex-1 justify-center">
        <SearchBar
          placeHolder="Search for items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onPress={handleSearch}
        />
      </View>
    </View>
  );
}
