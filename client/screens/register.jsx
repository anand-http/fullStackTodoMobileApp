import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import {  register } from '../redux/action/auth';
import Loader from '../components/loader';
import mime from 'mime';

const Register = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const { isLoading } = useSelector(state => state.auth)

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleAvatar = () => {
        navigation.navigate("camera", { profileUpdate: false })
    }

    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }
    }, [route]);



    const handleRegister = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })
        await dispatch(register(formData))
    }





    return (
        isLoading ? <Loader /> :
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <TouchableOpacity onPress={handleAvatar}>

                    <Avatar.Image size={100} source={{ uri: avatar ? avatar : null }} />


                </TouchableOpacity>

                <View style={{ width: "80%" }}>
                    <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Enter your name' />
                    <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Enter your email' />
                    <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.input} placeholder='Enter your password' />
                </View>

                <Button disabled={!email || !name || !password} style={styles.btn} onPress={handleRegister}>
                    <Text style={{ color: "#fff" }}>Register</Text>
                </Button>

                <Text>
                    OR
                </Text>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("login")}>
                    <Text style={{ color: "#900", fontSize: 16 }}>Already a User? Login</Text>
                </TouchableOpacity>
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
        marginTop: 20,
        marginBottom: 20,
        width: "75%",
        padding: 8,
        borderRadius: 5,
    }

})

export default Register