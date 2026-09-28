import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Share,
} from "react-native";

import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import NetInfo from "@react-native-community/netinfo";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


// ======================================================
// DATA PROFILE
// ======================================================

const PROFILE = {
  name: "Irfan Mubarok",
  title: "Web Developer",
  email: "irfanmubarok@mail.uinssc.ac.id",
  phone: "0838-0433-9441",
  location: "Gumulung Lebak - Greged",

  bio: "Mahasiswa Informatika yang sedang belajar Mata Kuliah Pemrograman Mobile oleh Bapak Firdaus",

  avatar:
    "https://avatars.githubusercontent.com/u/273804599?v=4&size=64",

  avatarOffline: require("./assets/profilabay.png"),

  nim: "2488010075",

  school: "UIN Siber Syekh Nurjati Cirebon",

  aspiration: "Website Development",

  plan:
    "Saya akan terus belajar dan mengembangkan kemampuan di bidang website development dengan mempelajari HTML, CSS, JavaScript, serta teknologi web lainnya. Saya juga akan memperbanyak latihan dan membuat berbagai proyek website untuk meningkatkan pengalaman dan kemampuan saya.",
};


// ======================================================
// DATA SKILLS
// ======================================================

const SKILLS = [
  {
    id: "1",
    name: "HTML",
    percentage: 90,
  },
  {
    id: "2",
    name: "CSS",
    percentage: 85,
  },
  {
    id: "3",
    name: "JavaScript",
    percentage: 80,
  },
  {
    id: "4",
    name: "PHP",
    percentage: 75,
  },
  {
    id: "5",
    name: "Figma",
    percentage: 70,
  },
];


// ======================================================
// DATA PENDIDIKAN DAN ORGANISASI
// ======================================================

const HISTORY = [
  {
    title: "Pendidikan",
    data: [
      {
        type: "education",
        title: "UIN Siber Syekh Nurjati Cirebon",
        subtitle: "Informatika",
        year: "2024 - Sekarang",
        description:
          "Sedang menempuh pendidikan S1 Informatika di UIN Siber Syekh Nurjati Cirebon",
      },
    ],
  },

  {
    title: "Organisasi",
    data: [
      {
        type: "organization",
        title: "Himpunan Mahasiswa Informatika",
        subtitle: "Kepala Department of Information and Communcations",
        year: "2026/2027",
        description:
          "Berperan dalam mengelola informasi dan komunikasi organisasi serta membantu menyampaikan informasi kegiatan kepada mahasiswa.",
      },
    ],
  },
];


// ======================================================
// KOMPONEN SKILL CARD
// ======================================================

function SkillCard({ item }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: item.percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.skillCard}>

      <View style={styles.skillTop}>
        <Text style={styles.skillName}>
          {item.name}
        </Text>

        <Text style={styles.skillPercent}>
          {item.percentage}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: width,
            },
          ]}
        />
      </View>

    </View>
  );
}


// ======================================================
// KOMPONEN TIMELINE CARD
// ======================================================

function TimelineCard({ item }) {
  return (
    <View style={styles.timelineCard}>

      <View style={styles.timelineCircle}>
        <Text style={styles.timelineCircleText}>
          {item.type === "education" ? "🎓" : "👥"}
        </Text>
      </View>

      <View style={styles.timelineContent}>

        <Text style={styles.timelineYear}>
          {item.year}
        </Text>

        <Text style={styles.timelineTitle}>
          {item.title}
        </Text>

        <Text style={styles.timelineSubtitle}>
          {item.subtitle}
        </Text>

        <Text style={styles.timelineDescription}>
          {item.description}
        </Text>

      </View>

    </View>
  );
}


// ======================================================
// APP
// ======================================================

