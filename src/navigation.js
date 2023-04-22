import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumbertOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const cartItems = useSelector(selectNumbertOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{ flexDirection: "row", marginRight: 10 }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: "500",
                    verticalAlign: "top",
                  }}
                >
                  {cartItems}
                </Text>
              </Pressable>
            ),
            headerBackTitle: "Back",
            headerBackTitleVisible: true,
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{
            title: "Product Details",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
          options={{
            title: "Cart",
            headerBackTitle: "Back",
            headerBackTitleVisible: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  cartItems: {},
});
