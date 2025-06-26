
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  name: string;
  phone?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  loading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'admin' | 'employee' | 'customer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('pahana_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would call your Java backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock user data - replace with actual API response
      const mockUser: User = {
        id: '1',
        username,
        email: username.includes('@') ? username : `${username}@example.com`,
        role: username === 'admin' ? 'admin' : username === 'employee' ? 'employee' : 'customer',
        name: username === 'admin' ? 'Admin User' : username === 'employee' ? 'Employee User' : 'Customer User',
        phone: '+94771234567',
        isVerified: true
      };
      
      setUser(mockUser);
      localStorage.setItem('pahana_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would call your Java backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        role: userData.role,
        name: userData.name,
        phone: userData.phone,
        isVerified: false // Would require email/SMS verification
      };
      
      setUser(newUser);
      localStorage.setItem('pahana_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pahana_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