export default function App() {

  // ====================================================
  // FONT
  // ====================================================

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });


  // ====================================================
  // STATE
  // ====================================================

  const [isOnline, setIsOnline] = useState(true);

  const [loading, setLoading] = useState(true);

  const [showContact, setShowContact] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [message, setMessage] = useState("");


  // ====================================================
  // ANIMATION INTRO
  // ====================================================

  const introOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const introScale = useRef(
    new Animated.Value(1)
  ).current;


  // ====================================================
  // ANIMATION AVATAR
  // ====================================================

  const avatarOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const avatarScale = useRef(
    new Animated.Value(0.7)
  ).current;


  // ====================================================
  // CEK INTERNET
  // ====================================================

  useEffect(() => {

    NetInfo.fetch().then((state) => {
      setIsOnline(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();

  }, []);


  // ====================================================
  // INTRO LOADING
  // ====================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      Animated.parallel([

        Animated.timing(introOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(introScale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),

      ]).start(() => {
        setLoading(false);
      });

    }, 2000);

    return () => clearTimeout(timer);

  }, []);


  // ====================================================
  // ANIMASI AVATAR
  // ====================================================

  useEffect(() => {

    if (!loading) {

      Animated.parallel([

        Animated.timing(avatarOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.spring(avatarScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),

      ]).start();

    }

  }, [loading]);


  // ====================================================
  // SHARE CV
  // ====================================================

  const shareCV = async () => {

    try {

      await Share.share({

        message:
          `CV Irfan Mubarok\n\n` +
          `Nama: ${PROFILE.name}\n` +
          `NIM: ${PROFILE.nim}\n` +
          `Profesi: ${PROFILE.title}\n` +
          `Email: ${PROFILE.email}\n` +
          `Telepon: ${PROFILE.phone}\n` +
          `Lokasi: ${PROFILE.location}\n\n` +
          `Pendidikan:\n` +
          `${PROFILE.school}\n\n` +
          `Cita-cita:\n` +
          `${PROFILE.aspiration}\n\n` +
          `Tentang Saya:\n` +
          `${PROFILE.bio}`,

      });

    } catch (error) {

      console.log(error);

    }
  };


  // ====================================================
  // KIRIM PESAN
  // ====================================================

  const sendMessage = () => {

    if (message.trim() === "") {
      alert("Silakan tulis pesan terlebih dahulu.");
      return;
    }

    alert("Pesan berhasil disiapkan.");

    setMessage("");

  };


  // ====================================================
  // SECTION LIST DATA
  // ====================================================

  const sections = [

    {
      title: "Keahlian",
      type: "skills",
      data: ["skills"],
    },

    {
      title: "Pendidikan",
      type: "history",
      data: HISTORY[0].data,
    },

    {
      title: "Organisasi",
      type: "history",
      data: HISTORY[1].data,
    },

  ];


  // ====================================================
  // HEADER
  // ====================================================

  const renderHeader = () => {

    return (

      <View>

        {/* ============================================
            HEADER GRADIENT
        ============================================ */}

        <LinearGradient
          colors={
            darkMode
              ? ["#111827", "#1e293b"]
              : ["#2563EB", "#7C3AED"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >

          {/* STATUS INTERNET */}

          <View style={styles.statusContainer}>

            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: isOnline
                    ? "#22C55E"
                    : "#EF4444",
                },
              ]}
            />

            <Text style={styles.statusText}>
              {isOnline
                ? "Online"
                : "Offline"}
            </Text>

          </View>


          {/* AVATAR */}

          <Animated.View
            style={{
              opacity: avatarOpacity,
              transform: [
                {
                  scale: avatarScale,
                },
              ],
            }}
          >

            <View style={styles.avatarBorder}>

              <Image
                source={
                  isOnline
                    ? {
                        uri: PROFILE.avatar,
                      }
                    : PROFILE.avatarOffline
                }
                style={styles.avatar}
              />

            </View>

          </Animated.View>


          {/* NAME */}

          <Text style={styles.headerName}>
            {PROFILE.name}
          </Text>

          <Text style={styles.headerTitle}>
            {PROFILE.title}
          </Text>


          {/* LOCATION */}

          <Text style={styles.headerLocation}>
            📍 {PROFILE.location}
          </Text>


          {/* DETAIL BUTTON */}

          <TouchableOpacity
            style={styles.detailButton}
            activeOpacity={0.7}
            onPress={() => setModalVisible(true)}
          >

            <Text style={styles.detailButtonText}>
              Lihat Detail Profil
            </Text>

          </TouchableOpacity>

        </LinearGradient>


        {/* ============================================
            BIO CARD
        ============================================ */}

        <View style={styles.sectionContainer}>

          <View style={styles.glassCard}>

            <Text style={styles.sectionTitle}>
              Tentang Saya
            </Text>

            <Text style={styles.bioText}>
              {PROFILE.bio}
            </Text>

          </View>


          {/* ========================================
              QUICK INFORMATION
          ======================================== */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickScroll}
          >

            <View style={styles.quickCard}>
              <Text style={styles.quickIcon}>🎓</Text>

              <Text style={styles.quickLabel}>
                Pendidikan
              </Text>

              <Text style={styles.quickValue}>
                Informatika
              </Text>
            </View>


            <View style={styles.quickCard}>
              <Text style={styles.quickIcon}>💻</Text>

              <Text style={styles.quickLabel}>
                Fokus
              </Text>

              <Text style={styles.quickValue}>
                Web Development
              </Text>
            </View>


            <View style={styles.quickCard}>
              <Text style={styles.quickIcon}>📱</Text>

              <Text style={styles.quickLabel}>
                Platform
              </Text>

              <Text style={styles.quickValue}>
                Mobile
              </Text>
            </View>

          </ScrollView>


          {/* ========================================
              CITA-CITA
          ======================================== */}

          <View style={styles.glassCard}>

            <Text style={styles.sectionTitle}>
              Cita-cita
            </Text>

            <Text style={styles.aspirationText}>
              {PROFILE.aspiration}
            </Text>

            <Text style={styles.planText}>
              {PROFILE.plan}
            </Text>

          </View>


          {/* ========================================
              PENGATURAN
          ======================================== */}

          <View style={styles.glassCard}>

            <Text style={styles.sectionTitle}>
              Pengaturan Tampilan
            </Text>


            <View style={styles.settingRow}>

              <View>
                <Text style={styles.settingTitle}>
                  Tampilkan Kontak
                </Text>

                <Text style={styles.settingDescription}>
                  Menampilkan informasi kontak
                </Text>
              </View>

              <Switch
                value={showContact}
                onValueChange={setShowContact}
              />

            </View>


            <View style={styles.settingRow}>

              <View>
                <Text style={styles.settingTitle}>
                  Mode Gelap
                </Text>

                <Text style={styles.settingDescription}>
                  Mengubah tampilan kartu
                </Text>
              </View>

              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />

            </View>

          </View>

        </View>

      </View>
    );
  };


  // ====================================================
  // SECTION HEADER
  // ====================================================

  const renderSectionHeader = ({ section }) => {

    return (

      <View style={styles.sectionHeader}>

        <Text
          style={[
            styles.sectionHeaderText,
            {
              color: darkMode
                ? "#FFFFFF"
                : "#111827",
            },
          ]}
        >
          {section.title}
        </Text>

      </View>

    );
  };


  // ====================================================
  // RENDER ITEM
  // ====================================================

  const renderItem = ({ item, section }) => {

    // SKILLS

    if (section.type === "skills") {

      return (

        <View style={styles.skillsWrapper}>

          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SkillCard item={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skillList}
          />

        </View>

      );

    }


    // HISTORY

    return (

      <View style={styles.historyWrapper}>

        <TimelineCard item={item} />

      </View>

    );
  };


  // ====================================================
  // FOOTER
  // ====================================================

  const renderFooter = () => {

    return (

      <View style={styles.footerContainer}>


        {/* ============================================
            KONTAK
        ============================================ */}

        {showContact && (

          <View style={styles.glassCard}>

            <Text style={styles.sectionTitle}>
              Kontak
            </Text>


            <View style={styles.contactRow}>

              <Text style={styles.contactIcon}>
                📧
              </Text>

              <View>
                <Text style={styles.contactLabel}>
                  Email
                </Text>

                <Text style={styles.contactValue}>
                  {PROFILE.email}
                </Text>
              </View>

            </View>


            <View style={styles.contactRow}>

              <Text style={styles.contactIcon}>
                📱
              </Text>

              <View>
                <Text style={styles.contactLabel}>
                  Telepon
                </Text>

                <Text style={styles.contactValue}>
                  {PROFILE.phone}
                </Text>
              </View>

            </View>


            <View style={styles.contactRow}>

              <Text style={styles.contactIcon}>
                🎓
              </Text>

              <View>
                <Text style={styles.contactLabel}>
                  NIM
                </Text>

                <Text style={styles.contactValue}>
                  {PROFILE.nim}
                </Text>
              </View>

            </View>

          </View>

        )}


        {/* ============================================
            PESAN
        ============================================ */}

        <View style={styles.glassCard}>

          <Text style={styles.sectionTitle}>
            Pesan Singkat
          </Text>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Tulis pesan..."
            placeholderTextColor="#9CA3AF"
            multiline
            style={styles.messageInput}
          />

          <Button
            title="Kirim Pesan"
            onPress={sendMessage}
          />

        </View>


        {/* ============================================
            SHARE
        ============================================ */}

        <Pressable
          onPress={shareCV}
          style={({ pressed }) => [
            styles.shareButton,
            pressed && styles.buttonPressed,
          ]}
        >

          <Text style={styles.shareButtonText}>
            📤  Share CV
          </Text>

        </Pressable>


        {/* ============================================
            FOOTER
        ============================================ */}

        <Text style={styles.footerText}>
          © 2026 Irfan Mubarok
        </Text>

        <Text style={styles.footerSubText}>
          React Native + Expo
        </Text>

      </View>
    );
  };


  // ====================================================
  // LOADING FONT
  // ====================================================

  if (!fontsLoaded) {

    return (

      <View style={styles.loadingScreen}>

        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Memuat font...
        </Text>

      </View>

    );
  }


  // ====================================================
  // INTRO SCREEN
  // ====================================================

  if (loading) {

    return (

      <View style={styles.introScreen}>

        <Animated.View
          style={{
            opacity: introOpacity,
            transform: [
              {
                scale: introScale,
              },
            ],
            alignItems: "center",
          }}
        >

          <View style={styles.introCircle}>

            <Text style={styles.introIcon}>
              💻
            </Text>

          </View>

          <Text style={styles.introTitle}>
            Irfan Mubarok
          </Text>

          <Text style={styles.introSubtitle}>
            Personal CV
          </Text>


          <ActivityIndicator
            size="large"
            style={styles.introLoading}
          />

        </Animated.View>

      </View>
    );
  }


  // ====================================================
  // MAIN APP
  // ====================================================

  return (

    <SafeAreaProvider>

      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: darkMode
              ? "#0F172A"
              : "#F3F4F6",
          },
        ]}
        edges={["top", "left", "right"]}
      >

        <StatusBar
          barStyle={
            darkMode
              ? "light-content"
              : "dark-content"
          }
          backgroundColor={
            darkMode
              ? "#0F172A"
              : "#F3F4F6"
          }
        />


        <LinearGradient
          colors={
            darkMode
              ? ["#0F172A", "#111827"]
              : ["#EEF2FF", "#F8FAFC"]
          }
          style={styles.background}
        >

          <SectionList

            sections={sections}

            keyExtractor={(item, index) =>
              `${item.title || "item"}-${index}`
            }

            renderItem={renderItem}

            renderSectionHeader={
              renderSectionHeader
            }

            ListHeaderComponent={
              renderHeader
            }

            ListFooterComponent={
              renderFooter
            }

            showsVerticalScrollIndicator={false}

            stickySectionHeadersEnabled={false}

            contentContainerStyle={
              styles.listContent
            }

          />

        </LinearGradient>


        {/* ============================================
            MODAL DETAIL PROFILE
        ============================================ */}

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setModalVisible(false)
          }
        >

          <View style={styles.modalBackground}>

            <View style={styles.modalCard}>

              <Image
                source={
                  isOnline
                    ? {
                        uri: PROFILE.avatar,
                      }
                    : PROFILE.avatarOffline
                }
                style={styles.modalAvatar}
              />


              <Text style={styles.modalName}>
                {PROFILE.name}
              </Text>

              <Text style={styles.modalTitle}>
                {PROFILE.title}
              </Text>


              <View style={styles.modalInfo}>

                <Text style={styles.modalInfoText}>
                  NIM: {PROFILE.nim}
                </Text>

                <Text style={styles.modalInfoText}>
                  📍 {PROFILE.location}
                </Text>

                <Text style={styles.modalInfoText}>
                  🎓 {PROFILE.school}
                </Text>

                <Text style={styles.modalInfoText}>
                  💻 {PROFILE.aspiration}
                </Text>

              </View>


              <Pressable
                onPress={() =>
                  setModalVisible(false)
                }
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed &&
                    styles.buttonPressed,
                ]}
              >

                <Text style={styles.closeButtonText}>
                  Tutup
                </Text>

              </Pressable>

            </View>

          </View>

        </Modal>

      </SafeAreaView>

    </SafeAreaProvider>
  );
}


