// Color Personalization and Analytics
class ColorPersonalization {
    constructor() {
        this.stats = this.loadStats();
        this.favorites = this.loadFavorites();
        this.moodColors = this.loadMoodColors();
    }
    
    // Track color usage
    trackColorUsage(color) {
        const today = new Date().toDateString();
        
        if (!this.stats.daily[today]) {
            this.stats.daily[today] = [];
        }
        
        this.stats.daily[today].push({
            color,
            timestamp: Date.now()
        });
        
        // Update color frequency
        this.stats.frequency[color] = (this.stats.frequency[color] || 0) + 1;
        
        // Update streak
        this.updateStreak();
        
        this.saveStats();
    }
    
    // Update usage streak
    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (this.stats.daily[today] && this.stats.daily[today].length > 0) {
            if (this.stats.lastActiveDate === yesterday) {
                this.stats.streak += 1;
            } else if (this.stats.lastActiveDate !== today) {
                this.stats.streak = 1;
            }
            this.stats.lastActiveDate = today;
        }
    }
    
    // Get usage statistics
    getUsageStats() {
        const today = new Date().toDateString();
        const todayCount = this.stats.daily[today] ? this.stats.daily[today].length : 0;
        
        // Find most used color
        let mostUsedColor = '#3B82F6';
        let maxCount = 0;
        
        for (const [color, count] of Object.entries(this.stats.frequency)) {
            if (count > maxCount) {
                maxCount = count;
                mostUsedColor = color;
            }
        }
        
        return {
            todayCount,
            mostUsedColor,
            streak: this.stats.streak,
            totalColors: Object.keys(this.stats.frequency).length
        };
    }
    
    // Get color statistics (alias for compatibility)
    getColorStats() {
        return this.getUsageStats();
    }
    
    // Get favorite colors (most frequently used)
    getFavoriteColors(limit = 10) {
        return Object.entries(this.stats.frequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([color]) => color);
    }
    
    // Get favorites (alias for compatibility)
    getFavorites() {
        return this.getFavoriteColors();
    }
    
    // Generate daily color based on date
    getDailyColor() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        
        // Use day of year as seed for consistent daily color
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
            '#A3E4D7', '#F9E79F', '#D5A6BD', '#AED6F1', '#A9DFBF'
        ];
        
        const colorIndex = dayOfYear % colors.length;
        const dailyColor = colors[colorIndex];
        
        return {
            color: dailyColor,
            name: this.getNearestColorName(dailyColor)
        };
    }
    
    // Get mood-based color suggestions
    getMoodColors(mood) {
        const moodPalettes = {
            energetic: ['#FF6B6B', '#FF8E53', '#FFA726', '#FFEB3B', '#8BC34A'],
            calm: ['#81C784', '#4FC3F7', '#64B5F6', '#9575CD', '#A1C4FD'],
            creative: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#FF5722'],
            focused: ['#37474F', '#546E7A', '#607D8B', '#78909C', '#90A4AE'],
            happy: ['#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#E91E63'],
            mysterious: ['#1A237E', '#283593', '#303F9F', '#3949AB', '#3F51B5']
        };
        
        return moodPalettes[mood] || moodPalettes.calm;
    }
    
    // Simple color name approximation
    getNearestColorName(hex) {
        const colorNames = {
            '#FF0000': 'Red',
            '#00FF00': 'Green',
            '#0000FF': 'Blue',
            '#FFFF00': 'Yellow',
            '#FF00FF': 'Magenta',
            '#00FFFF': 'Cyan',
            '#FFA500': 'Orange',
            '#800080': 'Purple',
            '#FFC0CB': 'Pink',
            '#A52A2A': 'Brown',
            '#808080': 'Gray',
            '#000000': 'Black',
            '#FFFFFF': 'White'
        };
        
        return colorNames[hex] || 'Custom Color';
    }
    
    // Analyze color preferences
    analyzePreferences() {
        const colors = Object.keys(this.stats.frequency);
        if (colors.length === 0) return null;
        
        let totalHue = 0;
        let totalSaturation = 0;
        let totalLightness = 0;
        let warmColors = 0;
        let coolColors = 0;
        
        colors.forEach(color => {
            const frequency = this.stats.frequency[color];
            
            // Simple hue calculation (this would need ColorConverter in real implementation)
            const hue = parseInt(color.substring(1, 3), 16); // Simplified
            totalHue += hue * frequency;
            
            if (hue > 128) warmColors += frequency;
            else coolColors += frequency;
        });
        
        const totalFrequency = Object.values(this.stats.frequency).reduce((a, b) => a + b, 0);
        
        return {
            averageHue: Math.round(totalHue / totalFrequency),
            temperaturePreference: warmColors > coolColors ? 'Warm' : 'Cool',
            diversity: colors.length / totalFrequency
        };
    }
    
    // Load statistics from localStorage
    loadStats() {
        try {
            const stats = localStorage.getItem('colorInspector_stats');
            return stats ? JSON.parse(stats) : {
                daily: {},
                frequency: {},
                streak: 0,
                lastActiveDate: null
            };
        } catch {
            return {
                daily: {},
                frequency: {},
                streak: 0,
                lastActiveDate: null
            };
        }
    }
    
    // Save statistics to localStorage
    saveStats() {
        try {
            localStorage.setItem('colorInspector_stats', JSON.stringify(this.stats));
        } catch {
            // Handle storage errors silently
        }
    }
    
    // Load favorites from localStorage
    loadFavorites() {
        try {
            const favorites = localStorage.getItem('colorInspector_favorites');
            return favorites ? JSON.parse(favorites) : [];
        } catch {
            return [];
        }
    }
    
    // Save favorites to localStorage
    saveFavorites() {
        try {
            localStorage.setItem('colorInspector_favorites', JSON.stringify(this.favorites));
        } catch {
            // Handle storage errors silently
        }
    }
    
    // Load mood colors from localStorage
    loadMoodColors() {
        try {
            const moodColors = localStorage.getItem('colorInspector_moodColors');
            return moodColors ? JSON.parse(moodColors) : {};
        } catch {
            return {};
        }
    }
    
    // Save mood colors to localStorage
    saveMoodColors() {
        try {
            localStorage.setItem('colorInspector_moodColors', JSON.stringify(this.moodColors));
        } catch {
            // Handle storage errors silently
        }
    }
}

// Export for use in other modules
window.ColorPersonalization = ColorPersonalization;