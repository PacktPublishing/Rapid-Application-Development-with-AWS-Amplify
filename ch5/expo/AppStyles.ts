import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 16,
  },
  container: { flex: 1, justifyContent: "flex-start", padding: 30 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 10 },
  textArea: {
    backgroundColor: "#ddd",
    padding: 10,
    height: 70,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    fontSize: 15,
  },
  scrollView: {
    marginTop: 20,
  },
  post: { marginBottom: 15 },
  postTitle: { fontSize: 18, fontWeight: "bold" },
  postContent: { fontSize: 16, marginBottom: 10 },
  postUpdate: { fontSize: 12, width: "50%", textAlign: "center" },
  postDelete: { fontSize: 12, width: "50%", textAlign: "center" },
});
