import React, { useState, useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Taskname from './Components/Taskname';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const saveTasks = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      if (jsonValue != null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { task: newTask }]);
      setNewTask('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.heading}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <Text style={styles.headtext}>To Do App</Text>
      </View>
      <Taskname tasks={tasks} setTasks={setTasks} />
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heading: {
    display: "flex",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 15,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: "95%",
    alignSelf: "center",
  },
  logo: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  headtext: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignContent: "center",
    bottom: 0,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent:"center"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
