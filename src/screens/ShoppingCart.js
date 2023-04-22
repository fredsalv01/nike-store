import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";

const ShoppingCartTotals = ({ subTotal, deliveryFee }) => (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text style={styles.text}>SubTotal</Text>
      <Text style={styles.text}>{subTotal} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Delivery</Text>
      <Text style={styles.text}>{deliveryFee} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textDark}>Total</Text>
      <Text style={styles.textDark}>{deliveryFee + subTotal} US$</Text>
    </View>
  </View>
);

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const FREE_DELIVERY = useSelector((state) => state.cart.freeDeliveryFrom);
  const defaultDeliveryFee = useSelector((state) => state.cart.deliveryFee);
  const subTotal = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const deliveryFee = subTotal >= FREE_DELIVERY ? defaultDeliveryFee : 0;

  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListFooterComponent={() => (
            <ShoppingCartTotals subTotal={subTotal} deliveryFee={deliveryFee} />
          )}
        />
        <TouchableOpacity onPress={{}} style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
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
  },
});
