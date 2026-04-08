// Color Export utilities for various formats and documentation
class ColorExporter {
    // Export Tailwind CSS theme configuration
    static exportTailwindTheme(colors, themeName = 'custom') {
        const theme = {
            extend: {
                colors: {}
            }
        };
        
        // If single color, generate full palette
        if (typeof colors === 'string') {
            const baseColor = colors;
            const shades = ColorAnalysis.generateShades(baseColor, 4);
            const tints = ColorAnalysis.generateTints(baseColor, 4);
            
            theme.extend.colors[themeName] = {
                50: tints[3],
                100: tints[2],
                200: tints[1],
                300: tints[0],
                400: ColorMath.lightenColor(baseColor, -10),
                500: baseColor,
                600: ColorMath.darkenColor(baseColor, 10),
                700: shades[0],
                800: shades[1],
                900: shades[2],
                950: shades[3]
            };
        } else if (Array.isArray(colors)) {
            // Multiple colors as palette
            colors.forEach((color, index) => {
                theme.extend.colors[`${themeName}-${index + 1}`] = color;
            });
        }
        
        return `module.exports = {
  theme: ${JSON.stringify(theme, null, 4)}
}`;
    }
    
    // Generate comprehensive color documentation
    static generateColorDocumentation(color, includeAnalysis = true) {
        const colorData = ColorConverter.convertFromHex(color);
        if (!colorData) return null;
        
        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Documentation - ${color}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8fafc;
        }
        .color-header {
            background: ${color};
            color: ${ColorAnalysis.getBestTextColor(color)};
            padding: 3rem 2rem;
            border-radius: 1rem;
            text-align: center;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .color-title {
            font-size: 2.5rem;
            margin: 0 0 0.5rem 0;
            font-weight: 700;
        }
        .color-subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
            margin: 0;
        }
        .section {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .section h2 {
            color: #1e293b;
            border-bottom: 2px solid ${color};
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
        }
        .format-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        .format-item {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
            border-left: 4px solid ${color};
        }
        .format-label {
            font-weight: 600;
            color: #64748b;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .format-value {
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 1.125rem;
            color: #1e293b;
            margin-top: 0.25rem;
        }
    </style>
</head>
<body>
    <div class="color-header">
        <h1 class="color-title">${color}</h1>
        <p class="color-subtitle">${ColorConverter.getNearestNamedColor(color)}</p>
    </div>
    
    <div class="section">
        <h2>Color Formats</h2>
        <div class="format-grid">
            <div class="format-item">
                <div class="format-label">HEX</div>
                <div class="format-value">${colorData.hex}</div>
            </div>
            <div class="format-item">
                <div class="format-label">RGB</div>
                <div class="format-value">rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})</div>
            </div>
            <div class="format-item">
                <div class="format-label">HSL</div>
                <div class="format-value">hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)</div>
            </div>
            <div class="format-item">
                <div class="format-label">HSV</div>
                <div class="format-value">hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)</div>
            </div>
            <div class="format-item">
                <div class="format-label">CMYK</div>
                <div class="format-value">cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        
        return html;
    }
    
    // Export color as SVG swatch
    static generateSVGSwatch(color, size = 200) {
        const colorData = ColorConverter.convertFromHex(color);
        const textColor = ColorAnalysis.getBestTextColor(color);
        
        return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
          fill="${textColor}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${color}
    </text>
    <text x="50%" y="70%" text-anchor="middle" dominant-baseline="middle" 
          fill="${textColor}" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
        ${ColorConverter.getNearestNamedColor(color)}
    </text>
</svg>`;
    }
    
    // Export palette as Adobe Swatch Exchange (ASE) format data
    static generateASEData(colors) {
        // Simplified ASE-like format for demonstration
        const aseData = {
            version: '1.0',
            colors: colors.map((color, index) => {
                const rgb = ColorConverter.hexToRgb(color);
                return {
                    name: `Color ${index + 1}`,
                    type: 'RGB',
                    values: rgb ? [rgb.r / 255, rgb.g / 255, rgb.b / 255] : [0, 0, 0]
                };
            })
        };
        
        return JSON.stringify(aseData, null, 2);
    }
    
    // Download file helper
    static downloadFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
}

// Export for use in other modules
window.ColorExporter = ColorExporter;