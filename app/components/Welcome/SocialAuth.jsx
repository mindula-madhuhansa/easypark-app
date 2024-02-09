import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";
import { View } from "react-native";

import SocialAuthButton from "./SocialAuthButton";

import styles from "../../styles/Welcome/SocialAuth";
import { Images } from "../../constants";

WebBrowser.maybeCompleteAuthSession();

export default function SocialAuth() {
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

  const onPress = async (authMethod) => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await authMethod();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return (
    <View style={styles.container}>
      <SocialAuthButton
        onPress={() => onPress(googleAuth)}
        image={Images.GoogleLogo}
      />
      <SocialAuthButton
        onPress={() => onPress(facebookAuth)}
        image={Images.FacebookLogo}
      />
      <SocialAuthButton
        onPress={() => onPress(appleAuth)}
        image={Images.AppleLogo}
      />
    </View>
  );
}
