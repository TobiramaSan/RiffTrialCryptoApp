import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  InnerContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTextUsd: {
    color: "white",
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: 1,
  },
  containerTextName: {
    color: "white",
    fontSize: 17,
    fontWeight: 400,
  },
  priceChangeCont: {
    paddingHorizontal: 3,
    paddingVertical: 8,
    flexDirection: "row",
    padding: 5,
    borderRadius: 6,
  },
  textInput: {
    color: "white",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    // width: 130,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 16,
    color: "white",
  },
});

export default styles;
