import { useState, useEffect, useCallback } from 'react';
import { userService, UserData, UpdateUserPayload } from '../services/userService';

interface UseUserReturn {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  updateUser: (data: UpdateUserPayload) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: (password: string) => Promise<boolean>;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data on mount
  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados do usuário');
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user profile
  const updateUser = useCallback(async (data: UpdateUserPayload): Promise<boolean> => {
    try {
      setError(null);
      const result = await userService.updateProfile(data);
      if (result.success) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
      console.error('Error updating user:', err);
      return false;
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  // Reset password
  const resetPassword = useCallback(async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setError(null);
      const result = await userService.resetPassword(currentPassword, newPassword);
      return result.success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao redefinir senha');
      console.error('Error resetting password:', err);
      return false;
    }
  }, []);

  // Delete account
  const deleteAccount = useCallback(async (password: string): Promise<boolean> => {
    try {
      setError(null);
      const result = await userService.deleteAccount(password);
      if (result.success) {
        setUser(null);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar conta');
      console.error('Error deleting account:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    updateUser,
    refreshUser,
    resetPassword,
    deleteAccount
  };
};