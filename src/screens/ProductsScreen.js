import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductsQuery();

  const HandleSelectProduct = (item) => {
    // update selected product
    navigation.navigate("Product Details", { id: item._id });
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      />
    );
  }

  if (error) {
    return <Text>Error fetching products {error?.error}</Text>;
  }

  const products = data.data;

  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => HandleSelectProduct(item)}
          style={styles.itemContainer}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
