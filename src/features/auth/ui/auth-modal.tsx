import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { APP_NAME } from "@/constants/variables";
import ButtonAction from "@/src/components/ButtonAction";
import FacebookButton from "@/src/components/FacebookButton";
import { router } from "expo-router";
import { AppleIcon, CalendarDays, GoalIcon, InspectIcon, MailIcon, X } from "lucide-react-native";
import React from "react";
import { Alert, Linking } from "react-native";
export function AuthModal() {
  const handleEmailSignIn = () => {
    // Navigate to phone sign in
    router.replace("/(auth)/login");
  };

  const handleGoogleSignIn = () => {
    Alert.alert("Google sign in pressed");
  };

  const handleAppleSignIn = () => {
    Alert.alert("Apple sign in pressed");
  };

  const handleFacebookSignIn = () => {
    // Navigate to onboarding flow after successful sign in
    Alert.alert("Facebook sign in pressed");
  };

  const handleTwitterSignIn = () => {
    Alert.alert("Twitter sign in pressed");
  };

  const handleVKSignIn = () => {
    // Implement VK sign in
    console.log("VK sign in pressed");
    // Navigate to onboarding flow after successful sign in
    Alert.alert("VK sign in pressed");
  };

  const handleTermsOfUse = () => {
    Linking.openURL("https://example.com/terms");
  };

  const handleBroadcasterAgreement = () => {
    Linking.openURL("https://example.com/broadcaster-agreement");
  };

  const handlePrivacyPolicy = () => {
    // Open privacy policy
    Linking.openURL("https://example.com/privacy");
  };

  const handleZixDev = () => {
    // Open ZixDev
    Linking.openURL("https://zixdev.com");
  };

  return (
    <VStack className="flex-1 bg-background-0 p-4 pt-10">
      {/* Close Button */}
      <Box className="p-4">
        <Button
          variant="link"
          action="secondary"
          onPress={() => {
            router.replace("/");
          }}
          className="self-end"
        >
          <ButtonIcon as={X} width={25} height={25} />
        </Button>
      </Box>

      {/* Logo Section */}
      <VStack className="items-center mt-24 mb-10">
        <Icon as={CalendarDays} className="w-16 h-16 text-primary-500" />
        <Text className="text-2xl font-bold text-primary-500 mt-4">
          {APP_NAME}
        </Text>
      </VStack>

      {/* Main Content */}
      <VStack className="flex-1 px-6">
        <Text className="text-base text-center text-typography-600 mb-8 leading-6">
          Sign in to experience complete functions
        </Text>

        {/* Primary Sign In Buttons */}
        <VStack className="mb-8 space-y-4 gap-4 items-center">
        
          <ButtonAction
            text="Continue with Email"
            onPress={handleEmailSignIn}
            iconAs={MailIcon}
            colorIconAs="text-white"
            sizeIcon={24}
          />

          
          <ButtonAction
            text="Continue with Google"
            action="secondary"
            onPress={handleGoogleSignIn}
            iconAs={GoalIcon}
            colorIconAs="text-black"
            sizeIcon={24}
          />
          <ButtonAction
            text="Continue with Apple"
            action="secondary"
            onPress={handleAppleSignIn}
            iconAs={AppleIcon}
            colorIconAs="text-black"
            sizeIcon={24}
          />
        </VStack>

        {/* OR Separator */}
        <HStack className="items-center mb-8">
          <Box className="flex-1 h-px bg-border-300" />
          <Text className="mx-4 text-sm text-typography-500 font-medium">
            OR
          </Text>
          <Box className="flex-1 h-px bg-border-300" />
        </HStack>

        {/* Social Media Icons */}
        <HStack className="justify-center mb-10 space-x-6">
          <FacebookButton
            onPress={handleFacebookSignIn}
            className="w-12 h-12 rounded-full bg-border-200 items-center justify-center"
          />

          <Pressable
            onPress={handleTwitterSignIn}
            className="w-12 h-12 rounded-full bg-border-200 items-center justify-center"
          >
            <Icon as={InspectIcon} className="w-12 h-12 text-primary-500" />
          </Pressable>
        </HStack>

        {/* Legal Text */}
        <VStack className="flex-1 justify-end items-center pb-5">
          <HStack className="flex-wrap justify-center items-center mb-4">
            <Text className="text-xs text-typography-500 text-center">
              By continuing, you agree to our{" "}
            </Text>
            <Pressable onPress={handleTermsOfUse}>
              <Text className="text-xs text-primary-500 underline">
                Terms of use
              </Text>
            </Pressable>
            <Text className="text-xs text-typography-500">, </Text>
            <Pressable onPress={handleBroadcasterAgreement}>
              <Text className="text-xs text-primary-500 underline">
                Broadcaster Agreement
              </Text>
            </Pressable>
            <Text className="text-xs text-typography-500"> and </Text>
            <Pressable onPress={handlePrivacyPolicy}>
              <Text className="text-xs text-primary-500 underline">
                Privacy Policy
              </Text>
            </Pressable>
          </HStack>

          <HStack className="items-center">
            <Text className="text-xs text-typography-500">powered by </Text>
            <Pressable onPress={handleZixDev}>
              <Text className="text-xs text-primary-500 underline">ZixDev</Text>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
