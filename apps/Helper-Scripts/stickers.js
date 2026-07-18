(function() {
    const STORAGE_KEY = 'klh_sticker_inventory';

    // Define the Stickers
    const STICKERS = {
        // --- GAME STICKERS ---
        'alpha_star': { name: 'Alphabet Star', icon: '⭐', color: '#FFD700', desc: 'Mastered the ABCs!', speech: 'You are a superstar!' },
        'number_ninja': { name: 'Number Ninja', icon: '🥷', color: '#333333', desc: 'Counted like a pro!', speech: 'Hi-ya! Number Ninja!' },
        'shape_shifter': { name: 'Shape Shifter', icon: '🔷', color: '#2196F3', desc: 'Solved shape puzzles!', speech: 'Shape Shifter!' },
        'color_captain': { name: 'Color Captain', icon: '🎨', color: '#FF5722', desc: 'Sorted all the colors!', speech: 'Color Captain to the rescue!' },
        'spelling_bee': { name: 'Spelling Bee', icon: '🐝', color: '#FFC107', desc: 'Spelled words correctly!', speech: 'Buzz! Spelling Bee!' },
        'book_worm': { name: 'Book Worm', icon: '📚', color: '#4CAF50', desc: 'Read the sentences!', speech: 'I love reading!' },
        'coloring_master': { name: 'Coloring Master', icon: '🎨', color: '#E91E63', desc: 'Completed a coloring page!', speech: 'You are a coloring master!' },

        // --- HIDDEN STICKERS (EASTER EGGS) ---
        'clicker_owl': { name: 'The Clicker', icon: '🖱️', color: '#9C27B0', desc: 'Clicked the logo 10 times!', speech: 'You found the Clicker Owl!' },
        'night_owl': { name: 'Night Owl', icon: '🌙', color: '#3F51B5', desc: 'Played after 7 PM!', speech: 'Hoo hoo! Night Owl!' }
    };

    // Support multiple child profiles storing an array of profiles in LocalStorage
    function getProfiles() {
        const data = localStorage.getItem('klh_sticker_profiles');
        if (!data) {
            const defaultProfiles = [{ id: 'default', name: 'Anak', stickers: [] }];
            localStorage.setItem('klh_sticker_profiles', JSON.stringify(defaultProfiles));
            return defaultProfiles;
        }
        return JSON.parse(data);
    }

    function getActiveProfileId() {
        // Fallback to active profile id from general store
        const generalStore = localStorage.getItem('klh_profile_progress');
        if (generalStore) {
            try {
                const parsed = JSON.parse(generalStore);
                if (parsed && parsed.state && parsed.state.activeProfileId) {
                    return parsed.state.activeProfileId;
                }
            } catch (e) {}
        }
        return localStorage.getItem('klh_active_profile_id') || 'default';
    }

    function getInventory() {
        const activeId = getActiveProfileId();
        const profiles = getProfiles();
        const profile = profiles.find(p => p.id === activeId);
        return profile ? profile.stickers : [];
    }

    // Parent Gate: generates a random math question to prevent child access
    window.ParentGate = function(callback) {
        const num1 = Math.floor(Math.random() * 9) + 2; // 2-10
        const num2 = Math.floor(Math.random() * 9) + 2; // 2-10
        const answer = num1 + num2;
        
        const response = prompt(`GERBANG ORANG TUA (Parent Gate)\n\nSelesaikan pertanyaan matematika berikut untuk melanjutkan:\n${num1} + ${num2} = ?`);
        
        if (response !== null && parseInt(response.trim(), 10) === answer) {
            callback();
        } else if (response !== null) {
            alert('Jawaban salah! Akses ditolak.');
        }
    };

    // Create and show a popup notification dynamically
    function showNotification(stickerId) {
        const sticker = STICKERS[stickerId];
        if (!sticker) return;

        // Create overlay elements
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); z-index: 9999;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            animation: fadeIn 0.5s;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            background: white; padding: 30px; border-radius: 20px; text-align: center;
            border: 5px solid ${sticker.color}; box-shadow: 0 0 20px white;
            transform: scale(0.5); animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            font-family: 'Comic Neue', sans-serif;
        `;

        card.innerHTML = `
            <h2 style="margin:0; color:#333;">New Sticker!</h2>
            <div style="font-size: 80px; margin: 20px 0;">${sticker.icon}</div>
            <h3 style="margin:0; color:${sticker.color};">${sticker.name}</h3>
            <p style="color:#666;">${sticker.desc}</p>
            <button id="close-sticker-pop" style="
                margin-top: 20px; padding: 10px 20px; font-size: 1.2em; border-radius: 10px;
                border: none; background: ${sticker.color}; color: white; cursor: pointer; font-family: 'Comic Neue', sans-serif;
            ">Awesome!</button>
        `;

        // Keyframe animations via JS
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `;
        document.head.appendChild(styleSheet);

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Close interaction
        document.getElementById('close-sticker-pop').onclick = () => overlay.remove();

        // Sound effect
        if(window.playConfettiEffect) window.playConfettiEffect();
        if(window.speakText) window.speakText(`Wow! You earned the ${sticker.name} sticker!`);
    }

    // Public API
    window.StickerManager = {
        awardSticker: function(stickerId) {
            const activeId = getActiveProfileId();
            const profiles = getProfiles();
            let profile = profiles.find(p => p.id === activeId);
            if (!profile) {
                profile = { id: activeId, name: 'Anak', stickers: [] };
                profiles.push(profile);
            }
            if (!profile.stickers.includes(stickerId)) {
                profile.stickers.push(stickerId);
                localStorage.setItem('klh_sticker_profiles', JSON.stringify(profiles));
                showNotification(stickerId);

                // Keep Zustand store in sync as well
                const generalStore = localStorage.getItem('klh_profile_progress');
                if (generalStore) {
                    try {
                        const parsed = JSON.parse(generalStore);
                        if (parsed && parsed.state) {
                            if (!parsed.state.stickers) parsed.state.stickers = [];
                            if (!parsed.state.stickers.includes(stickerId)) {
                                parsed.state.stickers.push(stickerId);
                                localStorage.setItem('klh_profile_progress', JSON.stringify(parsed));
                            }
                        }
                    } catch(e) {}
                }

                window.dispatchEvent(new Event('storage'));
                return true;
            }
            return false;
        },
        getInventory: getInventory,
        getProfiles: getProfiles,
        getActiveProfileId: getActiveProfileId,
        setActiveProfileId: function(profileId) {
            localStorage.setItem('klh_active_profile_id', profileId);
            window.dispatchEvent(new Event('storage'));
        },
        resetInventory: function() {
            window.ParentGate(() => {
                const activeId = getActiveProfileId();
                const profiles = getProfiles();
                const profile = profiles.find(p => p.id === activeId);
                if (profile) {
                    profile.stickers = [];
                    localStorage.setItem('klh_sticker_profiles', JSON.stringify(profiles));

                    // Keep Zustand store in sync
                    const generalStore = localStorage.getItem('klh_profile_progress');
                    if (generalStore) {
                        try {
                            const parsed = JSON.parse(generalStore);
                            if (parsed && parsed.state) {
                                parsed.state.stickers = [];
                                localStorage.setItem('klh_profile_progress', JSON.stringify(parsed));
                            }
                        } catch(e) {}
                    }

                    alert('Semua stiker telah dihapus untuk profil ini!');
                    window.dispatchEvent(new Event('storage'));
                }
            });
        },
        getStickerData: () => STICKERS
    };
})();
