import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Transaction, Flow, Currency } from "./model/Transaction";
import { Category } from "./model/Category";
import { Deposit } from "./model/Deposit";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Add transaction" onPress={addTransaction} />
      <StatusBar style="auto" />
    </View>
  );
}

const addTransaction = () => {
  const c = new Category("Aperitivo", "assets/category_icons/aperitivo.png");
  const d = new Deposit("Portafoglio", "assets/deposit_icons/portafoglio.png");
  const t = new Transaction(
    undefined,
    Flow.Income,
    Currency.Euro,
    542.1,
    c,
    d,
    undefined
  );
  t.insertDB();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
