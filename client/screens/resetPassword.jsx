import { View, Text, TextInput, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/action/auth';

const ResetPassword = ({navigation}) => {
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState()

  const dispatch = useDispatch();
  const { dataResetPassword, errorResetPassword } = useSelector(state => state.auth)

  useEffect(() => {
    if (dataResetPassword) {
      alert(dataResetPassword.message);
      navigation.navigate("login")
    }
    if (errorResetPassword) {
      alert(errorResetPassword);
    }
  }, [alert, dataResetPassword, errorResetPassword])

  const handleResetPassword = () => {
    dispatch(resetPassword({ otp, password }));

  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontSize: 25, fontWeight: 600, margin: 20, color: "#900" }}>Reset Password</Text>

      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          keyboardType='numeric'
          placeholder='Enter your OTP' />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Enter your new password' />
      </View>

      <Button
        style={styles.btn}
        onPress={handleResetPassword}
        disabled={!otp || !password}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Reset Password</Text>
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

export default ResetPassword;