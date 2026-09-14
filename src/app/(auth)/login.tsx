import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { loginAction } from '@/redux/slices/authSlice';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    try {
      await dispatch(loginAction({ email, password })).unwrap();
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'Invalid email or password.');
    }
  }

  return (
    <View style={styles.container}>

      {/* Background */}
      <Image
        source={{
          uri: 'https://images.openai.com/static-rsc-4/X7Ms8v1P7oO8OMG3URYtKLyCND-Tdhw3CQItqvObLTp02gcdmi9IME3S1Uh5JvMFRa1CKTL8jfRevD6uzPwEO30ISa7xPHPNHhRasmIAWFvYjir2Ei90ZunPq91WNCUaegHazxSiF5wnEd-lI5KL6Um9emVxCRLHQ59ZhAnS2jS0uqzkGq5tjbIH4Yu8hujX?purpose=fullsize',
        }}
        style={styles.background}
        contentFit="cover"
      />

      {/* Dark overlay */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
      <ThemedView style={styles.form}>

        <Text style={styles.subtitle}>
          Login to your account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </Pressable>
      </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  background: {
    ...StyleSheet.absoluteFill,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
   safeArea: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
    
  form: {
    width: '100%',
    borderRadius: 10,
    padding: 24,
    backgroundColor: 'rgba(125, 100, 140, 0.5)',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },

  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  registerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },

  registerLink: {
    color: '#111',
    fontWeight: '600',
  },
  backImage: {
    width: '200%',
    height: '200%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    
  },
});