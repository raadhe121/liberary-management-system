// utils/auth.ts
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token'); // Modify as per your auth logic
  };
  