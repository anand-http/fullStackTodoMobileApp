import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, logout, updateProfile } from '../redux/action/auth';
import { clearPasswordChange, clearUpdateProfile } from '../redux/slices/userSlice';
import mime from "mime";

const Profile = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { user, dataProfileUpdate, dataChangePassword, errorChangePassword } = useSelector(state => state.auth)

  const users = user?.user

  const [avatar, setAvatar] = useState(users?.avatar?.url);

  const [name, setName] = useState(users?.name);


  const handleUpdate = async () => {

    const myformData = new FormData();

    myformData.append("name", name);

    myformData.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop()
    });

    await dispatch(updateProfile(myformData));
    dispatch(getMyProfile());

  }

  useEffect(() => {

    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }

  }, [route]);


  useEffect(() => {

    if (dataProfileUpdate) {
      alert(dataProfileUpdate.message)
      dispatch(clearUpdateProfile());
    }
    if (dataChangePassword) {
      alert(dataChangePassword.message)
      dispatch(clearPasswordChange());
    }
    if (errorChangePassword) {
      alert(errorChangePassword)
      dispatch(clearPasswordChange());
    }

  }, [alert, dataProfileUpdate, clearUpdateProfile, 
    errorChangePassword, dispatch, dataChangePassword, clearPasswordChange])


  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(getMyProfile());

  }



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

      <Avatar.Image size={100} source={{ uri: avatar ? avatar : null }} />

      <TouchableOpacity onPress={() => navigation.navigate("camera", { profileUpdate: true })}>
        <Text style={{ color: "#900", fontSize: 17 }}>Change Avatar</Text>
      </TouchableOpacity>

      <View style={{ width: "80%", marginVertical: 20 }}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />

      </View>

      <Button style={styles.btn} onPress={handleUpdate}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Update</Text>
      </Button>

      <Button onPress={() => navigation.navigate("change-password")}>
        <Text style={{ fontSize: 18, color: "#900" }}>CHANGE PASSWORD</Text>
      </Button>

      <Button onPress={handleLogout}>
        <Text style={{ fontSize: 16 }}>LOGOUT</Text>
      </Button>

      {
        users?.verified ? null :
          <Button onPress={() => navigation.navigate("verify")}>
            <Text style={{ fontSize: 17 }}>Verfiy</Text>
          </Button>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 15,
    fontSize: 20,
    borderRadius: 5

  },
  btn: {
    backgroundColor: "#900",
    marginBottom: 20,
    width: "75%",
    padding: 8,
    borderRadius: 5,
  }

})

export default Profile