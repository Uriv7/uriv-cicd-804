// Palette Generator for creating color schemes and palettes
class PaletteGenerator {
    // Predefined color swatches
    static getPresetColors() {
        return [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
            '#A3E4D7', '#F9E79F', '#D5A6BD', '#AED6F1', '#A9DFBF',
            '#FAD7A0', '#D2B4DE', '#AED6F1', '#A3E4D7', '#F7DC6F'
        ];
    }
    
    // Material Design color palette
    static getMaterialColors() {
        return {
            red: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
            pink: ['#FCE4EC', '#F8BBD9', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F'],
            purple: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
            blue: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
            green: ['#E8F5E8', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'],
            orange: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100']
        };
    }
    
    // Generate palette based on base color and type
    static generatePalette(baseColor, type, count = 5) {
        switch (type) {
            case 'shades':
                return ColorAnalysis.generateShades(baseColor, count);
            case 'tints':
                return ColorAnalysis.generateTints(baseColor, count);
            case 'monochromatic':
                return ColorAnalysis.generateMonochromatic(baseColor, count);
            case 'complementary':
                return ColorAnalysis.generateColorHarmony(baseColor, 'complementary');
            case 'triadic':
                return ColorAnalysis.generateColorHarmony(baseColor, 'triadic');
            case 'tetradic':
                return ColorAnalysis.generateColorHarmony(baseColor, 'tetradic');
            case 'analogous':
                return ColorAnalysis.generateColorHarmony(baseColor, 'analogous');
            case 'splitComplementary':
                return ColorAnalysis.generateColorHarmony(baseColor, 'splitComplementary');
            default:
                return [baseColor];
        }
    }
    
    // Generate theme colors from base color
    static generateTheme(baseColor) {
        const rgb = ColorConverter.hexToRgb(baseColor);
        if (!rgb) return null;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        return {
            primary: baseColor,
            primaryLight: ColorAnalysis.hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
            primaryDark: ColorAnalysis.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
            secondary: ColorAnalysis.adjustHue(baseColor, 180),
            accent: ColorAnalysis.adjustHue(baseColor, 60),
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336',
            info: '#2196F3',
            background: '#FFFFFF',
            surface: '#F5F5F5',
            onPrimary: ColorAnalysis.getBestTextColor(baseColor),
            onSecondary: ColorAnalysis.getBestTextColor(ColorAnalysis.adjustHue(baseColor, 180)),
            onBackground: '#000000',
            onSurface: '#000000'
        };
    }
    
    // Generate accessible color pairs
    static generateAccessiblePairs(baseColor) {
        const pairs = [];
        const testColors = ['#FFFFFF', '#000000', '#F5F5F5', '#333333', '#666666', '#999999'];
        
        testColors.forEach(testColor => {
            if (ColorAnalysis.isAccessibleText(baseColor, testColor, 'AA')) {
                pairs.push({
                    background: baseColor,
                    text: testColor,
                    contrast: ColorConverter.getContrastRatio(
                        ColorConverter.calculateLuminance(...Object.values(ColorConverter.hexToRgb(baseColor))),
                        ColorConverter.calculateLuminance(...Object.values(ColorConverter.hexToRgb(testColor)))
                    ).toFixed(2)
                });
            }
        });
        
        return pairs;
    }
    
    // Generate gradient palette
    static generateGradientPalette(startColor, endColor, steps = 10) {
        return ColorAnalysis.generateGradient(startColor, endColor, steps);
    }
    
    // Generate random palette
    static generateRandomPalette(count = 5) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(ColorConverter.generateRandomColor());
        }
        return colors;
    }
    
    // Generate palette from image (placeholder for future implementation)
    static generatePaletteFromImage(imageData) {
        // This would analyze image pixels and extract dominant colors
        // For now, return a placeholder palette
        return [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'
        ];
    }
    
    // Get trending color palettes
    static getTrendingPalettes() {
        return {
            'Sunset Vibes': ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500'],
            'Ocean Breeze': ['#0F3460', '#16537e', '#1E90FF', '#87CEEB', '#E0F6FF'],
            'Forest Dreams': ['#2D5016', '#3E6B1F', '#4F7942', '#60A85F', '#8FBC8F'],
            'Cosmic Purple': ['#2C003E', '#512B58', '#8E44AD', '#BB8FCE', '#E8DAEF'],
            'Warm Autumn': ['#8B4513', '#CD853F', '#DEB887', '#F4A460', '#FFEFD5'],
            'Cool Winter': ['#1C1C1C', '#2F4F4F', '#4682B4', '#87CEEB', '#F0F8FF'],
            'Spring Fresh': ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#F0FFF0'],
            'Retro Neon': ['#FF1493', '#00FFFF', '#FFFF00', '#FF4500', '#9400D3']
        };
    }
    
    // Export palette as various formats
    static exportPalette(colors, format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(colors, null, 2);
            case 'css':
                return colors.map((color, index) => 
                    `--color-${index + 1}: ${color};`
                ).join('\n');
            case 'scss':
                return colors.map((color, index) => 
                    `$color-${index + 1}: ${color};`
                ).join('\n');
            case 'tailwind':
                const tailwindColors = {};
                colors.forEach((color, index) => {
                    tailwindColors[`custom-${index + 1}`] = color;
                });
                return JSON.stringify({ colors: tailwindColors }, null, 2);
            case 'adobe':
                // Adobe Swatch Exchange format (simplified)
                return colors.map(color => {
                    const rgb = ColorConverter.hexToRgb(color);
                    return `${rgb.r},${rgb.g},${rgb.b}`;
                }).join('\n');
            default:
                return colors.join('\n');
        }
    }
    
    // Analyze palette harmony
    static analyzePaletteHarmony(colors) {
        if (colors.length < 2) return 'Single Color';
        
        const hues = colors.map(color => {
            const rgb = ColorConverter.hexToRgb(color);
            if (!rgb) return 0;
            const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
            return hsl.h;
        });
        
        // Check for common harmony types
        const sortedHues = [...hues].sort((a, b) => a - b);
        const differences = [];
        
        for (let i = 1; i < sortedHues.length; i++) {
            differences.push(sortedHues[i] - sortedHues[i - 1]);
        }
        
        // Simple harmony detection
        const avgDifference = differences.reduce((a, b) => a + b, 0) / differences.length;
        
        if (avgDifference < 30) return 'Analogous';
        if (Math.abs(avgDifference - 120) < 20) return 'Triadic';
        if (Math.abs(avgDifference - 180) < 20) return 'Complementary';
        if (Math.abs(avgDifference - 90) < 20) return 'Tetradic';
        
        return 'Custom Harmony';
    }
}

// Export for use in other modules
window.PaletteGenerator = PaletteGenerator;