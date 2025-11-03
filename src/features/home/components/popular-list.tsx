import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Diamond } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView } from "react-native";

interface PopularItem {
  id: string;
  name: string;
  numberUser: string;
  balance: number;
  backgroundColor: string;
  imageUrl?: string;
}

// Fake data
const fakeData: PopularItem[] = [
  {
    id: "1",
    name: "Doodles #7575",
    numberUser: "04:02:08",
    balance: 15.5,
    backgroundColor: "#FEE2E2", // light pink
  },
  {
    id: "2",
    name: "Cool Cat #1234",
    numberUser: "12:34:56",
    balance: 8.2,
    backgroundColor: "#E9D5FF", // light lavender
  },
  {
    id: "3",
    name: "Bored Ape #5678",
    numberUser: "23:45:12",
    balance: 22.8,
    backgroundColor: "#DBEAFE", // light blue
  },
  {
    id: "4",
    name: "Pudgy Penguin #9012",
    numberUser: "07:15:30",
    balance: 11.3,
    backgroundColor: "#FEF3C7", // light yellow
  },
  {
    id: "5",
    name: "Azuki #3456",
    numberUser: "15:20:45",
    balance: 19.7,
    backgroundColor: "#D1FAE5", // light green
  },
];

function PopularItemCard({ item }: { item: PopularItem }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(games)/game-details",
      params: {
        id: item.id,
        name: item.name,
        balance: item.balance.toString(),
        backgroundColor: item.backgroundColor,
        numberUser: item.numberUser,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Box
        className="rounded-2xl p-4 mx-2"
        style={{ backgroundColor: item.backgroundColor, width: 200 }}
      >
        <VStack space="md">
          {/* Illustration placeholder */}
          <Box className="w-full h-32 bg-white/50 rounded-xl items-center justify-center mb-2">
            <Text className="text-gray-400 text-xs">Image</Text>
          </Box>

          {/* Name */}
          <Text className="text-base font-semibold text-gray-900">
            {item.name}
          </Text>

          {/* Number user and Balance */}
          <HStack className="justify-between items-center">
            <Text className="text-sm text-gray-500">{item.numberUser}</Text>

            {/* Balance pill */}
            <Box
              className="flex-row items-center px-3 py-1 rounded-full"
              style={{ backgroundColor: "#10B981" }}
            >
              <Icon
                as={Diamond}
                size={12}
                className="text-white mr-1"
              />
              <Text className="text-white text-sm font-medium">
                {item.balance}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
}

export default function PopularList() {
  const [popularData] = useState<PopularItem[]>(fakeData);

  return (
    <Box className="mt-6">
      {/* Header */}
      <HStack className="justify-between items-center px-5 mb-4">
        <Text className="text-2xl font-bold text-gray-900">
          Popular Now
        </Text>
        <Pressable>
          <Text className="text-sm text-gray-500">View all</Text>
        </Pressable>
      </HStack>

      {/* Horizontal Scrollable List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {popularData.map((item) => (
          <PopularItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </Box>
  );
}