// Enhanced Color conversion utilities with additional formats
class ColorConverter {
    // Convert HEX to RGB
    static hexToRgb(hex) {
        hex = hex.replace('#', '');
        
        if (!/^[0-9A-F]{6}$/i.test(hex)) {
            return null;
        }
        
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        return { r, g, b };
    }
    
    // Convert RGB to HEX
    static rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = Math.round(n).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }
    
    // Convert HEX to Short HEX (if possible)
    static hexToShortHex(hex) {
        hex = hex.replace('#', '');
        
        if (hex.length !== 6) return null;
        
        const r1 = hex[0], r2 = hex[1];
        const g1 = hex[2], g2 = hex[3];
        const b1 = hex[4], b2 = hex[5];
        
        if (r1 === r2 && g1 === g2 && b1 === b2) {
            return `#${r1}${g1}${b1}`.toUpperCase();
        }
        
        return null; // Cannot be shortened
    }
    
    // Convert RGB to HSL
    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    // Convert RGB to HSV
    static rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        
        let h = 0;
        const s = max === 0 ? 0 : d / max;
        const v = max;
        
        if (d !== 0) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    }
    
    // Convert RGB to CMYK
    static rgbToCmyk(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const k = 1 - Math.max(r, Math.max(g, b));
        const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
        const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
        const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
        
        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    }
    
    // Convert RGB to Decimal format
    static rgbToDecimal(r, g, b) {
        return `${r}, ${g}, ${b}`;
    }
    
    // Convert RGB to Percent format
    static rgbToPercent(r, g, b) {
        const rPercent = Math.round((r / 255) * 100);
        const gPercent = Math.round((g / 255) * 100);
        const bPercent = Math.round((b / 255) * 100);
        return `${rPercent}%, ${gPercent}%, ${bPercent}%`;
    }
    
    // Calculate relative luminance
    static calculateLuminance(r, g, b) {
        const toLinear = (c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        
        const rLinear = toLinear(r);
        const gLinear = toLinear(g);
        const bLinear = toLinear(b);
        
        return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    }
    
    // Calculate perceived brightness
    static calculateBrightness(r, g, b) {
        return Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000 / 255 * 100);
    }
    
    // Get contrast ratio
    static getContrastRatio(luminance1, luminance2) {
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        return (lighter + 0.05) / (darker + 0.05);
    }
    
    // Get contrast rating
    static getContrastRating(contrastRatio) {
        if (contrastRatio >= 7) return 'AAA';
        if (contrastRatio >= 4.5) return 'AA';
        if (contrastRatio >= 3) return 'A';
        return 'Poor';
    }
    
    // Invert color
    static invertColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;
        
        const inverted = {
            r: 255 - rgb.r,
            g: 255 - rgb.g,
            b: 255 - rgb.b
        };
        
        return this.rgbToHex(inverted.r, inverted.g, inverted.b);
    }
    
    // Get nearest web-safe color
    static getWebSafeColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;
        
        const webSafeValues = [0, 51, 102, 153, 204, 255];
        
        const findNearest = (value) => {
            return webSafeValues.reduce((prev, curr) => 
                Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
            );
        };
        
        const webSafeR = findNearest(rgb.r);
        const webSafeG = findNearest(rgb.g);
        const webSafeB = findNearest(rgb.b);
        
        return this.rgbToHex(webSafeR, webSafeG, webSafeB);
    }
    
    // Get color temperature classification
    static getColorTemperature(r, g, b) {
        // Simple heuristic: compare red vs blue components
        const warmth = (r - b) / 255;
        
        if (warmth > 0.1) return 'Warm';
        if (warmth < -0.1) return 'Cool';
        return 'Neutral';
    }
    
    // Generate random color
    static generateRandomColor() {
        const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        return `#${hex.toUpperCase()}`;
    }
    
    // Validate HEX color
    static isValidHex(hex) {
        hex = hex.replace('#', '');
        return /^[0-9A-F]{6}$/i.test(hex) || /^[0-9A-F]{3}$/i.test(hex);
    }
    
    // Convert all formats from HEX
    static convertFromHex(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;
        
        const { r, g, b } = rgb;
        const hsl = this.rgbToHsl(r, g, b);
        const hsv = this.rgbToHsv(r, g, b);
        const cmyk = this.rgbToCmyk(r, g, b);
        const shortHex = this.hexToShortHex(hex);
        const rgbDecimal = this.rgbToDecimal(r, g, b);
        const rgbPercent = this.rgbToPercent(r, g, b);
        const luminance = this.calculateLuminance(r, g, b);
        const brightness = this.calculateBrightness(r, g, b);
        const inverted = this.invertColor(hex);
        const webSafe = this.getWebSafeColor(hex);
        const temperature = this.getColorTemperature(r, g, b);
        
        // Contrast ratios
        const contrastWhite = this.getContrastRatio(luminance, 1);
        const contrastBlack = this.getContrastRatio(luminance, 0);
        
        return {
            hex: hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`,
            shortHex: shortHex || 'N/A',
            rgb: { r, g, b },
            rgbDecimal,
            rgbPercent,
            hsl,
            hsv,
            cmyk,
            luminance: Math.round(luminance * 100) / 100,
            brightness,
            inverted,
            webSafe,
            temperature,
            contrastWhite: this.getContrastRating(contrastWhite),
            contrastBlack: this.getContrastRating(contrastBlack),
            contrastWhiteRatio: Math.round(contrastWhite * 100) / 100,
            contrastBlackRatio: Math.round(contrastBlack * 100) / 100
        };
    }
}

// CSS Named Colors for nearest color matching
const CSS_NAMED_COLORS = {
    'aliceblue': '#F0F8FF',
    'antiquewhite': '#FAEBD7',
    'aqua': '#00FFFF',
    'aquamarine': '#7FFFD4',
    'azure': '#F0FFFF',
    'beige': '#F5F5DC',
    'bisque': '#FFE4C4',
    'black': '#000000',
    'blanchedalmond': '#FFEBCD',
    'blue': '#0000FF',
    'blueviolet': '#8A2BE2',
    'brown': '#A52A2A',
    'burlywood': '#DEB887',
    'cadetblue': '#5F9EA0',
    'chartreuse': '#7FFF00',
    'chocolate': '#D2691E',
    'coral': '#FF7F50',
    'cornflowerblue': '#6495ED',
    'cornsilk': '#FFF8DC',
    'crimson': '#DC143C',
    'cyan': '#00FFFF',
    'darkblue': '#00008B',
    'darkcyan': '#008B8B',
    'darkgoldenrod': '#B8860B',
    'darkgray': '#A9A9A9',
    'darkgreen': '#006400',
    'darkkhaki': '#BDB76B',
    'darkmagenta': '#8B008B',
    'darkolivegreen': '#556B2F',
    'darkorange': '#FF8C00',
    'darkorchid': '#9932CC',
    'darkred': '#8B0000',
    'darksalmon': '#E9967A',
    'darkseagreen': '#8FBC8F',
    'darkslateblue': '#483D8B',
    'darkslategray': '#2F4F4F',
    'darkturquoise': '#00CED1',
    'darkviolet': '#9400D3',
    'deeppink': '#FF1493',
    'deepskyblue': '#00BFFF',
    'dimgray': '#696969',
    'dodgerblue': '#1E90FF',
    'firebrick': '#B22222',
    'floralwhite': '#FFFAF0',
    'forestgreen': '#228B22',
    'fuchsia': '#FF00FF',
    'gainsboro': '#DCDCDC',
    'ghostwhite': '#F8F8FF',
    'gold': '#FFD700',
    'goldenrod': '#DAA520',
    'gray': '#808080',
    'green': '#008000',
    'greenyellow': '#ADFF2F',
    'honeydew': '#F0FFF0',
    'hotpink': '#FF69B4',
    'indianred': '#CD5C5C',
    'indigo': '#4B0082',
    'ivory': '#FFFFF0',
    'khaki': '#F0E68C',
    'lavender': '#E6E6FA',
    'lavenderblush': '#FFF0F5',
    'lawngreen': '#7CFC00',
    'lemonchiffon': '#FFFACD',
    'lightblue': '#ADD8E6',
    'lightcoral': '#F08080',
    'lightcyan': '#E0FFFF',
    'lightgoldenrodyellow': '#FAFAD2',
    'lightgray': '#D3D3D3',
    'lightgreen': '#90EE90',
    'lightpink': '#FFB6C1',
    'lightsalmon': '#FFA07A',
    'lightseagreen': '#20B2AA',
    'lightskyblue': '#87CEFA',
    'lightslategray': '#778899',
    'lightsteelblue': '#B0C4DE',
    'lightyellow': '#FFFFE0',
    'lime': '#00FF00',
    'limegreen': '#32CD32',
    'linen': '#FAF0E6',
    'magenta': '#FF00FF',
    'maroon': '#800000',
    'mediumaquamarine': '#66CDAA',
    'mediumblue': '#0000CD',
    'mediumorchid': '#BA55D3',
    'mediumpurple': '#9370DB',
    'mediumseagreen': '#3CB371',
    'mediumslateblue': '#7B68EE',
    'mediumspringgreen': '#00FA9A',
    'mediumturquoise': '#48D1CC',
    'mediumvioletred': '#C71585',
    'midnightblue': '#191970',
    'mintcream': '#F5FFFA',
    'mistyrose': '#FFE4E1',
    'moccasin': '#FFE4B5',
    'navajowhite': '#FFDEAD',
    'navy': '#000080',
    'oldlace': '#FDF5E6',
    'olive': '#808000',
    'olivedrab': '#6B8E23',
    'orange': '#FFA500',
    'orangered': '#FF4500',
    'orchid': '#DA70D6',
    'palegoldenrod': '#EEE8AA',
    'palegreen': '#98FB98',
    'paleturquoise': '#AFEEEE',
    'palevioletred': '#DB7093',
    'papayawhip': '#FFEFD5',
    'peachpuff': '#FFDAB9',
    'peru': '#CD853F',
    'pink': '#FFC0CB',
    'plum': '#DDA0DD',
    'powderblue': '#B0E0E6',
    'purple': '#800080',
    'red': '#FF0000',
    'rosybrown': '#BC8F8F',
    'royalblue': '#4169E1',
    'saddlebrown': '#8B4513',
    'salmon': '#FA8072',
    'sandybrown': '#F4A460',
    'seagreen': '#2E8B57',
    'seashell': '#FFF5EE',
    'sienna': '#A0522D',
    'silver': '#C0C0C0',
    'skyblue': '#87CEEB',
    'slateblue': '#6A5ACD',
    'slategray': '#708090',
    'snow': '#FFFAFA',
    'springgreen': '#00FF7F',
    'steelblue': '#4682B4',
    'tan': '#D2B48C',
    'teal': '#008080',
    'thistle': '#D8BFD8',
    'tomato': '#FF6347',
    'turquoise': '#40E0D0',
    'violet': '#EE82EE',
    'wheat': '#F5DEB3',
    'white': '#FFFFFF',
    'whitesmoke': '#F5F5F5',
    'yellow': '#FFFF00',
    'yellowgreen': '#9ACD32'
};

// Find nearest named color
ColorConverter.getNearestNamedColor = function(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 'Unknown';
    
    let minDistance = Infinity;
    let nearestColor = 'Unknown';
    
    for (const [name, colorHex] of Object.entries(CSS_NAMED_COLORS)) {
        const namedRgb = this.hexToRgb(colorHex);
        if (!namedRgb) continue;
        
        // Calculate Euclidean distance in RGB space
        const distance = Math.sqrt(
            Math.pow(rgb.r - namedRgb.r, 2) +
            Math.pow(rgb.g - namedRgb.g, 2) +
            Math.pow(rgb.b - namedRgb.b, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestColor = name;
        }
    }
    
    return nearestColor;
};

// Export for use in other modules
window.ColorConverter = ColorConverter;