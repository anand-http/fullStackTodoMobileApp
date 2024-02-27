import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/action/auth';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    dispatch(login({ email, password }));

  }


  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontSize: 25, fontWeight: 600, margin: 20, color: "#900" }}>Welcome</Text>

      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='Enter your email' />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Enter your password' />
      </View>

      <Button
        style={styles.btn}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Login</Text>
      </Button>

      <Text style={{ marginBottom: 7 }}>OR</Text>

      <Button onPress={() => navigation.navigate("register")}>
        <Text style={{ color: "#900", fontSize: 20 }} >Sign Up</Text>
      </Button>

      <TouchableOpacity style={{marginTop:20}} onPress={()=> navigation.navigate("forget-password")}>

       <Text style={{fontSize:17,color:"#900"}}>Forget Password</Text>

      </TouchableOpacity>
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

export default Login;