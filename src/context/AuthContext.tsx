import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Student } from '../types/Student';
import { mockDataService } from '../services/mockDataService';
import { CacheManager } from '../utils/cacheManager';

interface AuthContextType {
  currentUser: Student | null;
  isAuthenticated: boolean;
  login: (ru: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'univirtus_current_user_ru';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restaurar sessão do localStorage ao inicializar
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedRU = localStorage.getItem(STORAGE_KEY);
        if (storedRU) {
          // Tentar carregar do cache primeiro (offline)
          let student = await CacheManager.getUserData(storedRU);
          
          // Se não estiver no cache ou estiver online, buscar do serviço
          if (!student || CacheManager.isOnline()) {
            student = await mockDataService.getStudentByRU(storedRU);
            if (student) {
              // Salvar no cache para uso offline
              await CacheManager.saveUserData(storedRU, student);
            }
          }
          
          if (student) {
            setCurrentUser(student);
          } else {
            // Se não conseguir carregar o aluno, limpa o localStorage
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        // Tentar carregar do cache em caso de erro
        const storedRU = localStorage.getItem(STORAGE_KEY);
        if (storedRU) {
          const cachedStudent = await CacheManager.getUserData(storedRU);
          if (cachedStudent) {
            setCurrentUser(cachedStudent);
            console.log('📴 Usando dados em cache (modo offline)');
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * Realiza login validando RU e senha
   * Persiste o RU no localStorage para manter a sessão
   */
  const login = async (ru: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Valida credenciais através do profile index
      const profileIndex = await mockDataService.getProfileIndex();
      const profile = profileIndex.profiles.find(
        p => p.ru === ru && p.password === password
      );

      if (!profile) {
        return false;
      }

      // Carrega dados completos do aluno
      const student = await mockDataService.getStudentByRU(ru);
      if (student) {
        setCurrentUser(student);
        localStorage.setItem(STORAGE_KEY, ru);
        
        // Salvar dados no cache para uso offline
        await CacheManager.saveUserData(ru, student);
        console.log('✅ Dados do usuário salvos para uso offline');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza logout limpando dados do usuário e localStorage
   */
  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook customizado para acessar o contexto de autenticação
 * Lança erro se usado fora do AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
