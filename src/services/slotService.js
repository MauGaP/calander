// src/services/slotService.js
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Function to add an available slot
export const addAvailableSlot = async (teacherId, slotData) => {
  try {
    await addDoc(collection(db, 'availableSlots'), {
      teacherId,
      ...slotData,
    });
    console.log('Slot added successfully');
  } catch (error) {
    console.error('Error adding slot:', error);
  }
};

// Function to get available slots for a teacher
export const getAvailableSlots = async (teacherId) => {
  try {
    const q = query(collection(db, 'availableSlots'), where('teacherId', '==', teacherId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
};
