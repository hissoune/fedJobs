import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { logoutAction } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useUpdate } from "@/hooks/auth/useUpdate";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();



  const {
    userToUpdate,
    loading,
    oldPassword,
    isEditing,
    setIsEditing,
    setName,
    setEmail,
    setPassword,
    setAge,
    setOldPassword,
    handleSubmit,
    pickImage,
    reset,
  } = useUpdate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap();
      router.replace("/(auth)/login");
    } catch {
      Alert.alert(
        "Logout failed",
        "Something went wrong. Please try again."
      );
    }
  };

  if (!userToUpdate) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const avatarSource = userToUpdate.imageUrl
    ? { uri: userToUpdate.imageUrl }
    : require("@/assets/images/avatar.png");

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await handleSubmit();
      setIsEditing(false);
    } catch (error) {
      Alert.alert(
        "Update failed",
        "Something went wrong while updating your profile."
      );
    }
  };

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

        {isEditing ? (
          <Pressable
            onPress={handleCancel}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.cancelText}>
              Cancel
            </ThemedText>
          </Pressable>
        ) : null}
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
            style={({ pressed }) => [
              styles.cameraButton,
              pressed && styles.pressed,
            ]}
            onPress={pickImage}
          >
            <ThemedText style={styles.cameraIcon}>
              +
            </ThemedText>
          </Pressable>
        </View>

        <ThemedText type="title" style={styles.name}>
          {userToUpdate.name}
        </ThemedText>

        <ThemedText
          themeColor="textSecondary"
          style={styles.email}
        >
          {userToUpdate.email}
        </ThemedText>
      </View>

      {isEditing ? (
        <>
          {/* Edit information */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Personal information
            </ThemedText>

            <View style={styles.formContainer}>
              <InputField
                label="Full name"
                value={userToUpdate.name || ""}
                onChangeText={setName}
                placeholder="Your name"
              />

              <InputField
                label="Email"
                value={userToUpdate.email || ""}
                onChangeText={setEmail}
                placeholder="Your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <InputField
                label="Age"
                value={String(userToUpdate.age)}
                onChangeText={(value) =>
                  setAge(Number(value))
                }
                placeholder="Your age"
                keyboardType="numeric"
                last
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Change password
            </ThemedText>

            <View style={styles.formContainer}>
              <InputField
                label="Current password"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter current password"
                secureTextEntry
              />

              <InputField
                label="New password"
                value={userToUpdate.password || ''}
                onChangeText={setPassword}
                placeholder="Enter new password"
                secureTextEntry
                last
              />
            </View>
          </View>

          {/* Save */}
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ThemedText style={styles.saveText}>
                Save changes
              </ThemedText>
            )}
          </Pressable>
        </>
      ) : (
        <>
          {/* Personal information */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Personal information
            </ThemedText>

            <View style={styles.infoContainer}>
              <InfoRow
                label="Full name"
                value={userToUpdate.name || ""}
              />

              <InfoRow
                label="Age"
                value={`${userToUpdate.age} years`}
              />

              <InfoRow
                label="Email"
                value={userToUpdate.email || ""}
                last
              />
            </View>
          </View>

          {/* Account */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Account
            </ThemedText>

            <View style={styles.menuContainer}>
              <MenuItem
                title="Edit profile"
                subtitle="Update your personal information"
                onPress={()=>setIsEditing(true)}
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
              <ThemedText style={styles.logoutText}>
                Log out
              </ThemedText>
            )}
          </Pressable>
        </>
      )}

      <ThemedText style={styles.version}>
        FedOps
      </ThemedText>
    </ScrollView>
  );
}

/* -------------------------------- */
/* Input                            */
/* -------------------------------- */

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  last = false,
  ...props
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  last?: boolean;
  [key: string]: any;
}) {
  return (
    <View
      style={[
        styles.inputRow,
        !last && styles.inputRowBorder,
      ]}
    >
      <ThemedText
        themeColor="textSecondary"
        style={styles.inputLabel}
      >
        {label}
      </ThemedText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        style={styles.input}
        {...props}
      />
    </View>
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
    <View
      style={[
        styles.infoRow,
        !last && styles.infoRowBorder,
      ]}
    >
      <ThemedText
        themeColor="textSecondary"
        style={styles.infoLabel}
      >
        {label}
      </ThemedText>

      <ThemedText style={styles.infoValue}>
        {value}
      </ThemedText>
    </View>
  );
}

/* -------------------------------- */
/* Menu item                        */
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
        <ThemedText style={styles.menuTitle}>
          {title}
        </ThemedText>

        <ThemedText
          themeColor="textSecondary"
          style={styles.menuSubtitle}
        >
          {subtitle}
        </ThemedText>
      </View>

      <ThemedText style={styles.chevron}>
        ›
      </ThemedText>
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
  },

  /* Header */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },

  cancelText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2563eb",
    borderWidth: 3,
    borderColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraIcon: {
    color: "#ffffff",
    fontSize: 21,
    lineHeight: 21,
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
  },

  /* Information */

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
    borderBottomColor: "#ffffff30",
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

  /* Form */

  formContainer: {
    backgroundColor: "#325E6A",
    borderRadius: 25,
    paddingHorizontal: 16,
  },

  inputRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  inputRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ffffff30",
  },

  inputLabel: {
    width: 100,
    fontSize: 14,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    textAlign: "right",
    paddingVertical: 8,
  },

  /* Menu */

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
    borderBottomColor: "#ffffff30",
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

  /* Save */

  saveButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  saveText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
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