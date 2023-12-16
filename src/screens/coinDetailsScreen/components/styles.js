import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: { flexDirection: "row", alignItems: "center" },

  image: {
    width: 25,
    height: 25,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
    fontSize: 17,
  },
  tile: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  rank: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
export default styles;
