import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Tasks from '../components/tasks';
import Icon from 'react-native-vector-icons/Entypo'
import { Button, Dialog, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask } from '../redux/action/task';
import { getMyProfile } from '../redux/action/auth';
import { clearDeleteTask, clearUpdateTask } from '../redux/slices/taskSlice';
import { clearRegister } from '../redux/slices/userSlice';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const { user, dataRegister, errorRegister } = useSelector((state) => state.auth)

    const { updateTask, taskDelete } = useSelector((state) => state.task)

    const tasks = user?.user?.tasks



    useEffect(() => {
        if (dataRegister) {
            alert(dataRegister.message)
            dispatch(clearRegister());
        }
        if (errorRegister) {
            alert(errorRegister)
            dispatch(clearRegister());
        }

    }, [alert, dataRegister, errorRegister, dispatch, clearRegister]);


    useEffect(() => {

        if (updateTask) {
            alert(updateTask.message);
            dispatch(clearUpdateTask());

        }
        if (taskDelete) {
            alert(taskDelete.message)
            dispatch(clearDeleteTask());
        }
    }, [alert, updateTask, deleteTask, dispatch])



    const [dialog, setDialog] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");





    const handleOpenDialog = () => {
        setDialog(!dialog)
    }


    const addTasksHandle = async () => {

        await dispatch(addTask({ title, description }));
        dispatch(getMyProfile());

        setTitle("")
        setDescription("")
        setDialog(false);
    }


    return (
        <>

            <View style={styles.homeHeader}>
                <ScrollView>
                    <SafeAreaView>
                        <Text style={styles.heading} onPress={() => navigation.navigate("login")}>All Tasks</Text>
                        {
                            tasks && tasks.map((item, i) =>
                                <Tasks
                                    key={i}
                                    title={item.title}
                                    description={item.description}
                                    status={item.completed}
                                    taskId={item._id}
                                />
                            )
                        }

                        <TouchableOpacity style={styles.addBtn} onPress={handleOpenDialog}>
                            <Icon name='add-to-list' size={20} color={"#900"} />
                        </TouchableOpacity>


                    </SafeAreaView>
                </ScrollView>

            </View>

            <Dialog visible={dialog} onDismiss={handleOpenDialog}>
                <Dialog.Title>Add a task</Dialog.Title>
                <Dialog.Content>

                    <TextInput style={styles.textInput} label={"Title"} value={title} onChangeText={(text) => setTitle(text)} />

                    <TextInput style={styles.textInput} label={"Description"} value={description} onChangeText={(text) => setDescription(text)} />

                    <View style={{ flexDirection: "row", marginVertical: 5, alignItems: "center" }}>

                        <TouchableOpacity onPress={handleOpenDialog} >
                            <Text style={{ fontSize: 19, marginHorizontal: 12 }}>CANCEL</Text>
                        </TouchableOpacity>

                        <Button style={styles.btn} onPress={addTasksHandle} disabled={!title || !description} >
                            <Text style={{ fontSize: 19, color: "#900" }}> ADD</Text>
                        </Button>
                    </View>

                </Dialog.Content>
            </Dialog>

        </>


    )
}



const styles = StyleSheet.create({

    homeHeader: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    heading: {
        fontSize: 35,
        marginTop: 20,
        textAlign: "center",
        color: "white",
        backgroundColor: "black",
        padding: 7
    },
    addBtn: {
        backgroundColor: "#fff",
        borderRadius: 100,
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center",
        marginVertical: 20

    },
    textInput: {
        marginVertical: 10,
    },
    btn: {
        marginTop: 6,




    }


})


export default Home;
