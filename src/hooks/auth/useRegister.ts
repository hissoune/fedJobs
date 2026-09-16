import { User } from '@/types';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { registerAction } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'expo-router';

export const useRegister = () => {
      const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    age: 0,
    imageUrl: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const updateField = <K extends keyof User>(
    field: K,
    value: User[K],
  ) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setName = (name: string) => {
    updateField('name', name);
  };

  const setEmail = (email: string) => {
    updateField('email', email);

  };

  const setPassword = (password: string) => {
    updateField('password', password);

  };

  const setAge = (age: number) => {
    updateField('age', age);

  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateField('imageUrl', uri);
    
    }
  };

  const reset = () => {
    setUser({
      name: '',
      email: '',
      password: '',
      age: 0,
      imageUrl: '',
    });

    setConfirmPassword('');
  };

const handleSubmit = async () => {
  if (
    !user.name ||
    !user.email ||
    !user.password ||
    !confirmPassword
  ) {
    Alert.alert('Missing information', 'Please fill in all fields.');
    return;
  }


  if (user.password !== confirmPassword) {
    Alert.alert(
      'Passwords do not match',
      'Please check your passwords.',
    );
    return;
  }

  if (user.password.length < 6) {
    Alert.alert(
      'Password too short',
      'Your password must be at least 6 characters.',
    );
    return;
  }
console.log(user);

const formData = new FormData();
 formData.append('name', user.name);
  formData.append('email', user.email);
   formData.append('password', user.password);
    formData.append('age', String(user.age));
    
     if (user.imageUrl) { formData.append( 'file', { uri: user.imageUrl, name: 'profile.jpg', type: 'image/jpeg', } as any, ); }

  try {
    await dispatch(
      registerAction(formData),
    ).unwrap();

    router.replace('/(tabs)');
  } catch (error) {
    Alert.alert(
      'Registration failed',
      'Something went wrong. Please try again.',
    );
  }
};

  return {
    user,
    confirmPassword,

    setName,
    setEmail,
    setPassword,
    setAge,
    setConfirmPassword,
    handleSubmit,
    pickImage,
    reset,
  };
};