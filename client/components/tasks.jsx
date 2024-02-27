import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/action/task';
import { getMyProfile } from '../redux/action/auth';

const Tasks = ({ title, description, status, taskId }) => {
    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(status);

    const handleCheckbox = () => {
        setCompleted(!completed);
        dispatch(updateTask(taskId));
    }

    const handleDelete = async ()=>{
       await dispatch(deleteTask(taskId))
        dispatch(getMyProfile());
    }

    return (
        <View style={styles.mainView}>
            <View style={{ width: "70%" }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Checkbox
                status={completed ? "checked" : "unchecked"}
                color='#474747'
                onPress={handleCheckbox}
            />
            <Icon
                name='delete'
                color="#fff"
                size={20}
                onPress={handleDelete}
                style={{
                    borderRadius: 50,
                    padding: 15,
                    backgroundColor: "#900"
                }}

            />

        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        fontSize: 25,
        marginVertical: 10,
        color: "#900",
    },
    description: {
        fontSize: 15
    }
})

export default Tasks