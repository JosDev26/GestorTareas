import { motion } from 'framer-motion';
import styles from './TodoFilter.module.css';

export function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'active', label: 'Activas' },
    { id: 'completed', label: 'Completadas' }
  ];

  return (
    <div className={styles.filter}>
      {filters.map(filter => (
        <motion.button
          key={filter.id}
          className={`${styles.filterButton} ${currentFilter === filter.id ? styles.active : ''}`}
          onClick={() => onFilterChange(filter.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}