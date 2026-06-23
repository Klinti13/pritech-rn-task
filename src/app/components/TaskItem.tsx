import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'not_completed';
  createdDate: string;
}

interface Props {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleStatus, onDelete }: Props) {
  const isCompleted = task.status === 'completed';

  return (
    <Link href={{ pathname: '/task/[id]', params: { id: task.id } }} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={[styles.title, isCompleted && styles.completedText]}>
            {task.title}
          </Text>
          <Text style={[styles.statusText, isCompleted ? styles.statusCompleted : styles.statusPending]}>
            {isCompleted ? ' Completed' : ' Pending'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.btn, isCompleted ? styles.btnUndo : styles.btnDone]} 
            onPress={() => onToggleStatus(task.id)}
          >
            <Text style={[styles.btnText, isCompleted ? styles.textDark : styles.textDark]}>
              {isCompleted ? 'Undo' : 'Complete'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btn, styles.btnDelete]} 
            onPress={() => onDelete(task.id)}
          >
            <Text style={styles.textLight}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 14, marginBottom: 12, shadowColor: '#1F6F5F', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  infoContainer: { marginBottom: 12 },
  title: { fontSize: 18, color: '#1F6F5F', fontFamily: 'LatoBold' },
  completedText: { textDecorationLine: 'line-through', color: '#2FA084', opacity: 0.6 },
  statusText: { fontSize: 12, marginTop: 6, fontFamily: 'LatoRegular' },
  statusPending: { color: '#2FA084' }, 
  statusCompleted: { color: '#6FCF97', fontFamily: 'LatoBold' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  btnDone: { backgroundColor: '#6FCF97' },
  btnUndo: { backgroundColor: '#EEEEEE' },
  btnDelete: { backgroundColor: '#AA1C41' }, 
  btnText: { fontFamily: 'LatoBold', fontSize: 12 },
  textDark: { color: '#1F6F5F' },
  textLight: { color: '#FFFFFF' }
});