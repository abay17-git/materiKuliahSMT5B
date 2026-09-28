import React, { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  SectionList,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
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

/* =========================================================
   DATA CV
========================================================= */

const PROFILE = {
  name: "Irfan Mubarok",
  nim: "2488010075",
  title: "Web Developer",
  email: "irfanmubarok@mail.uinssc.ac.id",
  phone: "0838-0433-9441",
  location: "Gumulung Lebak - Greged",

  bio: "Mahasiswa Informatika yang sedang belajar Mata Kuliah Pemrograman Mobile oleh Bapak Firdaus",

  avatar:
    "https://avatars.githubusercontent.com/u/273804599?v=4&size=64",

  // Foto yang digunakan ketika offline
  avatarOffline: require("./assets/icon.png"),

  aspiration: "Website Development",

  plan:
    "Saya akan terus belajar dan mengembangkan kemampuan di bidang website development dengan mempelajari HTML, CSS, JavaScript, serta teknologi web lainnya. Saya juga akan memperbanyak latihan dan membuat berbagai proyek website untuk meningkatkan pengalaman dan kemampuan saya.",
};

/* =========================================================
   SKILLS
========================================================= */

const SKILLS = [
  {
    id: "1",
    name: "HTML",
    level: 85,
  },
  {
    id: "2",
    name: "CSS",
    level: 80,
  },
  {
    id: "3",
    name: "JavaScript",
    level: 75,
  },
  {
    id: "4",
    name: "PHP",
    level: 70,
  },
  {
    id: "5",
    name: "Figma",
    level: 75,
  },
];

/* =========================================================
   PENDIDIKAN & ORGANISASI
========================================================= */

const HISTORY = [
  {
    title: "Pendidikan",
    data: [
      {
        id: "edu1",
        type: "education",
        name: "UIN Siber Syekh Nurjati Cirebon",
        position: "Informatika",
        year: "2024 - Sekarang",
        description:
          "Sedang menempuh pendidikan S1 Informatika di UIN Siber Syekh Nurjati Cirebon",
      },
    ],
  },

  {
    title: "Pengalaman Organisasi",
    data: [
      {
        id: "org1",
        type: "organization",
        name: "Himpunan Mahasiswa Informatika",
        position:
          "Kepala Department of Information and Communcations",
        year: "2026/2027",
        description:
          "Bertanggung jawab dalam mengelola komunikasi dan penyampaian informasi organisasi serta membantu mengembangkan media informasi Himpunan Mahasiswa Informatika.",
      },
    ],
  },
];

/* =========================================================
   KOMPONEN SKILL CARD
========================================================= */

function SkillCard({ item, index }) {
  const widthAnimation = useRef(
    new Animated.Value(0)
  ).current;

  const fadeAnimation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        delay: index * 120,
        useNativeDriver: true,
      }),

      Animated.timing(widthAnimation, {
        toValue: item.level,
        duration: 900,
        delay: index * 120,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skillCard,
        {
          opacity: fadeAnimation,

          transform: [
            {
              translateY: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.skillTop}>
        <Text style={styles.skillName}>
          {item.name}
        </Text>

        <Text style={styles.skillPercentage}>
          {item.level}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

/* =========================================================
   KOMPONEN TIMELINE CARD
========================================================= */

function TimelineCard({ item }) {
  return (
    <View style={styles.timelineCard}>
      <View style={styles.timelineDot} />

      <View style={styles.timelineContent}>
        <Text style={styles.timelineYear}>
          {item.year}
        </Text>

        <Text style={styles.timelineName}>
          {item.name}
        </Text>

        <Text style={styles.timelinePosition}>
          {item.position}
        </Text>

        <Text style={styles.timelineDescription}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isOnline, setIsOnline] = useState(true);

  const [showContact, setShowContact] =
    useState(true);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [showIntro, setShowIntro] =
    useState(true);

  /* =====================================================
     ANIMASI INTRO
  ===================================================== */

  const introOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const introScale = useRef(
    new Animated.Value(1)
  ).current;

  /* =====================================================
     ANIMASI HEADER
  ===================================================== */

  const headerOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const headerScale = useRef(
    new Animated.Value(0.85)
  ).current;

  /* =====================================================
     INTRO
  ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(introOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(introScale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowIntro(false);

        Animated.parallel([
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),

          Animated.spring(headerScale, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     CEK INTERNET
  ===================================================== */

  useEffect(() => {
    const unsubscribe =
      NetInfo.addEventListener((state) => {
        setIsOnline(
          Boolean(state.isConnected)
        );
      });

    return unsubscribe;
  }, []);

  /* =====================================================
     LOADING FONT
  ===================================================== */

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          size="large"
          color="#6366F1"
        />

        <Text style={styles.loadingText}>
          Memuat CV...
        </Text>
      </View>
    );
  }

  /* =====================================================
     SHARE CV
  ===================================================== */

  const shareCV = async () => {
    const text = `
CV - ${PROFILE.name}

Nama:
${PROFILE.name}

NIM:
${PROFILE.nim}

Profesi:
${PROFILE.title}

Pendidikan:
UIN Siber Syekh Nurjati Cirebon
Informatika
2024 - Sekarang

Cita-cita:
${PROFILE.aspiration}

Skills:
HTML, CSS, JavaScript, PHP, Figma

Email:
${PROFILE.email}

Telepon:
${PROFILE.phone}

Lokasi:
${PROFILE.location}
`;

    try {
      if (Platform.OS === "web") {
        if (navigator.share) {
          await navigator.share({
            title: `CV ${PROFILE.name}`,
            text: text,
          });
        } else {
          Alert.alert(
            "Share CV",
            "Fitur share tidak tersedia pada browser ini."
          );
        }

        return;
      }

      await Share.share({
        message: text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================================
     HEADER
  ===================================================== */

  const renderHeader = () => {
    return (
      <>
        {/* HEADER PROFILE */}

        <Animated.View
          style={[
            styles.headerWrapper,

            {
              opacity: headerOpacity,

              transform: [
                {
                  scale: headerScale,
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              "#6366F1",
              "#8B5CF6",
              "#A855F7",
            ]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            style={styles.header}
          >
            {/* STATUS */}

            <View style={styles.statusBadge}>
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

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setModalVisible(true)
              }
            >
              <Animated.View
                style={styles.avatarWrapper}
              >
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

                <View
                  style={styles.avatarRing}
                />
              </Animated.View>
            </TouchableOpacity>

            <Text style={styles.headerName}>
              {PROFILE.name}
            </Text>

            <Text style={styles.headerTitle}>
              {PROFILE.title}
            </Text>

            <Text style={styles.headerLocation}>
              📍 {PROFILE.location}
            </Text>

            {/* DETAIL BUTTON */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setModalVisible(true)
              }
              style={styles.detailButton}
            >
              <Text
                style={styles.detailButtonText}
              >
                Lihat Detail
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* TENTANG SAYA */}

        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>
            Tentang Saya
          </Text>

          <Text style={styles.bio}>
            {PROFILE.bio}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.smallTitle}>
            Cita-cita
          </Text>

          <Text style={styles.aspiration}>
            {PROFILE.aspiration}
          </Text>

          <Text style={styles.smallTitle}>
            Rencana Menggapai Cita-cita
          </Text>

          <Text style={styles.plan}>
            {PROFILE.plan}
          </Text>
        </View>

        {/* SKILLS */}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Skills
          </Text>

          <FlatList
            data={SKILLS}
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            keyExtractor={(item) =>
              item.id
            }
            renderItem={({
              item,
              index,
            }) => (
              <SkillCard
                item={item}
                index={index}
              />
            )}
            contentContainerStyle={
              styles.skillList
            }
          />
        </View>
      </>
    );
  };

  /* =====================================================
     FOOTER
  ===================================================== */

  const renderFooter = () => {
    return (
      <>
        {/* KONTAK */}

        <View style={styles.glassCard}>
          <View style={styles.contactHeader}>
            <Text style={styles.sectionTitle}>
              Kontak
            </Text>

            <Switch
              value={showContact}
              onValueChange={
                setShowContact
              }
              trackColor={{
                false: "#CBD5E1",
                true: "#A78BFA",
              }}
              thumbColor={
                showContact
                  ? "#6366F1"
                  : "#F8FAFC"
              }
            />
          </View>

          {showContact ? (
            <View>
              {/* EMAIL */}

              <View style={styles.contactItem}>
                <Text
                  style={styles.contactIcon}
                >
                  ✉️
                </Text>

                <View>
                  <Text
                    style={styles.contactLabel}
                  >
                    Email
                  </Text>

                  <Text
                    style={styles.contactValue}
                  >
                    {PROFILE.email}
                  </Text>
                </View>
              </View>

              {/* TELEPON */}

              <View style={styles.contactItem}>
                <Text
                  style={styles.contactIcon}
                >
                  📱
                </Text>

                <View>
                  <Text
                    style={styles.contactLabel}
                  >
                    Telepon
                  </Text>

                  <Text
                    style={styles.contactValue}
                  >
                    {PROFILE.phone}
                  </Text>
                </View>
              </View>

              {/* NIM */}

              <View style={styles.contactItem}>
                <Text
                  style={styles.contactIcon}
                >
                  🎓
                </Text>

                <View>
                  <Text
                    style={styles.contactLabel}
                  >
                    NIM
                  </Text>

                  <Text
                    style={styles.contactValue}
                  >
                    {PROFILE.nim}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.hiddenText}>
              Informasi kontak disembunyikan.
            </Text>
          )}
        </View>

        {/* SHARE BUTTON */}

        <Pressable
          onPress={shareCV}
          style={({ pressed }) => [
            styles.shareButton,

            {
              opacity: pressed
                ? 0.75
                : 1,

              transform: [
                {
                  scale: pressed
                    ? 0.96
                    : 1,
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              "#6366F1",
              "#8B5CF6",
            ]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.shareGradient}
          >
            <Text style={styles.shareIcon}>
              ↗
            </Text>

            <Text style={styles.shareText}>
              Share CV
            </Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.footerText}>
          Dibuat menggunakan React Native + Expo
        </Text>
      </>
    );
  };

  /* =====================================================
     SECTION LIST
  ===================================================== */

  const sections = [
    {
      title: HISTORY[0].title,
      data: HISTORY[0].data,
    },

    {
      title: HISTORY[1].title,
      data: HISTORY[1].data,
    },
  ];

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6366F1"
        />

        {/* =================================================
            ANIMATED INTRO
        ================================================= */}

        {showIntro && (
          <Animated.View
            style={[
              styles.introScreen,

              {
                opacity: introOpacity,

                transform: [
                  {
                    scale: introScale,
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={[
                "#4F46E5",
                "#7C3AED",
                "#A855F7",
              ]}
              style={styles.introGradient}
            >
              <Animated.View
                style={[
                  styles.introLogo,

                  {
                    transform: [
                      {
                        scale:
                          introScale.interpolate(
                            {
                              inputRange: [
                                1,
                                1.1,
                              ],

                              outputRange: [
                                1,
                                1.15,
                              ],
                            }
                          ),
                      },
                    ],
                  },
                ]}
              >
                <Text
                  style={
                    styles.introLogoText
                  }
                >
                  IM
                </Text>
              </Animated.View>

              <Text
                style={styles.introTitle}
              >
                Irfan Mubarok
              </Text>

              <Text
                style={
                  styles.introSubtitle
                }
              >
                Web Developer
              </Text>

              <ActivityIndicator
                size="small"
                color="#FFFFFF"
                style={
                  styles.introLoader
                }
              />
            </LinearGradient>
          </Animated.View>
        )}

        {/* =================================================
            MAIN CV
        ================================================= */}

        <SafeAreaView
          style={styles.safeArea}
          edges={[
            "top",
            "left",
            "right",
          ]}
        >
          <SectionList
            sections={sections}
            keyExtractor={(item) =>
              item.id
            }
            showsVerticalScrollIndicator={
              false
            }
            stickySectionHeadersEnabled={
              false
            }
            ListHeaderComponent={
              renderHeader
            }
            renderSectionHeader={({
              section,
            }) => (
              <View
                style={
                  styles.sectionHeader
                }
              >
                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  {section.title}
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TimelineCard
                item={item}
              />
            )}
            ListFooterComponent={
              renderFooter
            }
            contentContainerStyle={
              styles.container
            }
          />
        </SafeAreaView>

        {/* =================================================
            MODAL DETAIL
        ================================================= */}

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setModalVisible(false)
          }
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() =>
              setModalVisible(false)
            }
          >
            <Pressable
              style={styles.modalCard}
              onPress={(event) =>
                event.stopPropagation()
              }
            >
              <Image
                source={
                  isOnline
                    ? {
                        uri: PROFILE.avatar,
                      }
                    : PROFILE.avatarOffline
                }
                style={
                  styles.modalAvatar
                }
              />

              <Text
                style={styles.modalName}
              >
                {PROFILE.name}
              </Text>

              <Text
                style={styles.modalTitle}
              >
                {PROFILE.title}
              </Text>

              <View
                style={
                  styles.modalDivider
                }
              />

              <Text
                style={styles.modalInfo}
              >
                NIM: {PROFILE.nim}
              </Text>

              <Text
                style={styles.modalInfo}
              >
                Informatika
              </Text>

              <Text
                style={styles.modalInfo}
              >
                UIN Siber Syekh Nurjati
                Cirebon
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setModalVisible(false)
                }
                style={
                  styles.closeButton
                }
              >
                <Text
                  style={
                    styles.closeButtonText
                  }
                >
                  Tutup
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}

/* =========================================================
   STYLE
========================================================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  safeArea: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  /* =====================================================
     INTRO
  ===================================================== */

  introScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },

  introGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  introLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,

    backgroundColor:
      "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.35)",

    marginBottom: 20,
  },

  introLogoText: {
    color: "#FFFFFF",
    fontFamily:
      "Poppins_700Bold",
    fontSize: 32,
  },

  introTitle: {
    color: "#FFFFFF",
    fontFamily:
      "Poppins_700Bold",
    fontSize: 27,
  },

  introSubtitle: {
    color:
      "rgba(255,255,255,0.85)",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 14,
    marginTop: 3,
  },

  introLoader: {
    marginTop: 25,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  headerWrapper: {
    marginTop: 10,
    marginBottom: 18,
    borderRadius: 30,
    overflow: "hidden",
  },

  header: {
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },

  statusBadge: {
    alignSelf: "flex-end",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor:
      "rgba(255,255,255,0.16)",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 20,
    marginBottom: 5,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginRight: 6,
  },

  statusText: {
    color: "#FFFFFF",
    fontFamily:
      "Poppins_500Medium",
    fontSize: 10,
  },

  avatarWrapper: {
    width: 125,
    height: 125,
    borderRadius: 65,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 5,
    marginBottom: 15,
  },

  avatar: {
    width: 108,
    height: 108,
    borderRadius: 55,
    backgroundColor: "#E2E8F0",
  },

  avatarRing: {
    position: "absolute",

    width: 122,
    height: 122,
    borderRadius: 62,

    borderWidth: 2,
    borderColor:
      "rgba(255,255,255,0.45)",
  },

  headerName: {
    color: "#FFFFFF",
    fontFamily:
      "Poppins_700Bold",
    fontSize: 25,
  },

  headerTitle: {
    color:
      "rgba(255,255,255,0.9)",

    fontFamily:
      "Poppins_500Medium",

    fontSize: 14,
    marginTop: 2,
  },

  headerLocation: {
    color:
      "rgba(255,255,255,0.8)",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 11,
    marginTop: 8,
  },

  detailButton: {
    marginTop: 17,

    paddingHorizontal: 20,
    paddingVertical: 9,

    backgroundColor:
      "rgba(255,255,255,0.17)",

    borderRadius: 20,

    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.3)",
  },

  detailButtonText: {
    color: "#FFFFFF",

    fontFamily:
      "Poppins_500Medium",

    fontSize: 12,
  },

  /* =====================================================
     CARD
  ===================================================== */

  glassCard: {
    backgroundColor:
      "rgba(255,255,255,0.92)",

    borderRadius: 24,

    padding: 20,
    marginBottom: 18,

    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.8)",

    shadowColor: "#64748B",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.12,
    shadowRadius: 18,

    elevation: 5,
  },

  sectionContainer: {
    marginBottom: 18,
  },

  sectionHeader: {
    marginTop: 5,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#1E293B",

    fontFamily:
      "Poppins_700Bold",

    fontSize: 18,
  },

  bio: {
    color: "#64748B",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 12,
    lineHeight: 21,

    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 17,
  },

  smallTitle: {
    color: "#475569",

    fontFamily:
      "Poppins_600SemiBold",

    fontSize: 12,

    marginTop: 8,
    marginBottom: 4,
  },

  aspiration: {
    color: "#6366F1",

    fontFamily:
      "Poppins_700Bold",

    fontSize: 17,
    marginBottom: 10,
  },

  plan: {
    color: "#64748B",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 11,
    lineHeight: 19,
  },

  /* =====================================================
     SKILL
  ===================================================== */

  skillList: {
    paddingVertical: 5,
    paddingRight: 10,
  },

  skillCard: {
    width: 155,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 15,
    marginRight: 12,

    shadowColor: "#64748B",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 3,
  },

  skillTop: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 12,
  },

  skillName: {
    color: "#334155",

    fontFamily:
      "Poppins_600SemiBold",

    fontSize: 13,
  },

  skillPercentage: {
    color: "#6366F1",

    fontFamily:
      "Poppins_700Bold",

    fontSize: 11,
  },

  progressBackground: {
    width: "100%",
    height: 7,

    borderRadius: 10,

    backgroundColor: "#E2E8F0",

    overflow: "hidden",
  },

  progressBar: {
    height: "100%",

    borderRadius: 10,

    backgroundColor: "#6366F1",
  },

  /* =====================================================
     TIMELINE
  ===================================================== */

  timelineCard: {
    flexDirection: "row",

    marginBottom: 14,
    paddingLeft: 4,
  },

  timelineDot: {
    width: 12,
    height: 12,

    borderRadius: 8,

    backgroundColor: "#6366F1",

    marginTop: 7,
    marginRight: 12,
  },

  timelineContent: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 17,

    shadowColor: "#64748B",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 2,
  },

  timelineYear: {
    color: "#6366F1",

    fontFamily:
      "Poppins_600SemiBold",

    fontSize: 11,

    marginBottom: 5,
  },

  timelineName: {
    color: "#1E293B",

    fontFamily:
      "Poppins_700Bold",

    fontSize: 14,
  },

  timelinePosition: {
    color: "#64748B",

    fontFamily:
      "Poppins_500Medium",

    fontSize: 11,

    marginTop: 2,
  },

  timelineDescription: {
    color: "#64748B",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 11,

    lineHeight: 18,

    marginTop: 9,
  },

  /* =====================================================
     CONTACT
  ===================================================== */

  contactHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  contactItem: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 17,
  },

  contactIcon: {
    fontSize: 20,
    marginRight: 13,
  },

  contactLabel: {
    color: "#94A3B8",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 9,
  },

  contactValue: {
    color: "#334155",

    fontFamily:
      "Poppins_500Medium",

    fontSize: 11,

    marginTop: 1,
  },

  hiddenText: {
    color: "#94A3B8",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 11,

    marginTop: 10,
  },

  /* =====================================================
     SHARE
  ===================================================== */

  shareButton: {
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 4,
  },

  shareGradient: {
    height: 54,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  shareIcon: {
    color: "#FFFFFF",

    fontSize: 21,

    fontFamily:
      "Poppins_700Bold",

    marginRight: 8,
  },

  shareText: {
    color: "#FFFFFF",

    fontFamily:
      "Poppins_600SemiBold",

    fontSize: 14,
  },

  footerText: {
    textAlign: "center",

    color: "#94A3B8",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 9,

    marginTop: 18,
  },

  /* =====================================================
     MODAL
  ===================================================== */

  modalOverlay: {
    flex: 1,

    backgroundColor:
      "rgba(15,23,42,0.65)",

    justifyContent: "center",
    alignItems: "center",

    padding: 25,
  },

  modalCard: {
    width: "100%",
    maxWidth: 380,

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    padding: 25,

    alignItems: "center",
  },

  modalAvatar: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: "#E2E8F0",
  },

  modalName: {
    color: "#1E293B",

    fontFamily:
      "Poppins_700Bold",

    fontSize: 21,

    marginTop: 15,
  },

  modalTitle: {
    color: "#6366F1",

    fontFamily:
      "Poppins_500Medium",

    fontSize: 12,
  },

  modalDivider: {
    width: "100%",
    height: 1,

    backgroundColor: "#E2E8F0",

    marginVertical: 18,
  },

  modalInfo: {
    color: "#64748B",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 11,

    marginBottom: 5,

    textAlign: "center",
  },

  closeButton: {
    backgroundColor: "#6366F1",

    paddingHorizontal: 30,
    paddingVertical: 10,

    borderRadius: 20,

    marginTop: 17,
  },

  closeButtonText: {
    color: "#FFFFFF",

    fontFamily:
      "Poppins_600SemiBold",

    fontSize: 12,
  },

  /* =====================================================
     LOADING
  ===================================================== */

  loadingScreen: {
    flex: 1,

    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#64748B",

    fontFamily:
      "Poppins_400Regular",

    fontSize: 12,

    marginTop: 10,
  },
});