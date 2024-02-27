import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation, route }) => {

    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    



    useEffect(() => {
        (
            async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === "granted");
            }
        )();

    }, []);



    if (hasPermission === null) {
        return <View />

    }

    if (hasPermission === true) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    const openImagePicker = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required")
            return;

        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 1
        });
        const imgUri = data.assets[0].uri


        if (route.params.profileUpdate) {
            return navigation.navigate("profile", { image: imgUri })
        }
        else {
            return navigation.navigate("register", { image: imgUri });
        }


    }

    const clickPicture = async () => {
        const data = await camera.takePictureAsync();

        if (route.params.profileUpdate) {
            return navigation.navigate("profile", { image: imgUri })
        }
        else {
            return navigation.navigate("register", { image: data.uri });
        }
    }



    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ratio='1:1' ref={(e) => setCamera(e)} />

            <View style={{
                flexDirection: "row",
                position: 'absolute',
                bottom: 10,
                justifyContent: "space-around",
                width: "100%"

            }}>
                <Icon name="image" size={40} color={"#fff"} onPress={openImagePicker} />
                <Icon name="camera" size={40} color={"#fff"} onPress={clickPicture} />
                <Icon name="flip-camera-android" size={40} color={"#fff"}
                    onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: 1
    },

});


export default CameraComponent;
