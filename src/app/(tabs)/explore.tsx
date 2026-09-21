import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { logoutAction } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, loading } = useSelector((state: RootState) => state.auth);
  const handleChangeImage = async ()=> {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const uri = result.assets[0].uri;
  
      
      }
    };
  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap();
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Logout failed", "Something went wrong. Please try again.");
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const avatarSource = user.imageUrl
    ? { uri: user.imageUrl }
    : require("@/assets/images/avatar.png");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Profile
        </ThemedText>
      </View>

      {/* Profile identity */}
      <View style={styles.identity}>
        <View style={styles.avatarWrapper}>
          <Image
            source={avatarSource}
            style={styles.avatar}
            contentFit="cover"
          />

          <Pressable
            style={styles.cameraButton}
             onPress={() => handleChangeImage()}
          >
            <ThemedText style={styles.cameraIcon}>+</ThemedText>
          </Pressable>
        </View>

        <ThemedText type="title" style={styles.name}>
          {user.name}
        </ThemedText>

        <ThemedText themeColor="textSecondary" style={styles.email}>
          {user.email}
        </ThemedText>
      </View>

      {/* Personal information */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Personal information
        </ThemedText>

        <View style={styles.infoContainer}>
          <InfoRow label="Full name" value={user.name} />

          <InfoRow label="Age" value={`${user.age} years`} />

          <InfoRow label="Email" value={user.email} last />
        </View>
      </ThemedView>

      {/* Account */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>

        <View style={styles.menuContainer}>
          <MenuItem
            title="Edit profile"
            subtitle="Update your personal information"
            onPress={() => {}}
          />

          <MenuItem
            title="Notifications"
            subtitle="Manage your notifications"
            onPress={() => {}}
          />

          <MenuItem
            title="Privacy"
            subtitle="Manage your privacy settings"
            onPress={() => {}}
            last
          />
        </View>
      </View>

      {/* Logout */}
      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.pressed,
        ]}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#dc2626" />
        ) : (
          <ThemedText style={styles.logoutText}>Log out</ThemedText>
        )}
      </Pressable>

      <ThemedText style={styles.version}>FedOps</ThemedText>
    </ScrollView>
  );
}

/* -------------------------------- */
/* Info row                         */
/* -------------------------------- */

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
        {label}
      </ThemedText>

      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

/* -------------------------------- */
/* Menu item                       */
/* -------------------------------- */

function MenuItem({
  title,
  subtitle,
  onPress,
  last = false,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        !last && styles.menuItemBorder,
        pressed && styles.menuPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.menuText}>
        <ThemedText style={styles.menuTitle}>{title}</ThemedText>

        <ThemedText themeColor="textSecondary" style={styles.menuSubtitle}>
          {subtitle}
        </ThemedText>
      </View>

      <ThemedText style={styles.chevron}>›</ThemedText>
    </Pressable>
  );
}

/* -------------------------------- */
/* Styles                           */
/* -------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },

  /* Header */

  header: {
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  /* Identity */

  identity: {
    alignItems: "center",
    marginBottom: 38,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#e2e8f0",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563eb",
    borderWidth: 3,
    borderColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraIcon: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },

  email: {
    fontSize: 14,
  },

  /* Sections */

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#334155",
  },

  /* Personal info */

  infoContainer: {
    backgroundColor: "#325E6A",
    borderRadius: 25,
    paddingHorizontal: 16,
  },

  infoRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },

  infoLabel: {
    fontSize: 14,
  },

  infoValue: {
    maxWidth: "65%",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },

  /* Account menu */

  menuContainer: {
    backgroundColor: "#325E6A",
    borderRadius: 25,
    paddingHorizontal: 16,
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },

  menuPressed: {
    opacity: 0.55,
  },

  menuText: {
    flex: 1,
    paddingRight: 15,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  menuSubtitle: {
    fontSize: 12,
  },

  chevron: {
    fontSize: 28,
    lineHeight: 28,
    color: "#94a3b8",
    fontWeight: "300",
  },

  /* Logout */

  logoutButton: {
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fffafa",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  logoutText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.65,
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 22,
  },
});
