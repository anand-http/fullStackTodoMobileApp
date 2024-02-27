import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, verifyAccount } from '../redux/action/auth';
import { clearVerfiyAccount } from '../redux/slices/userSlice';

const Verify = () => {

  const dispatch = useDispatch();

  const { dataVerify } = useSelector(state => state.auth)


  const [otp, setOtp] = useState();

  const handleVerifyAccount = async () => {
    await dispatch(verifyAccount(otp));
    dispatch(getMyProfile());
  }


  useEffect(() => {
    if (dataVerify) {
      alert(dataVerify.message)
      dispatch(clearVerfiyAccount());
    }
  }, [alert, dataVerify])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>

      <Text
        style={{ fontSize: 25, fontWeight: 600, margin: 20, color: "#900" }}>Verify your Account</Text>


      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder='Enter your OTP' />


      </View>

      <Button
        style={styles.btn}
        onPress={handleVerifyAccount}
        disabled={!otp}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Verify</Text>
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

});


export default Verify