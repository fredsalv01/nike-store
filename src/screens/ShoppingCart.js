import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSlice,
  selectDeliveryPrice,
  selectSubTotal,
  selectTotal,
} from "../store/cartSlice";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "../store/apiSlice";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";

const ShoppingCartTotals = ({ subTotal, deliveryFee, total }) => (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text style={styles.text}>SubTotal</Text>
      <Text style={styles.text}>{subTotal} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>
        Delivery {deliveryFee === 0 ? "(Free > $200)" : ""}
      </Text>
      <Text style={styles.text}>{deliveryFee} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textDark}>Total</Text>
      <Text style={styles.textDark}>{total.toFixed(2)} US$</Text>
    </View>
  </View>
);

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const subTotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onCheckout = async () => {
    // create payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    console.log(response.data.data);
    if (response.error) {
      Alert.alert("Error", "There was an error creating the payment intent");
      return;
    }

    // init payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Nike Store Peru",
      paymentIntentClientSecret: response.data.data,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Error", "There was an error initializing the payment sheet");
      return;
    }

    // present payment sheet
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }

    // create order and get reference
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cart,
      subtotal: subTotal,
      delivery: deliveryFee,
      total: total,
      customer: {
        name: "John Doe",
        email: "john_doe@example.com",
        address: "123 Main Street",
      },
    });
    if (result.data?.status === "OK") {
      Alert.alert(
        "Order Created",
        `Your order has been created with reference: ${result.data?.data?.ref}`,
        [
          {
            text: "OK",
            onPress: () => {
              dispatch(cartSlice.actions.clear());
              navigation.navigate("Products");
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListFooterComponent={() => (
            <ShoppingCartTotals
              subTotal={subTotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          )}
        />
        <TouchableOpacity onPress={onCheckout} style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? <ActivityIndicator /> : "Checkout"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textDark: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
