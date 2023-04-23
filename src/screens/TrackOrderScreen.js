import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
import { useState } from "react";

const TrackOrderScreen = () => {
  const [ref, setRef] = useState("");
  const { data, isLoading, error } = useGetOrderQuery(ref);
  const order = data?.data;
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && <Text>Order not found</Text>}
      {data?.status === "OK" && (
        <View
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#33d6a066",
              opacity: 0.5,
              padding: 5,
              alignSelf: "flex-end",
              marginBottom: 7,
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontWeight: "700", textAlign: "left", color: "green" }}
            >
              Approved
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "600" }}>Order reference:</Text>
            <Text style={{ fontWeight: "400", color: "gray" }}>
              {order.ref}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "600" }}>Order total: </Text>
            <Text style={{ fontWeight: "400", color: "gray" }}>
              USD$ {order.total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "600" }}>Total Items: </Text>
            <Text style={{ fontWeight: "400", color: "gray" }}>
              {" "}
              {order.items.length}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
