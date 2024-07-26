import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Taskname({ tasks, setTasks }) {
    const [selectedTasks, setSelectedTasks] = useState(new Array(tasks.length).fill(false));

    useEffect(() => {
        loadSelectedTasks();
    }, []);

    useEffect(() => {
        saveSelectedTasks(selectedTasks);
    }, [selectedTasks]);

    const saveSelectedTasks = async (tasks) => {
        try {
            const jsonValue = JSON.stringify(tasks);
            await AsyncStorage.setItem('selectedTasks', jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const loadSelectedTasks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('selectedTasks');
            if (jsonValue != null) {
                setSelectedTasks(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedSelectedTasks = [...selectedTasks];
        updatedSelectedTasks[index] = !updatedSelectedTasks[index];
        setSelectedTasks(updatedSelectedTasks);
    };

    return (
        <View style={styles.tasklist}>
            {tasks.map((task, index) => (
                <View key={index} style={styles.taskname}>
                    <Checkbox
                        value={selectedTasks[index]}
                        onValueChange={() => handleCheckboxChange(index)}
                        style={styles.checkbox}
                    />
                    <Text>{task.task}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tasklist: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 15,
        padding: 20,
        width: "90%",
        alignSelf: 'center',
        marginBottom: 5,
    },
    taskname: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000',
        fontSize: 15,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    checkbox: {
        marginRight: 10,
        borderRadius:5
    }
});
