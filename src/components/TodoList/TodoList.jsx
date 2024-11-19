import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoFilter } from '../TodoFilter/TodoFilter';

const loadTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
  return todos;
};

export function TodoList() {
  const [filter, setFilter] = useState('all');
  const [deletedTodo, setDeletedTodo] = useState(null);
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const { data: todos = [] } = useQuery({
    queryKey: ['todos'],
    queryFn: loadTodos,
    initialData: [],
  });

  const addTodoMutation = useMutation({
    mutationFn: (newTodo) => {
      const updatedTodos = [...todos, newTodo];
      return saveTodos(updatedTodos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('¡Tarea añadida con éxito!');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id) => {
      const todoToDelete = todos.find(todo => todo.id === id);
      setDeletedTodo(todoToDelete);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      return saveTodos(updatedTodos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Tarea eliminada');
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (id) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return saveTodos(updatedTodos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const undoDelete = () => {
    if (deletedTodo) {
      const updatedTodos = [...todos, deletedTodo];
      saveTodos(updatedTodos);
      queryClient.invalidateQueries(['todos']);
      setDeletedTodo(null);
      toast.success('¡Tarea restaurada!');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Lista de Tareas</h1>
          <button onClick={logout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
        
        <TodoForm onSubmit={(title) => {
          addTodoMutation.mutate({
            id: Date.now(),
            title,
            completed: false,
          });
        }} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <AnimatePresence mode="popLayout">
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
            >
              <TodoItem
                todo={todo}
                onToggle={() => toggleTodoMutation.mutate(todo.id)}
                onDelete={() => deleteTodoMutation.mutate(todo.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {deletedTodo && (
          <motion.button
            className={styles.undoButton}
            onClick={undoDelete}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Deshacer
          </motion.button>
        )}
      </div>
    </div>
  );
}