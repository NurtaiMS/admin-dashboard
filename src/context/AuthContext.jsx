import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Функция переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Функция обновления последнего визита
  const updateLastVisit = () => {
    localStorage.setItem('lastVisit', new Date().toISOString());
  };

  // Применение темы при загрузке
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Загрузка пользователя при старте
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Выводим время последнего визита
      if (lastVisit) {
        console.log('Last visit:', new Date(lastVisit).toLocaleString());
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.get('/users');
      const foundUser = response.data.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const token = `fake-jwt-token-${foundUser.id}`;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(foundUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(foundUser);
        updateLastVisit(); // Обновляем время последнего визита при входе
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.get('/users');
      const exists = response.data.find(u => u.email === email);
      
      if (exists) {
        return { success: false, error: 'Email already exists' };
      }
      
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: 'user'
      };
      
      await api.post('/users', newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      theme, 
      toggleTheme,
      updateLastVisit 
    }}>
      {children}
    </AuthContext.Provider>
  );
};