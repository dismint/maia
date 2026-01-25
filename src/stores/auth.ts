import { writable, derived } from "svelte/store";

type User = {
  id: string;
  email: string;
  googleId: string;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;

export const user = writable<User>(null);

export const isAuthenticated = derived(user, ($user) => $user !== null);

export async function checkAuth() {
  try {
    const response = await fetch("http://localhost:3000/auth/user", {
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      user.set(userData);
      return userData;
    } else {
      user.set(null);
      return null;
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    user.set(null);
    return null;
  }
}

export async function logout() {
  await fetch("http://localhost:3000/auth/logout", {
    credentials: "include",
  });
  user.set(null);
}
