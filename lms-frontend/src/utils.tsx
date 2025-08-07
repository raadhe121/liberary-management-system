// utils/auth.ts
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('accessToken'); 
  };
  
 export function validatePassword(password:string) {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must include at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
        return "Password must include at least one number.";
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
        return "Password must include at least one special character.";
    }
    if (/\s/.test(password)) {
        return "Password must not contain spaces.";
    }

    return "Valid";
}

