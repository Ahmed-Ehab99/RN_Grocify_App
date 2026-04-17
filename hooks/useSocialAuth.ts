import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useState } from "react";
import { Alert } from "react-native";

type SocialStrategy = "oauth_google" | "oauth_apple";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<SocialStrategy | null>(
    null
  );
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: SocialStrategy) => {
    if (loadingStrategy) return; // Guard againts concurrent flow. If one social button is loading and user click on another button, don't make anything
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({ path: "/" }),
      });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Sign-in didn't complete. Please try again."
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error("Error in social auth: ", error);
      Alert.alert("Error", "Failed to sign in. Please try again");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
