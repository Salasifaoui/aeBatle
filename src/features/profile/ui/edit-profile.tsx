import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { NavBar } from "@/components/ui/nav-bar";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import { Text } from "@/components/ui/text";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { VStack } from "@/components/ui/vstack";
import { CardHero } from "@/src/components";
import ButtonAction from "@/src/components/ButtonAction";
import { GallerySheet } from "@/src/components/GallerySheet";
import InputForm from "@/src/components/InputForm";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useUpdateProfile } from "@/src/features/profile/hooks/userUpdateProfile";
import { Media } from "@/src/models/Media";
import { router } from "expo-router";
import { useAtom } from "jotai";
import {
  ChevronDownCircle,
  ChevronLeft,
  ChevronUpCircle,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useUserService } from "../hooks/userProfile";
import { userProfileAtom } from "../store/profileAtoms";

export function EditProfileScreen() {
  const { user } = useAuth();
  const { userProfile: profile } = useUserService(user?.userId || "");
  const [profileFromAtom] = useAtom(userProfileAtom);

  const { updateProfile, loading, error, reset } = useUpdateProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);

  // Initialize form with profile data
  useEffect(() => {
    const currentProfile = profileFromAtom || profile;
    if (currentProfile) {
      setName(currentProfile.username || "");
      setEmail(currentProfile.email || "");
      setBio(currentProfile.bio || "");
    }
  }, [profile, profileFromAtom]);

  // Check if there are changes
  useEffect(() => {
    const currentProfile = profileFromAtom || profile;
    if (currentProfile) {
      const nameChanged = name.trim() !== (currentProfile.username || "");
      const emailChanged = email.trim() !== (currentProfile.email || "");
      const bioChanged = bio.trim() !== (currentProfile.bio || "");
      const imageChanged =
        selectedImage?.url !== (currentProfile.imageUrl || "");
      setHasChanges(nameChanged || emailChanged || bioChanged || imageChanged);
    }
  }, [name, email, bio, profile, profileFromAtom]);

  // Handle error display
  useEffect(() => {
    if (error) {
      Alert.alert("Update Error", error);
      reset();
    }
  }, [error, reset]);

  const handleSave = async () => {
    const currentProfile = profileFromAtom || profile;
    if (!currentProfile || !hasChanges || loading) return;

    const nameChanged = name.trim() !== (currentProfile.username || "");
    const emailChanged = email.trim() !== (currentProfile.email || "");
    const bioChanged = bio.trim() !== (currentProfile.bio || "");
    if (!name.trim()) {
      Alert.alert("Invalid Name", "Name cannot be empty.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      // Prepare update data
      const updateData: any = {};

      if (nameChanged) {
        updateData.username = name.trim();
      }

      if (emailChanged) {
        updateData.email = email.trim();
      }

      if (bioChanged) {
        updateData.bio = bio.trim();
      }

      // Update profile using the hook
      const updatedUser = await updateProfile(
        currentProfile.userId,
        updateData
      );

      if (updatedUser) {
        Alert.alert(
          "Success",
          "Your account information has been updated successfully."
        );
        // Navigate back to settings
        router.back();
      } else if (error) {
        Alert.alert("Error", error);
      }
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleImageUpload = async (media: Media | Media[]) => {
    await updateProfile(user?.userId || "", {
      imageUrl: (media as Media).url as string,
    });
    setSelectedImage(media as Media);
  };

  return (
    <ScreenLayout>
      <NavBar showSearchButton>
        <Button
          variant="link"
          action="secondary"
          onPress={() => {
            router.back();
          }}
        >
          <ButtonIcon
            as={ChevronLeft}
            style={{ width: 25, height: 25 }}
            className="text-primary-400"
          />
        </Button>
      </NavBar>
      <VStack className="flex-1 p-4 gap-4">
        <CardHero className="items-center mb-8">
          <UserAvatar user={profileFromAtom || profile} size={100} />

          <HStack className="justify-center items-center gap-2">
            <Text className="text-lg font-bold">
              Select your avatar or upload a new one
            </Text>
            {!showGallery ? (
              <Button
                variant="link"
                action="secondary"
                onPress={() => setShowGallery(true)}
              >
                <Icon
                  as={ChevronDownCircle}
                  style={{ width: 20, height: 20 }}
                  className="fill-primary-400 text-secondary-400"
                />
              </Button>
            ) : (
              <Button
                variant="link"
                action="secondary"
                onPress={() => setShowGallery(false)}
              >
                <ChevronUpCircle
                  style={{ width: 20, height: 20 }}
                  className="fill-primary-400"
                />
              </Button>
            )}
          </HStack>
        </CardHero>

        <CardHero className="gap-4">
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              onBlur={() => {}}
              text="Full Name"
              textAlign="left"
            />
          </CardHero>
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              onBlur={() => {}}
              text="Email"
              textAlign="left"
            />
          </CardHero>
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Add you Account Address (optional)"
              value={bio}
              onChangeText={setBio}
              onBlur={() => {}}
              autoCapitalize="none"
              text="Add you Account Address"
              textAlign="left"
            />
          </CardHero>
        </CardHero>
        <VStack className="gap-4 items-center justify-center mt-10">
          <ButtonAction
            text="حفظ التغييرات"
            onPress={handleSave}
            colorIconAs="text-white"
            sizeIcon={24}
            loading={loading}
          />
          <ButtonAction
            text="إلغاء"
            action="secondary"
            onPress={() => router.back()}
            colorIconAs="text-white"
            sizeIcon={24}
            loading={loading}
          />
        </VStack>
      </VStack>
      <GallerySheet
        showActionsheet={showGallery}
        setShowActionsheet={setShowGallery}
        allowMultiple={false}
        maxImages={1}
        onImageUpload={handleImageUpload}
        onClose={() => setShowGallery(false)}
      />
    </ScreenLayout>
  );
}
