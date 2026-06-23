import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../components/TaskItem';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks);
        const foundTask = tasks.find(t => t.id === id);
        if (foundTask) setTask(foundTask);
      }
    };
    fetchTask();
  }, [id]);

  if (!task) return <Text style={styles.loading}>Loading task details...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.topHeader} />

      <View style={styles.contentWrapper}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[styles.badge, task.status === 'completed' ? styles.badgeSuccess : styles.badgePending]}>
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </Text>
            <Text style={styles.date}>{task.createdDate}</Text>
          </View>

          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.divider} />

          <Text style={styles.label}>TASK DESCRIPTION</Text>
          <Text style={styles.desc}>
            {task.description || 'There is no description provided for this task.'}
          </Text>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEEEEE' },
  topHeader: {
    height: 140,
    backgroundColor: '#1F6F5F', 
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  loading: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#1F6F5F', fontFamily: 'LatoRegular' },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 16, 
    shadowColor: '#1F6F5F', 
    shadowOpacity: 0.1, 
    shadowRadius: 15, 
    elevation: 8 
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, overflow: 'hidden', fontSize: 12, fontFamily: 'LatoBold', textTransform: 'uppercase' },
  badgeSuccess: { backgroundColor: '#6FCF97', color: '#1F6F5F' },
  badgePending: { backgroundColor: '#EEEEEE', color: '#2FA084' },
  date: { fontSize: 13, color: '#2FA084', fontFamily: 'LatoBold' },
  title: { fontSize: 26, color: '#1F6F5F', fontFamily: 'LatoBold', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginBottom: 20 },
  label: { fontSize: 12, color: '#2FA084', marginBottom: 8, fontFamily: 'LatoBold', letterSpacing: 1 },
  desc: { fontSize: 16, color: '#1F6F5F', lineHeight: 24, fontFamily: 'LatoRegular', opacity: 0.9 }
});