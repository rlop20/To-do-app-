import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [rootExpanded, setRootExpanded] = useState(false);
  const [rootChildren, setRootChildren] = useState<string[]>([]);

  // Toggles the root node expansion
  const toggleRootExpansion = () => {
    if (rootExpanded) {
      setRootExpanded(false);
      setRootChildren([]); // Remove all child nodes when collapsing
    } else {
      setRootExpanded(true);
      setRootChildren(['Task One']); // Create the first child node
    }
  };

  // Adds a new child node under the root
  const addRootChild = () => {
    const nextTaskNumber = rootChildren.length + 1;
    setRootChildren([...rootChildren, `Task ${nextTaskNumber + 1}`]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Root Node */}
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: 20,
            marginRight: 10,
          }}
        >
          Click here to start
        </Text>
        <Pressable
          onPress={toggleRootExpansion}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
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

        {/* Render child nodes to the right of the root if expanded */}
        {rootExpanded && (
          <View style={{ marginLeft: 20, flexDirection: 'column', alignItems: 'center' }}>
            {rootChildren.map((placeholder, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput
                  placeholder={placeholder}
                  onChangeText={(text) => {}}
                  style={{
                    color: Colors[colorScheme ?? 'light'].text,
                    fontSize: 20,
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderColor: Colors[colorScheme ?? 'light'].tint,
                  }}
                />
                <Pressable
                  onPress={() => console.log(`Child node ${index + 1} pressed`)}
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
