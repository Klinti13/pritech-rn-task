import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem, { Task } from './components/TaskItem';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'not_completed'>('all');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    loadTasks();
    fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(data => setQuote(data.quote))
      .catch(err => console.log('API Error:', err));
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert('Attention', 'Title is required!');
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'not_completed',
      createdDate: new Date().toISOString().split('T')[0]
    };
    saveTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
  };

  const toggleStatus = (id: string) => {
    const updatedTasks = tasks.map((t): Task => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'not_completed' : 'completed' } : t
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter(t => t.id !== id);
    saveTasks(filteredTasks);
  };

  const displayedTasks = tasks
    .filter(t => filter === 'all' ? true : t.status === filter)
    .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeaderBackground} />

      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.appTitle}>My Tasks</Text>
          {quote ? <Text style={styles.quote}>"{quote}"</Text> : null}
        </View>

        <View style={styles.inputCard}>
          <TextInput 
            style={styles.input} 
            placeholder="Add new task..." 
            placeholderTextColor="#2FA08480"
            value={title} 
            onChangeText={setTitle} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Description (optional)..." 
            placeholderTextColor="#2FA08480"
            value={description} 
            onChangeText={setDescription} 
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          style={styles.searchInput} 
          placeholder="Search by title..." 
          placeholderTextColor="#2FA08480"
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        
        <View style={styles.filterRow}>
          {(['all', 'not_completed', 'completed'] as const).map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setFilter(f)} 
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f === 'completed' ? 'Completed' : 'Pending'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={displayedTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TaskItem task={item} onToggleStatus={toggleStatus} onDelete={deleteTask} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks found. Add your first task!</Text>}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEEEEE' },
  topHeaderBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 220,
    backgroundColor: '#1F6F5F',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  header: { marginBottom: 25, alignItems: 'center' },
  appTitle: {
    fontSize: 28,
    color: '#6FCF97',
    fontFamily: 'LatoBold',
    marginBottom: 8
  },
  quote: { 
    fontStyle: 'italic', 
    color: '#EEEEEE', 
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'LatoRegular',
    textAlign: 'center',
    opacity: 0.9
  },
  inputCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 20,
    shadowColor: '#1F6F5F',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  input: { 
    borderBottomWidth: 1, 
    borderColor: '#EEEEEE', 
    paddingVertical: 10, 
    marginBottom: 15, 
    fontSize: 16,
    color: '#1F6F5F',
    fontFamily: 'LatoRegular'
  },
  addButton: { 
    backgroundColor: '#6FCF97', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 5
  },
  addButtonText: { color: '#1F6F5F', fontFamily: 'LatoBold', fontSize: 16 },
  searchInput: { 
    backgroundColor: '#FFFFFF', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#EEEEEE',
    fontSize: 15,
    color: '#1F6F5F',
    fontFamily: 'LatoRegular'
  },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  filterBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE'
  },
  filterBtnActive: { backgroundColor: '#6FCF97', borderColor: '#6FCF97' },
  filterText: { color: '#2FA084', fontSize: 13, fontFamily: 'LatoBold' },
  filterTextActive: { color: '#1F6F5F' },
  listContent: { paddingBottom: 40 },
  emptyText: { textAlign: 'center', color: '#2FA084', marginTop: 40, fontSize: 16, fontFamily: 'LatoRegular' }
});