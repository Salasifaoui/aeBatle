import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import { CardHero } from "@/src/components";
import ButtonAction from "@/src/components/ButtonAction";
import InputForm from "@/src/components/InputForm";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useZodForm } from "@/src/hooks/useZodForm";
import { THEME } from "@/src/theme/theme";
import { LoginFormData, loginSchema } from "@/src/validation/schemas";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, useColorScheme } from "react-native";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];
  const styles = createStyles(theme);
  const {
    values: formData,
    setValue,
    setFieldTouched,
    validateField,
    handleSubmit,
  } = useZodForm<LoginFormData>({
    schema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        router.replace("/(tabs)/home");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to sign in";
        Alert.alert(errorMessage, "error");
        throw error;
      }
    },
  });

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setValue(field, value);
  };

  const handleInputBlur = (field: keyof LoginFormData) => {
    setFieldTouched(field);
    validateField(field, formData[field]);
  };

  useEffect(() => {
    setEmail(formData.email);
    setPassword(formData.password);
  }, [formData, setEmail, setPassword]);

  return (
    <ScreenLayout>
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
      <CardHero className="gap-2 items-center border-white">
        <Text style={styles.title}>تسجيل الدخول</Text>
        <CardHero className="gap-4 w-full">
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter your email"
              value={email}
              onChangeText={(value) => handleInputChange("email", value)}
              onBlur={() => handleInputBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
              text="Email"
              textAlign="left"
            />
          </CardHero>
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter your password"
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              onBlur={() => handleInputBlur("password")}
              secureTextEntry
              keyboardType="email-address"
              autoCapitalize="words"
              text="Password"
              textAlign="left"
            />
          </CardHero>
        </CardHero>

   
          <ButtonAction
            text="Login"
            onPress={handleSubmit}
            colorIconAs="text-white"
            sizeIcon={24}
          />

          <ButtonAction
            text="Create Account"
            onPress={() => router.push("/(auth)/register")}
            colorIconAs="text-white"
            sizeIcon={24}
          />


    
          <ButtonAction
            action="secondary"
            variant="link"
            text="Forgot Password?"
            onPress={() => router.push("/(auth)/forgot-password")}
            className="text-primary-500"
          />
      </CardHero>
    </ScreenLayout>
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
      marginBottom: 40,
      color: theme.foreground,
    },
    loginButton: {
      marginTop: 20,
    },
    registerButton: {
      marginTop: 10,
    },
    forgotButton: {
      marginTop: 10,
    },
  });
