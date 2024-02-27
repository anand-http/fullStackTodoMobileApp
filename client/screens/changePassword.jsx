import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper';
import { changePassword, getMyProfile } from '../redux/action/auth';
import { clearMessage } from '../redux/action/task'

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { dataChangePassword, errorChangePassword } = useSelector(state => state.auth);

  useEffect(() => {

    const alertMessage = async () => {
      if (dataChangePassword) {
        await alert(dataChangePassword.message)
        dispatch(clearMessage())
      }
      if (errorChangePassword) {
        await alert(errorChangePassword)
        dispatch(clearMessage())
      }
    }
    alertMessage()

  }, [dispatch, alert, dataChangePassword, errorChangePassword])

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewpassword] = useState();


  const handleChangePassword = async () => {
    await dispatch(changePassword({ oldPassword, newPassword }));
    dispatch(getMyProfile());
    setOldPassword("")
    setNewpassword("")

  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>

      <Text
        style={{ fontSize: 25, fontWeight: 600, margin: 20, color: "#900" }}>Change Password</Text>


      <View style={{ width: "80%" }}>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder='Enter your oldPassword' />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={newPassword}
          onChangeText={setNewpassword}
          placeholder='Enter your newPassword' />
      </View>

      <Button
        style={styles.btn}
        onPress={handleChangePassword}
        disabled={!oldPassword || !newPassword}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>ChangePassword</Text>
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,


  },
  btn: {
    backgroundColor: "#900",
    marginTop: 20,
    marginBottom: 20,
    width: "75%",
    padding: 8,
    borderRadius: 5,

  }

})

export default ChangePassword