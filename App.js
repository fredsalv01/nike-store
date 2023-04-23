import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripe_publishable_key =
  "pk_test_51KkJ4qCn7TBsELSeqqwPTBshmadqjjwBT82gQyZgVKjEYuJFqEYrRCU5tTyEbWCkzrvhSn7jV11EQRgyQGbWxtzF00EbNlE5Eb";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={stripe_publishable_key}>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
