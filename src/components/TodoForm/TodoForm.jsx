import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './TodoForm.module.css';

export function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('El título de la tarea no puede estar vacío.');
      return;
    }

    onSubmit(title.trim());
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
          className={styles.input}
          aria-label="Nueva tarea"
        />
        <motion.button
          type="submit"
          className={styles.addButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Añadir
        </motion.button>
      </div>
      {error && (
        <motion.p
          className={styles.error}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}