import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CURRICULUM VITAE</Text>

      <Text style={styles.text}>
        Nama Lengkap: Irfan Mubarok
      </Text>

      <Text style={styles.text}>
        NIM: 2488010075
      </Text>

      <Text style={styles.text}>
        Asal Sekolah: MAN 2 Kota Cirebon
      </Text>

      <Text style={styles.text}>
        Cita-cita: Website Development
      </Text>

      <Text style={styles.text}>
        Rencana Menggapai Cita-cita:
      </Text>

      <Text style={styles.text}>
        Saya akan terus belajar dan mengembangkan kemampuan
        di bidang website development dengan mempelajari HTML,
        CSS, JavaScript, serta teknologi web lainnya.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
});