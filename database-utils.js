// database-utils.js

import { firestore } from 'firebase-admin';

const db = firestore();

// Function to initialize user data
export const initializeUserData = async (userId) => {
    try {
        await db.collection('users').doc(userId).set({
            xp: 0,
            lessons: 0,
            streak: 0,
            lastActive: new Date(),
        });
        console.log('User data initialized');
    } catch (error) {
        console.error('Error initializing user data:', error);
    }
};

// Function to update user stats
export const updateUserStats = async (userId, xp, lessons, streak) => {
    try {
        await db.collection('users').doc(userId).update({
            xp,
            lessons,
            streak,
            lastActive: new Date(),
        });
        console.log('User stats updated');
    } catch (error) {
        console.error('Error updating user stats:', error);
    }
};

// Function to fetch user data
export const fetchUserData = async (userId) => {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            console.log('User data:', doc.data());
            return doc.data();
        } else {
            console.log('No user found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

// Function to get ranking
export const getRanking = async () => {
    try {
        const snapshot = await db.collection('users').orderBy('xp', 'desc').limit(10).get();
        const rankings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Top players:', rankings);
        return rankings;
    } catch (error) {
        console.error('Error fetching rankings:', error);
    }
};

// Real-time ranking listener
export const listenToRankingUpdates = (callback) => {
    try {
        db.collection('users').orderBy('xp', 'desc').onSnapshot(snapshot => {
            const rankings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(rankings);
        });
    } catch (error) {
        console.error('Error setting up ranking listener:', error);
    }
};

// Function to update last active timestamp
export const updateLastActiveTimestamp = async (userId) => {
    try {
        await db.collection('users').doc(userId).update({
            lastActive: new Date(),
        });
        console.log('Last active timestamp updated');
    } catch (error) {
        console.error('Error updating last active timestamp:', error);
    }
};

// Function to calculate streak
export const calculateStreak = async (userId) => {
    try {
        const userData = await fetchUserData(userId);
        // Implement streak calculation logic here
        // Update user data accordingly
    } catch (error) {
        console.error('Error calculating streak:', error);
    }
};
