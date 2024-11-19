import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'El campo de correo electrónico no puede estar vacío.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña no puede estar vacía.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (login(email, password)) {
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/');
    } else {
      toast.error('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.formContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                className={errors.password ? styles.inputError : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}