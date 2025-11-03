import { FormControl } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import ButtonAction from "@/src/components/ButtonAction";
import InputForm from "@/src/components/InputForm";
import { THEME } from "@/src/theme/theme";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  useColorScheme
} from "react-native";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];
  const styles = createStyles(theme);
  // const createRecovery = useCreateRecovery({
  //   onSuccess: () => {
  //     setLoading(false);
  //     setIsEmailSent(true);
  //   },
  //   onError: (error) => {
  //     console.error("Password recovery error:", error);
  //     setLoading(false);
  //     Alert.alert(
  //       "Error",
  //       "Failed to send password reset email. Please check your email address and try again.",
  //       [{ text: "OK" }]
  //     );
  //   },
  // });

  const handleSendResetEmail = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address", [{ text: "OK" }]);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address", [
        { text: "OK" },
      ]);
      return;
    }

    setLoading(true);

    // createRecovery.mutate({
    //   email,
    //   url: APP_CONFIG.APP_URL + "/auth/reset-password",
    // });
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <VStack className="flex-1 pt-20">
      <HStack className="justify-start">
        <ButtonAction
        variant="link"
        iconAs={ChevronLeft}
        onPress={handleBackToLogin}
        colorIconAs="text-primary-500"
        className="p-5"
      />
      </HStack>
        
      
    <FormControl className="flex-1 justify-center p-4 rounded-lg w-full">
      <VStack className="gap-4">
      
      <Text style={styles.title}>نسيت كلمة المرور؟</Text>
      <Text style={styles.subtitle}>
        أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
      </Text>
   
      <VStack className=" gap-6 items-center justify-end">
      <InputForm
          variant="rounded"
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          onBlur={() => {}}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      <ButtonAction
        text="إرسال رابط إعادة التعيين"
        onPress={handleSendResetEmail}
        colorIconAs="text-white"
        sizeIcon={24}
        loading={loading}
      />
      
      <ButtonAction
        variant="outline"
        text="العودة لتسجيل الدخول"
        onPress={handleBackToLogin}
        colorIconAs="text-white"
        sizeIcon={24}
        loading={loading}
      />
      </VStack>
    </VStack>
    </FormControl>
    </VStack>
  );
}

const createStyles = (theme: typeof THEME.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.foreground,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 40,
      color: theme.mutedForeground,
      lineHeight: 24,
    },
    resetButton: {
      marginTop: 20,
    },
    backButton: {
      marginTop: 10,
    },
  });
