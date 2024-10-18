import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// Function to log in with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Return the logged-in user
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

// Function to log out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Function to get the current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
