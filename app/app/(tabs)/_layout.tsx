import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the new package
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [rootExpanded, setRootExpanded] = useState(false);
  const [rootChildren, setRootChildren] = useState<string[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setRootChildren(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (tasks: string[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  // Toggles the root node expansion
  const toggleRootExpansion = () => {
    if (rootExpanded) {
      setRootExpanded(false);
    } else {
      setRootExpanded(true);
      loadTasks(); // Load tasks when expanding
    }
  };

  // Adds a new child node under the root with the placeholder "Edit Here..."
  const addRootChild = () => {
    const newTasks = [...rootChildren, "Edit Here..."];
    setRootChildren(newTasks);
    saveTasks(newTasks); // Save the updated tasks
  };

  // Deletes a child node
  const deleteRootChild = (index: number) => {
    const newTasks = rootChildren.filter((_, i) => i !== index);
    setRootChildren(newTasks);
    saveTasks(newTasks); // Save the updated tasks after deletion
  };

  // Handle circle press
  const handleCirclePress = (index: number) => {
    console.log(`Circle ${index + 1} pressed`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Root Node */}
        <Pressable
          onPress={toggleRootExpansion}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: 20,
              marginRight: 10,
            }}
          >
            Click here to expand/contract
          </Text>
        </Pressable>

        {/* Render child nodes to the right of the root if expanded */}
        {rootExpanded && (
          <View style={{ marginLeft: 20, flexDirection: 'column', alignItems: 'center' }}>
            {rootChildren.map((task, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput
                  placeholder="Edit Here..." // Placeholder text
                  onChangeText={(text) => {
                    const updatedTasks = [...rootChildren];
                    updatedTasks[index] = text;
                    setRootChildren(updatedTasks);
                    saveTasks(updatedTasks); // Save the updated tasks
                  }}
                  value={task === "Edit Here..." ? "" : task} // Display placeholder until edited
                  style={{
                    color: Colors[colorScheme ?? 'light'].text,
                    fontSize: 20,
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderColor: Colors[colorScheme ?? 'light'].tint,
                    flex: 1, // Make the TextInput take up the remaining space
                  }}
                />
                <Pressable
                  onPress={() => deleteRootChild(index)} // Delete the child node on press
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    marginLeft: 10,
                  })}
                >
                  <Text style={{ fontSize: 20, color: 'red' }}>X</Text> {/* X button */}
                </Pressable>
                {/* Circle to the right of the X button */}
                <Pressable
                  onPress={() => handleCirclePress(index)} // Handle circle press
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    marginLeft: 10,
                  })}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    }}
                  />
                </Pressable>
              </View>
            ))}

            {/* Plus symbol underneath the most recent node */}
            <Pressable
              onPress={addRootChild}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginTop: 10,
              })}
            >
              <Text style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].tint }}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
