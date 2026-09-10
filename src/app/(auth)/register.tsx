
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

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { registerAction } from '@/redux/slices/authSlice';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check your passwords.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Password too short',
        'Your password must be at least 6 characters.'
      );
      return;
    }

    try {
      await dispatch(
        registerAction({
          name,
          email,
          password,
        })
      ).unwrap();

      router.replace('/(tabs)');
    } catch {
      Alert.alert(
        'Registration failed',
        'Something went wrong. Please try again.'
      );
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
            <View style={styles.form}>

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>
                  Create account
                </Text>

                <Text style={styles.subtitle}>
                  Join us and start your journey today.
                </Text>
              </View>

              {/* Name */}
              <View style={styles.field}>
                <Text style={styles.label}>Name</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="rgba(255,255,255,0.65)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              {/* Email */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(255,255,255,0.65)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password */}
              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="rgba(255,255,255,0.65)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Confirm password */}
              <View style={styles.field}>
                <Text style={styles.label}>Confirm password</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Repeat your password"
                  placeholderTextColor="rgba(255,255,255,0.65)"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              {/* Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>
                  Create account
                </Text>
              </Pressable>

              {/* Login */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already have an account?
                </Text>

                <Pressable
                  onPress={() => router.push('/login')}
                >
                  <Text style={styles.loginLink}>
                    {' '}Log in
                  </Text>
                </Pressable>
              </View>

            </View>
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
    maxWidth: 460,
    alignSelf: 'center',

    padding: 26,
    borderRadius: 24,

    backgroundColor: 'rgba(30, 20, 35, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.75)',
  },

  field: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 12,

    paddingHorizontal: 16,

    fontSize: 16,
    color: '#fff',

    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  button: {
    height: 54,
    borderRadius: 13,

    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 8,
    marginBottom: 22,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.985 }],
  },

  buttonText: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '700',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },

  loginLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

