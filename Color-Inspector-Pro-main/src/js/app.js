// Enhanced Color Inspector App with all features
class ColorInspectorApp {
    constructor() {
        this.elements = this.initializeElements();
        this.currentColor = '#3B82F6';
        this.personalization = new ColorPersonalization();
        this.colorHistory = this.loadColorHistory();
        this.isDarkTheme = this.loadThemePreference();
        this.isMinimalMode = false;
        this.shortcutsVisible = false;
        
        this.init();
    }
    
    initializeElements() {
        return {
            // Input elements
            colorPicker: document.getElementById('colorPicker'),
            hexInput: document.getElementById('hexInput'),
            colorPreviewLarge: document.getElementById('colorPreviewLarge'),
            randomColorBtn: document.getElementById('randomColorBtn'),
            invertColorBtn: document.getElementById('invertColorBtn'),
            
            // Format display elements
            hexValue: document.getElementById('hexValue'),
            shortHexValue: document.getElementById('shortHexValue'),
            rgbValue: document.getElementById('rgbValue'),
            rgbDecimalValue: document.getElementById('rgbDecimalValue'),
            rgbPercentValue: document.getElementById('rgbPercentValue'),
            hslValue: document.getElementById('hslValue'),
            hsvValue: document.getElementById('hsvValue'),
            cmykValue: document.getElementById('cmykValue'),
            
            // Preview elements
            bgPreviewWhite: document.getElementById('bgPreviewWhite'),
            bgPreviewBlack: document.getElementById('bgPreviewBlack'),
            bgPreviewGray: document.getElementById('bgPreviewGray'),
            typographyPreview: document.getElementById('typographyPreview'),
            gradientPreview: document.getElementById('gradientPreview'),
            cssBoxPreview: document.getElementById('cssBoxPreview'),
            
            // Analysis elements
            luminanceValue: document.getElementById('luminanceValue'),
            brightnessValue: document.getElementById('brightnessValue'),
            contrastWhiteValue: document.getElementById('contrastWhiteValue'),
            contrastBlackValue: document.getElementById('contrastBlackValue'),
            temperatureValue: document.getElementById('temperatureValue'),
            webSafeValue: document.getElementById('webSafeValue'),
            namedColorValue: document.getElementById('namedColorValue'),
            invertedValue: document.getElementById('invertedValue'),
            
            // Developer tools elements
            cssCode: document.getElementById('cssCode'),
            tailwindCode: document.getElementById('tailwindCode'),
            scssCode: document.getElementById('scssCode'),
            exportJsonBtn: document.getElementById('exportJsonBtn'),
            
            // Palette elements
            paletteGrid: document.getElementById('paletteGrid'),
            generateShadesBtn: document.getElementById('generateShadesBtn'),
            generateTintsBtn: document.getElementById('generateTintsBtn'),
            generateComplementaryBtn: document.getElementById('generateComplementaryBtn'),
            generateTriadicBtn: document.getElementById('generateTriadicBtn'),
            
            // Math playground elements
            blendColor1: document.getElementById('blendColor1'),
            blendColor2: document.getElementById('blendColor2'),
            blendRatio: document.getElementById('blendRatio'),
            blendResult: document.getElementById('blendResult'),
            lightenSlider: document.getElementById('lightenSlider'),
            saturateSlider: document.getElementById('saturateSlider'),
            hueSlider: document.getElementById('hueSlider'),
            lightenValue: document.getElementById('lightenValue'),
            saturateValue: document.getElementById('saturateValue'),
            hueValue: document.getElementById('hueValue'),
            mathResult: document.getElementById('mathResult'),
            mathResultPreview: document.getElementById('mathResultPreview'),
            
            // Mockup elements
            mockupButtons: document.getElementById('mockupButtons'),
            mockupForm: document.getElementById('mockupForm'),
            mockupCards: document.getElementById('mockupCards'),
            
            // Personalization elements
            usageStats: document.getElementById('usageStats'),
            todayCount: document.getElementById('todayCount'),
            mostUsedColor: document.getElementById('mostUsedColor'),
            colorStreak: document.getElementById('colorStreak'),
            dailyColor: document.getElementById('dailyColor'),
            dailySwatch: document.getElementById('dailySwatch'),
            dailyName: document.getElementById('dailyName'),
            dailyHex: document.getElementById('dailyHex'),
            
            // Mood elements
            moodResult: document.getElementById('moodResult'),
            
            // UI elements
            presetSwatches: document.getElementById('presetSwatches'),
            colorHistory: document.getElementById('colorHistory'),
            toast: document.getElementById('toast'),
            themeToggle: document.getElementById('themeToggle'),
            modeToggle: document.getElementById('modeToggle'),
            shortcutsHelp: document.getElementById('shortcutsHelp'),
            
            // Copy buttons
            copyButtons: document.querySelectorAll('.copy-btn')
        };
    }
    
