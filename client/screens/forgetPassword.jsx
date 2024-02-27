import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../redux/action/auth';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { dataForgotPassword, errorForgotPassword } = useSelector(state => state.auth)


  useEffect(() => {
    if (dataForgotPassword) {
      alert(dataForgotPassword.message);
      navigation.navigate('reset-password')

    }
    if (errorForgotPassword) {
      alert(errorForgotPassword)
    }

  }, [alert, dataForgotPassword, errorForgotPassword])



  const handleVerifyEmail = async () => {
    await dispatch(forgetPassword(email));
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: 700, color: "#900" }}>Forget Password</Text>
      <View style={{ width: "70%", marginTop: 50 }}>

        <TextInput placeholder='Enter your Email' value={email} onChangeText={setEmail} />


      </View>
      <Button style={styles.btn} onPress={handleVerifyEmail}>
        <Text style={{ color: "#fff", fontSize: 17 }} >Send Email</Text>
      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#900",
    marginTop: 20,
    marginBottom: 20,
    width: "40%",
    padding: 8,
    borderRadius: 5,

  }

})

export default ForgetPassword