import { useAuth } from '../context/AuthContext';
export default function useAuthHook() {
  const ctx = useAuth();
  return ctx;
}