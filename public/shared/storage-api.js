/**
 * shared/storage-api.js
 * Cross-Framework Unified Storage API for Kids Learning Hub
 * 
 * Provides unified access to UserProfile progress (stars, stickers, profile ID)
 * for both Vanilla JS HTML games and React (via Zustand synchronization).
 */

const STORAGE_KEY = 'klh_profile_progress';

// Helper to get raw Zustand-shaped state structure
function getRawStore() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { version: 0, state: {} };
  } catch (e) {
    console.error('[StorageAPI] Error reading localStorage', e);
    return { version: 0, state: {} };
  }
}

// Helper to write raw state and dispatch sync events
function setRawStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    
    // 1. Dispatch custom event for same-window / same-document sync
    const syncEvent = new CustomEvent('klh-profile-update', { 
      detail: store.state 
    });
    window.dispatchEvent(syncEvent);
    
    // 2. Dispatch to parent if running inside an iframe
    if (window.parent && window.parent !== window) {
      window.parent.dispatchEvent(syncEvent);
    }
  } catch (e) {
    console.error('[StorageAPI] Error writing localStorage', e);
  }
}

export const StorageAPI = {
  /**
   * Get the current profile state
   * @returns {{totalStars: number, stickers: string[], activeProfileId: string, gamesCompleted: Record<string, boolean>}}
   */
  getProfile() {
    const raw = getRawStore();
    const state = raw.state || {};
    return {
      totalStars: state.totalStars || 0,
      stickers: state.stickers || [],
      activeProfileId: state.activeProfileId || 'default',
      gamesCompleted: state.gamesCompleted || {}
    };
  },

  /**
   * Update the profile state with a partial update or updater function
   * @param {Object|Function} updater 
   */
  updateProfile(updater) {
    const raw = getRawStore();
    const currentState = this.getProfile();
    const updatedFields = typeof updater === 'function' ? updater(currentState) : updater;
    
    raw.state = {
      ...currentState,
      ...updatedFields
    };
    setRawStore(raw);
    return raw.state;
  },

  /**
   * Add stars to user progress
   * @param {number} amount 
   */
  addStars(amount) {
    return this.updateProfile(state => ({
      totalStars: state.totalStars + amount
    }));
  },

  /**
   * Award a sticker to the user (no duplicates)
   * @param {string} stickerId 
   * @returns {boolean} true if new sticker awarded, false if already owned
   */
  awardSticker(stickerId) {
    let newlyAwarded = false;
    this.updateProfile(state => {
      if (state.stickers.includes(stickerId)) {
        return state;
      }
      newlyAwarded = true;
      return {
        stickers: [...state.stickers, stickerId]
      };
    });
    return newlyAwarded;
  },

  /**
   * Change active profile
   * @param {string} profileId 
   */
  setActiveProfile(profileId) {
    return this.updateProfile({ activeProfileId: profileId });
  }
};
