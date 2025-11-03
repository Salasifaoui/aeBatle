import { NavBar } from "@/components/ui/nav-bar";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { ButtonArrowBack, CardHero } from "@/src/components";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import {
  Bell,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Shield,
  Star
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUserService } from "../hooks/userProfile";
import { userProfileAtom } from "../store/profileAtoms";

export default function Profile() {
  const router = useRouter();
  const { logout, user: userAuth } = useAuth();
  const { userProfile } = useUserService(userAuth?.userId || "");
  const [profileFromAtom] = useAtom(userProfileAtom);



  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout();
          router.replace("/(auth)/auth-model");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <NavBar showSettingsButton={true}>
        <ButtonArrowBack />
      </NavBar>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Settings */}

        {/* Profile Info */}
        <View className=" mx-5 mb-6">
        <CardHero className="items-center  bg-primary-50">
          <View className="relative mb-4">
            <UserAvatar user={profileFromAtom || userProfile} size={100} />
          </View>

          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {userProfile?.username}
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            {userProfile?.email}
          </Text>
          <Text className="text-sm text-gray-700 text-center mb-5">
            {userProfile?.bio}
          </Text>

          {/* Stats */}
          <CardHero className="flex-row bg-white rounded-2xl p-4 w-full mb-4">
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold mb-1 text-primary-500">
                0
              </Text>
              <Text className="text-xs text-gray-600">Ae</Text>
            </View>
            <View className="w-px bg-gray-200 mx-2" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold mb-1 text-primary-500">
                0
              </Text>
              <Text className="text-xs text-gray-600">Followers</Text>
            </View>
            <View className="w-px bg-gray-200 mx-2" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold mb-1 text-primary-500">
                12
              </Text>
              <Text className="text-xs text-gray-600">Memories</Text>
            </View>
          </CardHero>
        </CardHero>
        </View>


        {/* Quick Actions */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Quick Actions
          </Text>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <Heart size={20} color="gray-700" className="text-gray-700" />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Favorisierte Events
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <MapPin size={20} color="gray-700" className="text-gray-700" />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Favorisierte Locations
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <Star size={20} color="gray-700" className="text-gray-700" />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Event-Bewertungen
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>
        </View>

        {/* Settings Section */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Einstellungen
          </Text>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <Bell size={20} color="gray-700" className="text-gray-700" />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Benachrichtigungen
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <Shield size={20} color="gray-700" className="text-gray-700" />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Privatsphäre & Sicherheit
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>

          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3">
              <HelpCircle
                size={20}
                color="gray-700"
                className="text-gray-700"
              />
            </View>
            <Text className="flex-1 text-base text-gray-900">
              Hilfe & Support
            </Text>
            <ChevronRight
              size={20}
              color="gray-400"
              className="text-gray-400"
            />
          </Pressable>
        </View>

        {/* Logout */}
        <View className="px-5 mb-6">
          <Pressable
            className="flex-row items-center justify-center gap-3 py-4 rounded-xl border border-red-200 bg-red-200"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#EF4444" />
            <Text
              className="text-base font-semibold"
              style={{ color: "#EF4444" }}
            >
              Abmelden
            </Text>
          </Pressable>
        </View>

        {/* App Version */}
        <View className="items-center py-4">
          <Text className="text-xs text-gray-500">N8TLY Version 1.0.0</Text>
        </View>

        {/* Bottom Spacing */}
        <View className="h-5" />
      </ScrollView>
    </SafeAreaView>
  );
}
