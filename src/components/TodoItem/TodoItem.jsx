import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './TodoItem.module.css';

export function TodoItem({ todo, onToggle, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (showConfirm) {
      onDelete();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <motion.div
      className={styles.item}
      layout
    >
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Marcar "${todo.title}" como ${todo.completed ? 'incompleta' : 'completa'}`}
        />
        <span className={styles.checkmark}></span>
      </label>
      
      <span className={`${styles.title} ${todo.completed ? styles.completed : ''}`}>
        {todo.title}
      </span>

      <motion.button
        className={`${styles.deleteButton} ${showConfirm ? styles.confirm : ''}`}
        onClick={handleDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showConfirm ? '¿Confirmar?' : 'Eliminar'}
      </motion.button>
    </motion.div>
  );
}