    init() {
        this.setupEventListeners();
        this.setupPresetSwatches();
        this.updateColorHistory();
        this.updateColor(this.currentColor);
        this.applyTheme();
        this.setupKeyboardShortcuts();
        this.setupDragAndDrop();
        this.setupMathPlayground();
        this.setupMoodPicker();
        this.updatePersonalizationStats();
        this.updateDailyColor();
        this.loadFromURL();
    }
    
    setupEventListeners() {
        // Color input events
        if (this.elements.colorPicker) {
            this.elements.colorPicker.addEventListener('input', (e) => {
                this.updateColor(e.target.value);
            });
        }
        
        if (this.elements.hexInput) {
            this.elements.hexInput.addEventListener('input', (e) => {
                this.handleHexInput(e);
            });
        }
        
        // Action button events
        if (this.elements.randomColorBtn) {
            this.elements.randomColorBtn.addEventListener('click', () => {
                this.generateRandomColor();
            });
        }
        
        if (this.elements.invertColorBtn) {
            this.elements.invertColorBtn.addEventListener('click', () => {
                this.invertCurrentColor();
            });
        }
        
        // Copy button events
        this.elements.copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const format = e.currentTarget.getAttribute('data-format');
                this.copyToClipboard(format);
            });
        });
        
        // Palette generation events
        if (this.elements.generateShadesBtn) {
            this.elements.generateShadesBtn.addEventListener('click', () => {
                this.generatePalette('shades');
            });
        }
        
        if (this.elements.generateTintsBtn) {
            this.elements.generateTintsBtn.addEventListener('click', () => {
                this.generatePalette('tints');
            });
        }
        
        if (this.elements.generateComplementaryBtn) {
            this.elements.generateComplementaryBtn.addEventListener('click', () => {
                this.generatePalette('complementary');
            });
        }
        
        if (this.elements.generateTriadicBtn) {
            this.elements.generateTriadicBtn.addEventListener('click', () => {
                this.generatePalette('triadic');
            });
        }
        
        // Export events
        if (this.elements.exportJsonBtn) {
            this.elements.exportJsonBtn.addEventListener('click', () => {
                this.exportColorData();
            });
        }
        
        // Theme and mode toggles
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        if (this.elements.modeToggle) {
            this.elements.modeToggle.addEventListener('click', () => {
                this.toggleMode();
            });
        }
    }
    
    setupMathPlayground() {
        // Blend controls
        if (this.elements.blendColor1 && this.elements.blendColor2 && this.elements.blendRatio) {
            const updateBlend = () => {
                const color1 = this.elements.blendColor1.value;
                const color2 = this.elements.blendColor2.value;
                const ratio = this.elements.blendRatio.value / 100;
                
                if (window.ColorMath) {
                    const blended = ColorMath.blendColors(color1, color2, ratio);
                    if (this.elements.blendResult) {
                        this.elements.blendResult.style.backgroundColor = blended;
                    }
                }
            };
            
            this.elements.blendColor1.addEventListener('input', updateBlend);
            this.elements.blendColor2.addEventListener('input', updateBlend);
            this.elements.blendRatio.addEventListener('input', updateBlend);
            updateBlend();
        }
        
        // Adjustment controls
        const setupAdjustmentSlider = (slider, valueElement, adjustFunction) => {
            if (slider && valueElement) {
                slider.addEventListener('input', () => {
                    const value = slider.value;
                    valueElement.textContent = value + (adjustFunction === 'hue' ? '°' : '%');
                    this.updateMathResult();
                });
            }
        };
        
        setupAdjustmentSlider(this.elements.lightenSlider, this.elements.lightenValue, 'lighten');
        setupAdjustmentSlider(this.elements.saturateSlider, this.elements.saturateValue, 'saturate');
        setupAdjustmentSlider(this.elements.hueSlider, this.elements.hueValue, 'hue');
    }
    
    updateMathResult() {
        if (!window.ColorMath || !this.elements.mathResultPreview) return;
        
        let resultColor = this.currentColor;
        
        if (this.elements.lightenSlider) {
            const lightenValue = parseInt(this.elements.lightenSlider.value);
            if (lightenValue !== 0) {
                resultColor = ColorMath.lightenColor(resultColor, lightenValue);
            }
        }
        
        if (this.elements.saturateSlider) {
            const saturateValue = parseInt(this.elements.saturateSlider.value);
            if (saturateValue !== 0) {
                resultColor = ColorMath.saturateColor(resultColor, saturateValue);
            }
        }
        
        if (this.elements.hueSlider) {
            const hueValue = parseInt(this.elements.hueSlider.value);
            if (hueValue !== 0) {
                resultColor = ColorMath.shiftHue(resultColor, hueValue);
            }
        }
        
        this.elements.mathResultPreview.style.backgroundColor = resultColor;
        this.elements.mathResultPreview.textContent = resultColor;
    }
    
    setupMoodPicker() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mood = button.getAttribute('data-mood');
                this.showMoodColors(mood);
                
                // Update active state
                moodButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
    
    showMoodColors(mood) {
        if (!this.elements.moodResult) return;
        
        const colors = this.personalization.getMoodColors(mood);
        
        this.elements.moodResult.innerHTML = `
            <div class="mood-colors">
                ${colors.map(color => `
                    <div class="mood-color" 
                         style="background: ${color}" 
                         title="${color}"
                         data-color="${color}">
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add click handlers to mood colors
        const moodColors = this.elements.moodResult.querySelectorAll('.mood-color');
        moodColors.forEach(colorEl => {
            colorEl.addEventListener('click', () => {
                const color = colorEl.getAttribute('data-color');
                this.updateColor(color);
            });
        });
    }
    
    updatePersonalizationStats() {
        const stats = this.personalization.getUsageStats();
        
        if (this.elements.todayCount) {
            this.elements.todayCount.textContent = stats.todayCount;
        }
        
        if (this.elements.mostUsedColor) {
            this.elements.mostUsedColor.textContent = stats.mostUsedColor;
        }
        
        if (this.elements.colorStreak) {
            this.elements.colorStreak.textContent = `${stats.streak} day${stats.streak !== 1 ? 's' : ''}`;
        }
    }
    
    updateDailyColor() {
        const dailyColor = this.personalization.getDailyColor();
        
        if (this.elements.dailySwatch) {
            this.elements.dailySwatch.style.backgroundColor = dailyColor.color;
        }
        
        if (this.elements.dailyName) {
            this.elements.dailyName.textContent = dailyColor.name;
        }
        
        if (this.elements.dailyHex) {
            this.elements.dailyHex.textContent = dailyColor.color;
        }
        
        // Make daily color clickable
        if (this.elements.dailyColor) {
            this.elements.dailyColor.addEventListener('click', () => {
                this.updateColor(dailyColor.color);
            });
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT') return;
            
            switch (e.key.toLowerCase()) {
                case 'r':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.generateRandomColor();
                    }
                    break;
                case 'i':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.invertCurrentColor();
                    }
                    break;
                case 't':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.toggleTheme();
                    }
                    break;
                case 'c':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.copyToClipboard('hex');
                    }
                    break;
                case '?':
                    e.preventDefault();
                    this.toggleShortcutsHelp();
                    break;
                case 'escape':
                    this.hideShortcutsHelp();
                    break;
            }
        });
    }
    
    setupDragAndDrop() {
        // Make swatches draggable
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('swatch-item') || 
                e.target.classList.contains('history-item') ||
                e.target.classList.contains('palette-color')) {
                e.dataTransfer.setData('text/plain', e.target.style.backgroundColor);
                e.target.classList.add('dragging');
            }
        });
        
        document.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
        
        // Make color preview a drop zone
        if (this.elements.colorPreviewLarge) {
            this.elements.colorPreviewLarge.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.currentTarget.classList.add('drop-zone');
            });
            
            this.elements.colorPreviewLarge.addEventListener('dragleave', (e) => {
                e.currentTarget.classList.remove('drop-zone');
            });
            
            this.elements.colorPreviewLarge.addEventListener('drop', (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drop-zone');
                const color = e.dataTransfer.getData('text/plain');
                if (color) {
                    // Convert RGB to HEX if needed
                    const hexColor = this.rgbToHex(color) || color;
                    this.updateColor(hexColor);
                }
            });
        }
    }
    
    setupPresetSwatches() {
        if (!this.elements.presetSwatches || !window.PaletteGenerator) return;
        
        const presetColors = PaletteGenerator.getPresetColors();
        const swatchesContainer = this.elements.presetSwatches;
        
        swatchesContainer.innerHTML = '';
        
        presetColors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'swatch-item';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.draggable = true;
            
            swatch.addEventListener('click', () => {
                this.updateColor(color);
            });
            
            swatchesContainer.appendChild(swatch);
        });
    }
    
    handleHexInput(e) {
        let value = e.target.value.replace('#', '').toUpperCase();
        
        // Limit to 6 characters
        if (value.length > 6) {
            value = value.substr(0, 6);
            e.target.value = value;
        }
        
        // Only allow valid hex characters
        value = value.replace(/[^0-9A-F]/g, '');
        e.target.value = value;
        
        if (value.length === 6 && ColorConverter.isValidHex(value)) {
            this.updateColor(`#${value}`);
        } else if (value.length === 3 && ColorConverter.isValidHex(value)) {
            // Expand short hex
            const expanded = value.split('').map(char => char + char).join('');
            this.updateColor(`#${expanded}`);
        }
    }
    
    updateColor(hexColor) {
        if (!ColorConverter.isValidHex(hexColor)) {
            return;
        }
        
        this.currentColor = hexColor;
        this.addToHistory(hexColor);
        this.updateURL(hexColor);
        this.personalization.trackColorUsage(hexColor);
        
        const colorData = ColorConverter.convertFromHex(hexColor);
        if (!colorData) return;
        
        // Update input elements
        if (this.elements.colorPicker) {
            this.elements.colorPicker.value = hexColor;
        }
        if (this.elements.hexInput) {
            this.elements.hexInput.value = hexColor.replace('#', '');
        }
        if (this.elements.colorPreviewLarge) {
            this.elements.colorPreviewLarge.style.backgroundColor = hexColor;
        }
        
        // Add updating animation
        this.addUpdatingAnimation();
        
        // Update format displays
        setTimeout(() => {
            this.updateFormatDisplays(colorData);
            this.updatePreviews(colorData);
            this.updateAnalysis(colorData);
            this.updateDeveloperTools(colorData);
            this.updateMockups(colorData);
            this.updateMathResult();
            this.updatePersonalizationStats();
            this.removeUpdatingAnimation();
        }, 100);
    }
    
    updateFormatDisplays(colorData) {
        if (this.elements.hexValue) this.elements.hexValue.textContent = colorData.hex;
        if (this.elements.shortHexValue) this.elements.shortHexValue.textContent = colorData.shortHex;
        if (this.elements.rgbValue) this.elements.rgbValue.textContent = `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`;
        if (this.elements.rgbDecimalValue) this.elements.rgbDecimalValue.textContent = colorData.rgbDecimal;
        if (this.elements.rgbPercentValue) this.elements.rgbPercentValue.textContent = colorData.rgbPercent;
        if (this.elements.hslValue) this.elements.hslValue.textContent = `hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)`;
        if (this.elements.hsvValue) this.elements.hsvValue.textContent = `hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)`;
        if (this.elements.cmykValue) this.elements.cmykValue.textContent = `cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)`;
    }
    
    updatePreviews(colorData) {
        const color = colorData.hex;
        
        // Background previews
        if (this.elements.bgPreviewWhite) this.elements.bgPreviewWhite.style.color = color;
        if (this.elements.bgPreviewBlack) this.elements.bgPreviewBlack.style.color = color;
        if (this.elements.bgPreviewGray) this.elements.bgPreviewGray.style.color = color;
        
        // Typography preview
        if (this.elements.typographyPreview) {
            const typographyElements = this.elements.typographyPreview.querySelectorAll('*');
            typographyElements.forEach(el => {
                el.style.color = color;
            });
        }
        
        // Gradient preview
        if (this.elements.gradientPreview) {
            this.elements.gradientPreview.style.background = 
                `linear-gradient(135deg, ${color} 0%, ${colorData.inverted} 100%)`;
        }
        
        // CSS box preview
        if (this.elements.cssBoxPreview) {
            const sampleBox = this.elements.cssBoxPreview.querySelector('.sample-box');
            if (sampleBox) {
                sampleBox.style.backgroundColor = color;
                sampleBox.style.color = window.ColorAnalysis ? ColorAnalysis.getBestTextColor(color) : '#FFFFFF';
            }
        }
    }
    
    updateAnalysis(colorData) {
        if (this.elements.luminanceValue) this.elements.luminanceValue.textContent = colorData.luminance;
        if (this.elements.brightnessValue) this.elements.brightnessValue.textContent = `${colorData.brightness}%`;
        if (this.elements.contrastWhiteValue) this.elements.contrastWhiteValue.textContent = colorData.contrastWhite;
        if (this.elements.contrastBlackValue) this.elements.contrastBlackValue.textContent = colorData.contrastBlack;
        if (this.elements.temperatureValue) this.elements.temperatureValue.textContent = colorData.temperature;
        if (this.elements.webSafeValue) this.elements.webSafeValue.textContent = colorData.webSafe;
        if (this.elements.namedColorValue) this.elements.namedColorValue.textContent = ColorConverter.getNearestNamedColor(colorData.hex);
        if (this.elements.invertedValue) this.elements.invertedValue.textContent = colorData.inverted;
    }
    
    updateDeveloperTools(colorData) {
        if (this.elements.cssCode) this.elements.cssCode.innerHTML = `<code>color: ${colorData.hex};</code>`;
        if (this.elements.tailwindCode) this.elements.tailwindCode.innerHTML = `<code>text-[${colorData.hex}]</code>`;
        if (this.elements.scssCode) this.elements.scssCode.innerHTML = `<code>$primary-color: ${colorData.hex};</code>`;
    }
    
    updateMockups(colorData) {
        const color = colorData.hex;
        
        // Update button mockups
        if (this.elements.mockupButtons) {
            const primaryBtn = this.elements.mockupButtons.querySelector('.primary');
            if (primaryBtn) {
                primaryBtn.style.backgroundColor = color;
                primaryBtn.style.color = window.ColorAnalysis ? ColorAnalysis.getBestTextColor(color) : '#FFFFFF';
            }
            
            const outlineBtn = this.elements.mockupButtons.querySelector('.outline');
            if (outlineBtn) {
                outlineBtn.style.borderColor = color;
                outlineBtn.style.color = color;
            }
        }
        
        // Update form mockups
        if (this.elements.mockupForm) {
            const input = this.elements.mockupForm.querySelector('.mockup-input');
            if (input) {
                input.style.borderColor = color;
            }
            
            const select = this.elements.mockupForm.querySelector('.mockup-select');
            if (select) {
                select.style.borderColor = color;
            }
        }
        
        // Update card mockups
        if (this.elements.mockupCards) {
            const cardHeader = this.elements.mockupCards.querySelector('.card-header');
            if (cardHeader) {
                cardHeader.style.backgroundColor = color;
                cardHeader.style.color = window.ColorAnalysis ? ColorAnalysis.getBestTextColor(color) : '#FFFFFF';
            }
        }
    }
    
    addUpdatingAnimation() {
        const formatValues = document.querySelectorAll('.format-value');
        formatValues.forEach(el => el.classList.add('updating'));
    }
    
    removeUpdatingAnimation() {
        const formatValues = document.querySelectorAll('.format-value');
        formatValues.forEach(el => el.classList.remove('updating'));
    }
    
    generateRandomColor() {
        const randomColor = ColorConverter.generateRandomColor();
        this.updateColor(randomColor);
        this.showToast('Random color generated! 🎲');
    }
    
    invertCurrentColor() {
        const inverted = ColorConverter.invertColor(this.currentColor);
        if (inverted) {
            this.updateColor(inverted);
            this.showToast('Color inverted! 🔄');
        }
    }
    
    generatePalette(type) {
        if (!window.PaletteGenerator || !this.elements.paletteGrid) return;
        
        const colors = PaletteGenerator.generatePalette(this.currentColor, type, 8);
        this.displayPalette(colors, type);
        
        // Update active button
        document.querySelectorAll('.palette-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`generate${type.charAt(0).toUpperCase() + type.slice(1)}Btn`);
        if (activeBtn) activeBtn.classList.add('active');
    }
    
    displayPalette(colors, type) {
        const paletteGrid = this.elements.paletteGrid;
        paletteGrid.innerHTML = '';
        
        colors.forEach((color, index) => {
            const colorElement = document.createElement('div');
            colorElement.className = 'palette-color';
            colorElement.style.backgroundColor = color;
            colorElement.title = color;
            colorElement.draggable = true;
            
            const label = document.createElement('span');
            label.className = 'palette-color-label';
            label.textContent = color;
            colorElement.appendChild(label);
            
            colorElement.addEventListener('click', () => {
                this.updateColor(color);
            });
            
            paletteGrid.appendChild(colorElement);
        });
        
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} palette generated! 🎨`);
    }
    
    copyToClipboard(format) {
        let textToCopy = '';
        
        switch (format) {
            case 'hex':
                textToCopy = this.elements.hexValue?.textContent || this.currentColor;
                break;
            case 'shortHex':
                textToCopy = this.elements.shortHexValue?.textContent || 'N/A';
                break;
            case 'rgb':
                textToCopy = this.elements.rgbValue?.textContent || '';
                break;
            case 'rgbDecimal':
                textToCopy = this.elements.rgbDecimalValue?.textContent || '';
                break;
            case 'rgbPercent':
                textToCopy = this.elements.rgbPercentValue?.textContent || '';
                break;
            case 'hsl':
                textToCopy = this.elements.hslValue?.textContent || '';
                break;
            case 'hsv':
                textToCopy = this.elements.hsvValue?.textContent || '';
                break;
            case 'cmyk':
                textToCopy = this.elements.cmykValue?.textContent || '';
                break;
            case 'css':
                textToCopy = `color: ${this.currentColor};`;
                break;
            case 'tailwind':
                textToCopy = `text-[${this.currentColor}]`;
                break;
            case 'scss':
                textToCopy = `$primary-color: ${this.currentColor};`;
                break;
        }
        
        if (textToCopy && textToCopy !== 'N/A') {
            this.writeToClipboard(textToCopy, format);
        }
    }
    
    async writeToClipboard(text, format) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                this.showToast(`${format.toUpperCase()} copied to clipboard! 📋`);
            } else {
                this.fallbackCopyToClipboard(text, format);
            }
        } catch (err) {
            this.fallbackCopyToClipboard(text, format);
        }
    }
    
    fallbackCopyToClipboard(text, format) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast(`${format.toUpperCase()} copied to clipboard! 📋`);
        } catch (err) {
            this.showToast('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    exportColorData() {
        const colorData = ColorConverter.convertFromHex(this.currentColor);
        const exportData = {
            color: this.currentColor,
            formats: {
                hex: colorData.hex,
                shortHex: colorData.shortHex,
                rgb: colorData.rgb,
                rgbDecimal: colorData.rgbDecimal,
                rgbPercent: colorData.rgbPercent,
                hsl: colorData.hsl,
                hsv: colorData.hsv,
                cmyk: colorData.cmyk
            },
            analysis: {
                luminance: colorData.luminance,
                brightness: colorData.brightness,
                temperature: colorData.temperature,
                inverted: colorData.inverted,
                webSafe: colorData.webSafe,
                namedColor: ColorConverter.getNearestNamedColor(colorData.hex),
                contrastWhite: colorData.contrastWhite,
                contrastBlack: colorData.contrastBlack
            },
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `color-${this.currentColor.replace('#', '')}-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast('Color data exported! 💾');
    }
    
    addToHistory(color) {
        // Remove if already exists
        this.colorHistory = this.colorHistory.filter(c => c !== color);
        
        // Add to beginning
        this.colorHistory.unshift(color);
        
        // Limit to 20 colors
        if (this.colorHistory.length > 20) {
            this.colorHistory = this.colorHistory.slice(0, 20);
        }
        
        this.saveColorHistory();
        this.updateColorHistory();
    }
    
    updateColorHistory() {
        if (!this.elements.colorHistory) return;
        
        const historyContainer = this.elements.colorHistory;
        historyContainer.innerHTML = '';
        
        this.colorHistory.forEach(color => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.style.backgroundColor = color;
            historyItem.title = color;
            historyItem.draggable = true;
            
            historyItem.addEventListener('click', () => {
                this.updateColor(color);
            });
            
            historyContainer.appendChild(historyItem);
        });
    }
    
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();
        this.saveThemePreference();
        this.showToast(`${this.isDarkTheme ? 'Dark' : 'Light'} theme activated! 🌙`);
    }
    
    applyTheme() {
        const container = document.getElementById('appContainer');
        const themeIcon = this.elements.themeToggle?.querySelector('.theme-icon');
        
        if (this.isDarkTheme) {
            container?.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            container?.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }
    
    toggleMode() {
        this.isMinimalMode = !this.isMinimalMode;
        const container = document.getElementById('appContainer');
        const modeIcon = this.elements.modeToggle?.querySelector('.mode-icon');
        
        if (this.isMinimalMode) {
            container?.classList.add('minimal-mode');
            if (modeIcon) modeIcon.textContent = '🔧';
            this.showToast('Minimal mode activated! ⚡');
        } else {
            container?.classList.remove('minimal-mode');
            if (modeIcon) modeIcon.textContent = '⚡';
            this.showToast('Full mode activated! 🔧');
        }
    }
    
    toggleShortcutsHelp() {
        this.shortcutsVisible = !this.shortcutsVisible;
        const help = this.elements.shortcutsHelp;
        
        if (this.shortcutsVisible) {
            help?.classList.add('show');
        } else {
            help?.classList.remove('show');
        }
    }
    
    hideShortcutsHelp() {
        this.shortcutsVisible = false;
        this.elements.shortcutsHelp?.classList.remove('show');
    }
    
    showToast(message, type = 'success') {
        if (!this.elements.toast) return;
        
        const toast = this.elements.toast;
        const toastMessage = toast.querySelector('.toast-message');
        
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    loadFromURL() {
        const hash = window.location.hash.substring(1);
        if (hash && ColorConverter.isValidHex(`#${hash}`)) {
            this.updateColor(`#${hash}`);
        }
    }
    
    updateURL(color) {
        const hash = color.replace('#', '');
        window.history.replaceState(null, null, `#${hash}`);
    }
    
    rgbToHex(rgb) {
        const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            return ColorConverter.rgbToHex(r, g, b);
        }
        return null;
    }
    
    // Local storage methods
    loadColorHistory() {
        try {
            const history = localStorage.getItem('colorInspector_history');
            return history ? JSON.parse(history) : [];
        } catch {
            return [];
        }
    }
    
    saveColorHistory() {
        try {
            localStorage.setItem('colorInspector_history', JSON.stringify(this.colorHistory));
        } catch {
            // Handle storage errors silently
        }
    }
    
    loadThemePreference() {
        try {
            const theme = localStorage.getItem('colorInspector_theme');
            return theme === 'dark';
        } catch {
            return false;
        }
    }
    
    saveThemePreference() {
        try {
            localStorage.setItem('colorInspector_theme', this.isDarkTheme ? 'dark' : 'light');
        } catch {
            // Handle storage errors silently
        }
    }
    
    // Public methods for external use
    setColor(hexColor) {
        this.updateColor(hexColor);
    }
    
    getCurrentColor() {
        return ColorConverter.convertFromHex(this.currentColor);
    }
    
    exportPalette(format = 'json') {
        const paletteColors = Array.from(document.querySelectorAll('.palette-color'))
            .map(el => el.title || el.style.backgroundColor);
        
        return window.PaletteGenerator ? PaletteGenerator.exportPalette(paletteColors, format) : '[]';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorInspectorApp = new ColorInspectorApp();
    
    // Add some fun easter eggs
    console.log('🎨 Color Inspector Pro loaded!');
    console.log('Try these keyboard shortcuts:');
    console.log('R - Random color');
    console.log('I - Invert color');
    console.log('T - Toggle theme');
    console.log('? - Show help');
    console.log('Ctrl+C - Copy HEX');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.colorInspectorApp) {
        // Refresh when page becomes visible (useful for PWA)
        window.colorInspectorApp.updateColor(window.colorInspectorApp.currentColor);
    }
});

// Handle hash changes for bookmarkable URLs
window.addEventListener('hashchange', () => {
    if (window.colorInspectorApp) {
        window.colorInspectorApp.loadFromURL();
    }
});