import { registerAction, update } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { User } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [userToUpdate, setUser] = useState<Partial<User>>({
    name: "",
    email: "",
    password: "",
    age: 0,
    imageUrl: "",
  });

  useEffect(()=>{
    if (!user) return
    setUser((prev)=>{
        return{
        ...prev,
        name: user.name,
        email: user.email,
        age: user.age,
        imageUrl: user.imageUrl,

        }
        
    })

  },[user])

  const [oldPassword, setOldPassword] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateField = <K extends keyof User>(field: K, value: User[K]) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setName = (name: string) => {
    updateField("name", name);
  };

  const setEmail = (email: string) => {
    updateField("email", email);
  };

  const setPassword = (password: string) => {
    updateField("password", password);
  };

  const setAge = (age: number) => {
    updateField("age", age);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateField("imageUrl", uri);
    }
  };

  const reset = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      age: 0,
      imageUrl: "",
    });

    setOldPassword("");
  };

  const handleSubmit = async () => {
    if (userToUpdate.password && !oldPassword) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    // if (userToUpdate.password !== oldPassword) {
    //   Alert.alert("Passwords do not match", "Please check your passwords.");
    //   return;
    // }

    if (userToUpdate.password && userToUpdate.password.length < 6) {
      Alert.alert(
        "Password too short",
        "Your password must be at least 6 characters.",
      );
      return;
    }
    const formData = new FormData();
        Object.entries(userToUpdate).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
        });

    if (userToUpdate.imageUrl) {
      formData.append("file", {
        uri: userToUpdate.imageUrl,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);
    }

    try {
      await dispatch(update(formData))
    } catch (error) {
      Alert.alert(
        "Profile Update failed",
        "Something went wrong. Please try again.",
      );
    }
  };

  return {
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
  };
};
