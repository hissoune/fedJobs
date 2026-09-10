import { Image } from 'expo-image';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logoutAction } from '@/redux/slices/authSlice';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
 const  handleLogout =async ()=>{
  try{
       await dispatch(logoutAction())
      router.replace("/(auth)/login")
  }catch(err){

  }
  }
  
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 100,
        },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText>log out </ThemedText>
        </Pressable>
      </View>

      <ThemedView style={styles.profileCard}>
        <Image
          source={require('@/assets/images/avatar.png')}
          style={styles.avatar}
          contentFit="cover"
        />

        <ThemedText type="title">Khalid</ThemedText>

        <ThemedText themeColor="textSecondary">
          @khalid
        </ThemedText>

        <ThemedText themeColor="textSecondary">
          Software developer
        </ThemedText>
      </ThemedView>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <ThemedText type="subtitle">24</ThemedText>
          <ThemedText themeColor="textSecondary">
            Posts
          </ThemedText>
        </View>

        <View style={styles.stat}>
          <ThemedText type="subtitle">1.2K</ThemedText>
          <ThemedText themeColor="textSecondary">
            Followers
          </ThemedText>
        </View>

        <View style={styles.stat}>
          <ThemedText type="subtitle">340</ThemedText>
          <ThemedText themeColor="textSecondary">
            Following
          </ThemedText>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={styles.button}>
          <ThemedText>Edit profile</ThemedText>
        </Pressable>

        <Pressable style={styles.button}>
          <ThemedText>Share profile</ThemedText>
        </Pressable>
      </View>

      {/* Menu */}
      <ThemedView style={styles.menu}>
        <Pressable style={styles.menuItem}>
          <ThemedText>Account</ThemedText>
          <ThemedText>›</ThemedText>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <ThemedText>Notifications</ThemedText>
          <ThemedText>›</ThemedText>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <ThemedText>Privacy</ThemedText>
          <ThemedText>›</ThemedText>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <ThemedText>Help</ThemedText>
          <ThemedText>›</ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  profileCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
  },

  stat: {
    alignItems: 'center',
    gap: 4,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
  },

  menu: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e06161',
  },
});