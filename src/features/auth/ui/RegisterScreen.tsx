import { NavBar } from "@/components/ui/nav-bar";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import { ButtonArrowBack, CardHero } from "@/src/components";
import ButtonAction from "@/src/components/ButtonAction";
import InputForm from "@/src/components/InputForm";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useZodForm } from "@/src/hooks/useZodForm";
import { THEME } from "@/src/theme/theme";
import { CreateUserFormData, createUserSchema } from "@/src/validation/schemas";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, useColorScheme } from "react-native";

export function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, login, loading } = useAuth();
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme ?? "light"];
  const styles = createStyles(theme);
  const {
    errors,
    values: formData,
    setValue,
    setFieldTouched,
    validateField,
    handleSubmit,
  } = useZodForm<CreateUserFormData>({
    schema: createUserSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await register(
          values.username,
          values.email,
          values.password
        );
        if (user) {
          await login(values.email, values.password);
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create account";
        Alert.alert(errorMessage, "error");
        throw error;
      }
    },
  });

  const handleInputChange = (
    field: keyof CreateUserFormData,
    value: string
  ) => {
    setValue(field, value);
  };

  const handleInputBlur = (field: keyof CreateUserFormData) => {
    setFieldTouched(field);
    validateField(field, formData[field]);
  };

  useEffect(() => {
    setEmail(formData.email);
    setName(formData.username);
    setPassword(formData.password);
    setConfirmPassword(formData.confirmPassword);
  }, [formData, setEmail, setName, setPassword, setConfirmPassword]);

  return (
    <ScreenLayout>
      <NavBar>
        <ButtonArrowBack />
      </NavBar>
      <CardHero className="gap-1 items-center border-white">
        <Text style={styles.title}>إنشاء حساب جديد</Text>

        {/* {errors && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>{errors}</Text>
          <Text style={styles.errorDescription}>{errors}</Text>
        </View>
      )} */}
        <CardHero className="w-full">
          <InputForm
            variant="rounded"
            value={name}
            onChangeText={(value) => handleInputChange("username", value)}
            onBlur={() => handleInputBlur("username")}
            autoCapitalize="words"
            placeholder="Enter your full name"
            text="Full Name"
            textAlign="left"
          />
        </CardHero>
        <CardHero className="gap-4 w-full">
          <InputForm
            variant="rounded"
            placeholder="Enter your email"
            text="Email"
            textAlign="left"
            value={email}
            onChangeText={(value) => handleInputChange("email", value)}
            onBlur={() => handleInputBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </CardHero>
        <CardHero className="gap-4 w-full">
          <InputForm
            variant="rounded"
            placeholder="Enter your password"
            text="Password"
            textAlign="left"
            value={password}
            onChangeText={(value) => handleInputChange("password", value)}
            onBlur={() => handleInputBlur("password")}
            secureTextEntry
          />
        </CardHero>
        <CardHero className="gap-4 w-full">
          <InputForm
            variant="rounded"
            placeholder="Confirm your password"
            text="Confirm Password"
            textAlign="left"
            value={confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            onBlur={() => handleInputBlur("confirmPassword")}
            secureTextEntry
          />
        </CardHero> 
        <ButtonAction
          text="Create Account"
          onPress={handleSubmit}
          colorIconAs="text-white"
          sizeIcon={24}
          loading={loading}
        />

        <ButtonAction
          onPress={() => router.replace("/(auth)/login")}
          variant="outline"
          text="Already have an account?"
          colorIconAs="text-white"
          sizeIcon={24}
          loading={loading}
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
    errorContainer: {
      backgroundColor: theme.border,
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary,
    },
    errorTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 4,
    },
    errorDescription: {
      fontSize: 14,
      color: theme.primary,
      lineHeight: 20,
    },
    registerButton: {
      marginTop: 20,
    },
    loginButton: {
      marginTop: 10,
    },
  });