// ======================================================
// STYLE
// ======================================================

const styles = StyleSheet.create({

  // ====================================================
  // GENERAL
  // ====================================================

  safeArea: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 30,
  },


  // ====================================================
  // INTRO
  // ====================================================

  introScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
  },

  introCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  introIcon: {
    fontSize: 45,
  },

  introTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
    color: "#FFFFFF",
  },

  introSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 2,
  },

  introLoading: {
    marginTop: 25,
  },


  // ====================================================
  // LOADING
  // ====================================================

  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 15,
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },

  statusText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },

  avatarBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 122,
    height: 122,
    borderRadius: 61,
    backgroundColor: "#FFFFFF",
  },

  headerName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    color: "#FFFFFF",
    marginTop: 15,
    textAlign: "center",
  },

  headerTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#E0E7FF",
    marginTop: 2,
  },

  headerLocation: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#E0E7FF",
    marginTop: 7,
  },

  detailButton: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  detailButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },


  // ====================================================
  // SECTION
  // ====================================================

  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  sectionHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },

  sectionHeaderText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },

  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#111827",
    marginBottom: 10,
  },


  // ====================================================
  // GLASS CARD
  // ====================================================

  glassCard: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },

  bioText: {
    fontFamily: "Poppins_400Regular",
    color: "#4B5563",
    lineHeight: 22,
    fontSize: 13,
  },

  aspirationText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#4F46E5",
    marginBottom: 8,
  },

  planText: {
    fontFamily: "Poppins_400Regular",
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 22,
  },


  // ====================================================
  // QUICK CARD
  // ====================================================

  quickScroll: {
    paddingBottom: 15,
  },

  quickCard: {
    width: 145,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    padding: 15,
    marginRight: 10,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  quickIcon: {
    fontSize: 25,
    marginBottom: 8,
  },

  quickLabel: {
    fontFamily: "Poppins_400Regular",
    color: "#6B7280",
    fontSize: 11,
  },

  quickValue: {
    fontFamily: "Poppins_600SemiBold",
    color: "#111827",
    fontSize: 13,
    marginTop: 2,
  },


  // ====================================================
  // SETTINGS
  // ====================================================

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  settingTitle: {
    fontFamily: "Poppins_600SemiBold",
    color: "#111827",
    fontSize: 13,
  },

  settingDescription: {
    fontFamily: "Poppins_400Regular",
    color: "#6B7280",
    fontSize: 10,
    marginTop: 2,
  },


  // ====================================================
  // SKILL
  // ====================================================

  skillsWrapper: {
    paddingLeft: 16,
    paddingBottom: 10,
  },

  skillList: {
    paddingRight: 16,
  },

  skillCard: {
    width: 170,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,

    elevation: 3,
  },

  skillTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  skillName: {
    fontFamily: "Poppins_600SemiBold",
    color: "#111827",
  },

  skillPercent: {
    fontFamily: "Poppins_600SemiBold",
    color: "#4F46E5",
  },

  progressBackground: {
    width: "100%",
    height: 7,
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  progressBar: {
    height: 7,
    borderRadius: 5,
    backgroundColor: "#4F46E5",
  },


  // ====================================================
  // HISTORY
  // ====================================================

  historyWrapper: {
    paddingHorizontal: 16,
  },

  timelineCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  timelineCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  timelineCircleText: {
    fontSize: 20,
  },

  timelineContent: {
    flex: 1,
  },

  timelineYear: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#4F46E5",
    marginBottom: 3,
  },

  timelineTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#111827",
  },

  timelineSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#4B5563",
    marginTop: 3,
  },

  timelineDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 18,
    marginTop: 6,
  },


  // ====================================================
  // CONTACT
  // ====================================================

  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },

  contactIcon: {
    fontSize: 23,
    width: 42,
  },

  contactLabel: {
    fontFamily: "Poppins_400Regular",
    color: "#6B7280",
    fontSize: 10,
  },

  contactValue: {
    fontFamily: "Poppins_500Medium",
    color: "#111827",
    fontSize: 12,
    marginTop: 1,
  },


  // ====================================================
  // MESSAGE
  // ====================================================

  messageInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    padding: 12,
    textAlignVertical: "top",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginBottom: 12,
    color: "#111827",
  },


  // ====================================================
  // SHARE
  // ====================================================

  shareButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 4,
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },

  buttonPressed: {
    opacity: 0.65,
    transform: [
      {
        scale: 0.97,
      },
    ],
  },


  // ====================================================
  // FOOTER TEXT
  // ====================================================

  footerText: {
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    color: "#6B7280",
    fontSize: 11,
    marginTop: 25,
  },

  footerSubText: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: "#9CA3AF",
    fontSize: 10,
    marginTop: 3,
    marginBottom: 20,
  },


  // ====================================================
  // MODAL
  // ====================================================

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,

    elevation: 10,
  },

  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  modalName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 21,
    color: "#111827",
  },

  modalTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  modalInfo: {
    width: "100%",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
  },

  modalInfoText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#374151",
    marginBottom: 8,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
  },

});