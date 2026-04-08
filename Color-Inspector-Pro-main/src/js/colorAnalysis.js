// Color Analysis utilities for advanced color operations
class ColorAnalysis {
    // Calculate Delta E (CIE76) - perceptual color difference
    static calculateDeltaE(rgb1, rgb2) {
        // Convert RGB to LAB color space first
        const lab1 = this.rgbToLab(rgb1.r, rgb1.g, rgb1.b);
        const lab2 = this.rgbToLab(rgb2.r, rgb2.g, rgb2.b);
        
        // Calculate Delta E using CIE76 formula
        const deltaL = lab1.l - lab2.l;
        const deltaA = lab1.a - lab2.a;
        const deltaB = lab1.b - lab2.b;
        
        return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
    }
    
    // Convert RGB to LAB color space
    static rgbToLab(r, g, b) {
        // First convert RGB to XYZ
        const xyz = this.rgbToXyz(r, g, b);
        
        // Then convert XYZ to LAB
        return this.xyzToLab(xyz.x, xyz.y, xyz.z);
    }
    
    // Convert RGB to XYZ color space
    static rgbToXyz(r, g, b) {
        // Normalize RGB values
        r = r / 255;
        g = g / 255;
        b = b / 255;
        
        // Apply gamma correction
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        
        // Convert to XYZ using sRGB matrix
        const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
        const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
        const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
        
        return { x: x * 100, y: y * 100, z: z * 100 };
    }
    
    // Convert XYZ to LAB color space
    static xyzToLab(x, y, z) {
        // Reference white D65
        const xn = 95.047;
        const yn = 100.000;
        const zn = 108.883;
        
        x = x / xn;
        y = y / yn;
        z = z / zn;
        
        const fx = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x + 16/116);
        const fy = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y + 16/116);
        const fz = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z + 16/116);
        
        const l = 116 * fy - 16;
        const a = 500 * (fx - fy);
        const b = 200 * (fy - fz);
        
        return { l, a, b };
    }
    
    // Generate color harmony schemes
    static generateColorHarmony(hex, type) {
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return [];
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const colors = [];
        
        switch (type) {
            case 'complementary':
                colors.push(hex);
                colors.push(this.adjustHue(hex, 180));
                break;
                
            case 'triadic':
                colors.push(hex);
                colors.push(this.adjustHue(hex, 120));
                colors.push(this.adjustHue(hex, 240));
                break;
                
            case 'tetradic':
                colors.push(hex);
                colors.push(this.adjustHue(hex, 90));
                colors.push(this.adjustHue(hex, 180));
                colors.push(this.adjustHue(hex, 270));
                break;
                
            case 'analogous':
                colors.push(this.adjustHue(hex, -30));
                colors.push(hex);
                colors.push(this.adjustHue(hex, 30));
                break;
                
            case 'splitComplementary':
                colors.push(hex);
                colors.push(this.adjustHue(hex, 150));
                colors.push(this.adjustHue(hex, 210));
                break;
                
            default:
                colors.push(hex);
        }
        
        return colors;
    }
    
    // Adjust hue of a color
    static adjustHue(hex, degrees) {
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return hex;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.h = (hsl.h + degrees + 360) % 360;
        
        return this.hslToHex(hsl.h, hsl.s, hsl.l);
    }
    
    // Convert HSL to RGB
    static hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    
    // Convert HSL to HEX
    static hslToHex(h, s, l) {
        const rgb = this.hslToRgb(h, s, l);
        return ColorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    
    // Generate shades (darker versions)
    static generateShades(hex, count = 5) {
        const colors = [];
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return colors;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        for (let i = 0; i < count; i++) {
            const lightness = Math.max(0, hsl.l - (i + 1) * (hsl.l / (count + 1)));
            colors.push(this.hslToHex(hsl.h, hsl.s, lightness));
        }
        
        return colors;
    }
    
    // Generate tints (lighter versions)
    static generateTints(hex, count = 5) {
        const colors = [];
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return colors;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        for (let i = 0; i < count; i++) {
            const lightness = Math.min(100, hsl.l + (i + 1) * ((100 - hsl.l) / (count + 1)));
            colors.push(this.hslToHex(hsl.h, hsl.s, lightness));
        }
        
        return colors;
    }
    
    // Generate monochromatic palette
    static generateMonochromatic(hex, count = 7) {
        const colors = [];
        const rgb = ColorConverter.hexToRgb(hex);
        if (!rgb) return colors;
        
        const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // Generate colors with varying lightness
        for (let i = 0; i < count; i++) {
            const lightness = (i / (count - 1)) * 100;
            colors.push(this.hslToHex(hsl.h, hsl.s, lightness));
        }
        
        return colors;
    }
    
    // Check if color is accessible for text
    static isAccessibleText(backgroundColor, textColor, level = 'AA') {
        const bgRgb = ColorConverter.hexToRgb(backgroundColor);
        const textRgb = ColorConverter.hexToRgb(textColor);
        
        if (!bgRgb || !textRgb) return false;
        
        const bgLuminance = ColorConverter.calculateLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
        const textLuminance = ColorConverter.calculateLuminance(textRgb.r, textRgb.g, textRgb.b);
        
        const contrastRatio = ColorConverter.getContrastRatio(bgLuminance, textLuminance);
        
        switch (level) {
            case 'AAA': return contrastRatio >= 7;
            case 'AA': return contrastRatio >= 4.5;
            case 'A': return contrastRatio >= 3;
            default: return contrastRatio >= 4.5;
        }
    }
    
    // Get best text color (black or white) for a background
    static getBestTextColor(backgroundColor) {
        const rgb = ColorConverter.hexToRgb(backgroundColor);
        if (!rgb) return '#000000';
        
        const luminance = ColorConverter.calculateLuminance(rgb.r, rgb.g, rgb.b);
        
        // Use white text for dark backgrounds, black for light backgrounds
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    
    // Blend two colors
    static blendColors(color1, color2, ratio = 0.5) {
        const rgb1 = ColorConverter.hexToRgb(color1);
        const rgb2 = ColorConverter.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return color1;
        
        const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
        const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
        const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);
        
        return ColorConverter.rgbToHex(r, g, b);
    }
    
    // Generate gradient colors
    static generateGradient(startColor, endColor, steps = 5) {
        const colors = [];
        
        for (let i = 0; i < steps; i++) {
            const ratio = i / (steps - 1);
            colors.push(this.blendColors(startColor, endColor, ratio));
        }
        
        return colors;
    }
}

// Export for use in other modules
window.ColorAnalysis = ColorAnalysis;