import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { NavBar } from "@/components/ui/nav-bar";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ButtonArrowBack, CardHero } from "@/src/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Bookmark, ChevronRight, Diamond, Play } from "lucide-react-native";
import { Pressable, ScrollView } from "react-native";

interface Bidder {
  id: string;
  name: string;
  avatar: string;
  bid: number;
  avatarColor: string;
}

// Fake bidders data
const fakeBidders: Bidder[] = [
  {
    id: "1",
    name: "Jollie",
    avatar: "A",
    bid: 14.7,
    avatarColor: "#DBEAFE",
  },
  {
    id: "2",
    name: "Andy",
    avatar: "A",
    bid: 13.8,
    avatarColor: "#FEF3C7",
  },
  {
    id: "3",
    name: "George",
    avatar: "G",
    bid: 12.5,
    avatarColor: "#D1FAE5",
  },
];

export default function GameDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get data from params or use defaults
  const gameName = (params.name as string) || "Doodle #8537";
  const gameBalance = parseFloat((params.balance as string) || "14.2");
  const backgroundColor = (params.backgroundColor as string) || "#D1FAE5";
  const ownerName = (params.ownerName as string) || "Admin";
  const ownerAvatar = (params.ownerAvatar as string) || "A";

  return (
    <ScreenLayout>
        <NavBar showProfileButton={true}>
        <ButtonArrowBack />
        </NavBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 -mx-4"
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
      >
        {/* NFT Image Card */}
        <Box
          className="w-full rounded-3xl mb-4 overflow-hidden"
          style={{
            backgroundColor: backgroundColor,
            height: 350,
          }}
        >
          <Box className="w-full h-full items-center justify-center">
            <Text className="text-gray-400 text-lg">NFT Image</Text>
          </Box>
        </Box>

        {/* NFT Information Card - Overlapping with image */}
        <CardHero className="w-full -mt-12">
          <VStack space="md">
            {/* Title */}
            <Text className="text-2xl font-bold text-gray-900">{gameName}</Text>

            {/* Ownership and Price Row */}
            <HStack className="items-center justify-between">
              {/* Ownership */}
              <HStack className="items-center gap-2 flex-1">
                <Text className="text-sm text-gray-500">Owned by</Text>
                <Avatar size="sm">
                  <AvatarFallbackText className="bg-amber-200">
                    {ownerAvatar}
                  </AvatarFallbackText>
                </Avatar>
                <Text className="text-sm font-semibold text-green-600">
                  {ownerName}
                </Text>
              </HStack>

              {/* Price */}
              <Box
                className="flex-row items-center px-4 py-2 rounded-full"
                style={{ backgroundColor: "#10B981" }}
              >
                <Diamond size={16} color="white" />
                <Text className="text-white text-base font-semibold ml-1">
                  {gameBalance}
                </Text>
              </Box>
            </HStack>
          </VStack>
        </CardHero>

        {/* About NFT Section */}
        <VStack space="md" className="mb-6">
          <Text className="text-xl font-bold text-gray-900">About NFT</Text>
          
          <Text className="text-blue-600 text-base font-medium">
            By Doodles LLC
          </Text>

          <Text className="text-gray-600 text-sm leading-6">
            A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000.
          </Text>

          <Pressable>
            <Text className="text-green-600 text-sm font-medium">
              View More
            </Text>
          </Pressable>
        </VStack>

        {/* Top Bidders Section */}
        <VStack space="md" className="mb-6">
          <Text className="text-xl font-bold text-gray-900">Top Bidders</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            <HStack space="md">
              {fakeBidders.map((bidder) => (
                <CardHero
                  key={bidder.id}
                  className="w-[140px]"
                >
                  <VStack space="sm" className="items-center">
                    <Avatar size="lg">
                      <AvatarFallbackText
                        style={{ backgroundColor: bidder.avatarColor }}
                      >
                        {bidder.avatar}
                      </AvatarFallbackText>
                    </Avatar>
                    
                    <Text className="text-base font-semibold text-gray-900">
                      {bidder.name}
                    </Text>

                    <HStack className="items-center">
                      <Diamond size={14} color="#10B981" />
                      <Text className="text-green-600 text-sm font-semibold ml-1">
                        {bidder.bid}
                      </Text>
                    </HStack>

                    <ChevronRight size={16} color="#9CA3AF" />
                  </VStack>
                </CardHero>
              ))}
            </HStack>
          </ScrollView>
        </VStack>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <Box
        className="absolute bottom-0 left-0 right-0 py-4 bg-white border-t border-gray-200"
        style={{ 
          paddingHorizontal: 16,
          shadowColor: "#000", 
          shadowOffset: { width: 0, height: -2 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 4 
        }}
      >
        <HStack className="items-center gap-4">
          {/* Bookmark Button */}
          <Button
            variant="solid"
            action="positive"
            className="rounded-2xl"
            style={{ width: 60, height: 60, backgroundColor: "#D1FAE5" }}
          >
            <ButtonIcon as={Bookmark} style={{ color: "#10B981" }} />
          </Button>

          {/* Place A Bid Button */}
          <Button
            variant="solid"
            action="positive"
            className="flex-1 rounded-2xl"
            style={{ height: 60, backgroundColor: "#10B981" }}
          >
            <ButtonIcon as={Play} style={{ color: "white" }} />
            <ButtonText className="text-white text-base font-semibold">
              Play Now
            </ButtonText>
          </Button>
        </HStack>
      </Box>
    </ScreenLayout>
  );
}
