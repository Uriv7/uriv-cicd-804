// Color Math utilities for advanced color operations
class ColorMath {
    // Blend two colors with a given ratio
    static blendColors(color1, color2, ratio = 0.5) {
        const rgb1 = ColorConverter.hexToRgb(color1);
        const rgb2 = ColorConverter.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return color1;
        
        const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
        const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
        const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);
        
        return ColorConverter.rgbToHex(r, g, b);
    }
    
    // Lighten a color by a percentage
    static lightenColor(hex, percentage) {
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return hex;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newLightness = Math.min(100, Math.max(0, hsl.l + percentage));
        
        return ColorAnalysis.hslToHex(hsl.h, hsl.s, newLightness);
    }
    
    // Darken a color by a percentage
    static darkenColor(hex, percentage) {
        return this.lightenColor(hex, -percentage);
    }
    
    // Saturate a color by a percentage
    static saturateColor(hex, percentage) {
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return hex;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newSaturation = Math.min(100, Math.max(0, hsl.s + percentage));
        
        return ColorAnalysis.hslToHex(hsl.h, newSaturation, hsl.l);
    }
    
    // Desaturate a color by a percentage
    static desaturateColor(hex, percentage) {
        return this.saturateColor(hex, -percentage);
    }
    
    // Shift hue by degrees
    static shiftHue(hex, degrees) {
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return hex;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newHue = (hsl.h + degrees + 360) % 360;
        
        return ColorAnalysis.hslToHex(newHue, hsl.s, hsl.l);
    }
    
    // Generate color transition steps
    static generateTransition(fromColor, toColor, steps = 10) {
        const colors = [];
        
        for (let i = 0; i < steps; i++) {
            const ratio = i / (steps - 1);
            colors.push(this.blendColors(fromColor, toColor, ratio));
        }
        
        return colors;
    }
    
    // Generate CSS keyframes for color animation
    static generateCSSKeyframes(fromColor, toColor, duration = 2, property = 'background-color') {
        const keyframes = `
@keyframes colorTransition {
    0% {
        ${property}: ${fromColor};
    }
    100% {
        ${property}: ${toColor};
    }
}

.color-animation {
    animation: colorTransition ${duration}s ease-in-out infinite alternate;
}`;
        
        return keyframes;
    }
    
    // Calculate color difference using Delta E
    static calculateColorDifference(color1, color2) {
        const rgb1 = ColorConverter.hexToRgb(color1);
        const rgb2 = ColorConverter.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return 0;
        
        return ColorAnalysis.calculateDeltaE(rgb1, rgb2);
    }
    
    // Find the most contrasting color from a palette
    static findMostContrasting(baseColor, palette) {
        let maxContrast = 0;
        let mostContrasting = palette[0];
        
        const baseLuminance = ColorConverter.calculateLuminance(
            ...Object.values(ColorConverter.hexToRgb(baseColor))
        );
        
        palette.forEach(color => {
            const rgb = ColorConverter.hexToRgb(color);
            if (!rgb) return;
            
            const luminance = ColorConverter.calculateLuminance(rgb.r, rgb.g, rgb.b);
            const contrast = ColorConverter.getContrastRatio(baseLuminance, luminance);
            
            if (contrast > maxContrast) {
                maxContrast = contrast;
                mostContrasting = color;
            }
        });
        
        return mostContrasting;
    }
    
    // Generate accessible color variations
    static generateAccessibleVariations(baseColor, targetContrast = 4.5) {
        const variations = [];
        const rgb = ColorConverter.hexToRgb(baseColor);
        if (!rgb) return variations;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const baseLuminance = ColorConverter.calculateLuminance(rgb.r, rgb.g, rgb.b);
        
        // Generate lighter variations
        for (let lightness = hsl.l + 5; lightness <= 100; lightness += 5) {
            const testColor = ColorAnalysis.hslToHex(hsl.h, hsl.s, lightness);
            const testRgb = ColorConverter.hexToRgb(testColor);
            if (!testRgb) continue;
            
            const testLuminance = ColorConverter.calculateLuminance(testRgb.r, testRgb.g, testRgb.b);
            const contrast = ColorConverter.getContrastRatio(baseLuminance, testLuminance);
            
            if (contrast >= targetContrast) {
                variations.push({
                    color: testColor,
                    contrast: Math.round(contrast * 100) / 100,
                    type: 'lighter'
                });
                break;
            }
        }
        
        // Generate darker variations
        for (let lightness = hsl.l - 5; lightness >= 0; lightness -= 5) {
            const testColor = ColorAnalysis.hslToHex(hsl.h, hsl.s, lightness);
            const testRgb = ColorConverter.hexToRgb(testColor);
            if (!testRgb) continue;
            
            const testLuminance = ColorConverter.calculateLuminance(testRgb.r, testRgb.g, testRgb.b);
            const contrast = ColorConverter.getContrastRatio(baseLuminance, testLuminance);
            
            if (contrast >= targetContrast) {
                variations.push({
                    color: testColor,
                    contrast: Math.round(contrast * 100) / 100,
                    type: 'darker'
                });
                break;
            }
        }
        
        return variations;
    }
}

// Export for use in other modules
window.ColorMath = ColorMath;