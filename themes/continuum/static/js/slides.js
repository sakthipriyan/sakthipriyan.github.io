let isInitialLoad = true;

// Render DOT diagrams in a slide (or all slides if slide=null)
function renderGraphviz(slide = null) {
    const slides = slide ? [slide] : Array.from(Reveal.getSlides());
    slides.forEach(slideEl => {
        slideEl.querySelectorAll('pre code.dot, pre.language-dot, pre.dot').forEach(codeEl => {
            if (codeEl.dataset.rendered) return;

            const dotCode = codeEl.textContent.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
            console.log('[DEBUG] Rendering DOT block:\n', dotCode);

            const viz = new Viz();
            viz.renderSVGElement(dotCode)
                .then(svg => {
                    // Remove width/height attributes from SVG for auto-scaling
                    svg.removeAttribute('width');
                    svg.removeAttribute('height');
                    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                    // Wrap in a flex container
                    const container = document.createElement('div');
                    container.className = 'graphviz';
                    container.appendChild(svg);

                    // Replace the <pre> entirely
                    const preEl = codeEl.parentNode;
                    preEl.parentNode.replaceChild(container, preEl);

                    codeEl.dataset.rendered = true;
                    console.log('[DEBUG] Diagram rendered and pre replaced.');
                })
                .catch(err => {
                    console.error('[DEBUG] Viz.js error:', err);
                    codeEl.parentNode.textContent = "Error rendering diagram: " + err;
                });
        });
    });
}

// Initialize ECharts in containers with data-chart attribute
function initializeECharts(slide = null) {
    if (typeof echarts === 'undefined') return;
    
    // If initializing a specific slide, wait for it to be visible
    if (slide) {
        // Use requestAnimationFrame to ensure the slide transition is complete
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slide.querySelectorAll('.echarts-container[data-chart]').forEach(container => {
                    console.log('[DEBUG] Processing chart container:', container.id, 'has instance:', !!container._chartInstance);
                    
                    // Always dispose and recreate to replay animation
                    if (container._chartInstance) {
                        console.log('[DEBUG] Disposing existing chart instance:', container.id);
                        container._chartInstance.dispose();
                        container._chartInstance = null;
                    }
                    
                    try {
                        const config = JSON.parse(container.dataset.chart);
                        
                        console.log('[DEBUG] Creating new chart instance:', container.id);
                        
                        // Get existing instance or create new one
                        // This prevents multiple instances on the same DOM element
                        let chart = echarts.getInstanceByDom(container);
                        
                        if (chart) {
                            console.log('[DEBUG] Found existing ECharts instance, disposing it:', container.id);
                            chart.dispose();
                            chart = null;
                        }
                        
                        // Clear the container completely
                        container.innerHTML = '';
                        
                        // Initialize fresh chart
                        chart = echarts.init(container);
                        
                        // Set option with notMerge=true to force complete refresh and replay animation
                        chart.setOption(config, true);
                        
                        // Store chart instance
                        container._chartInstance = chart;
                        container.dataset.initialized = true;
                        
                        // Force resize after initialization
                        setTimeout(() => chart.resize(), 100);
                        
                        console.log('[DEBUG] ECharts initialized with animation:', container.id);
                    } catch (err) {
                        console.error('[DEBUG] ECharts error:', err);
                    }
                });
            });
        });
    } else {
        // Initial render for all slides - only initialize current slide
        const currentSlide = Reveal.getCurrentSlide();
        if (currentSlide) {
            initializeECharts(currentSlide);
        }
    }
    
    // Handle window resize
    window.removeEventListener('resize', handleChartResize);
    window.addEventListener('resize', handleChartResize);
}

function handleChartResize() {
    document.querySelectorAll('.echarts-container[data-initialized]').forEach(container => {
        if (container._chartInstance) {
            container._chartInstance.resize();
        }
    });
}

// Trigger GSAP animations on slide change
function triggerGSAPAnimations(slide) {
    if (typeof gsap === 'undefined') {
        console.log('[DEBUG] GSAP not loaded');
        return;
    }
    if (!slide) {
        console.log('[DEBUG] No slide provided to triggerGSAPAnimations');
        return;
    }
    
    // Use requestAnimationFrame to ensure slide is visible
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Reset animations on all slides first
            document.querySelectorAll('[data-gsap]').forEach(el => {
                delete el.dataset.gsapAnimated;
                // Reset element to original state
                gsap.set(el, { clearProps: "all" });
            });
            
            // Auto-animate elements with data-gsap attribute on current slide
            const elements = slide.querySelectorAll('[data-gsap]');
            console.log('[DEBUG] Found', elements.length, 'elements with data-gsap on current slide');
            
            elements.forEach(el => {
                if (el.dataset.gsapAnimated) return;
                
                try {
                    const config = JSON.parse(el.dataset.gsap);
                    console.log('[DEBUG] Animating element with config:', config);
                    
                    // Extract 'from' properties and other options
                    const { from, ...options } = config;
                    const animationVars = { ...from, ...options };
                    
                    gsap.from(el, animationVars);
                    el.dataset.gsapAnimated = true;
                    console.log('[DEBUG] GSAP animation triggered for element:', el);
                } catch (err) {
                    console.error('[DEBUG] GSAP error:', err);
                }
            });
            
            // Scramble text effect for title slide elements
            triggerScrambleEffect(slide);
        });
    });
}

// Scramble text effect function
function triggerScrambleEffect(slide) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*0123456789';
    
    function scrambleText(element, finalText, duration, delay) {
        console.log('[SCRAMBLE] Starting scramble for:', finalText);
        
        const iterations = Math.floor(duration * 60); // 60 fps
        let currentIteration = 0;
        const startDelay = delay * 1000;
        
        // Store original text content (this automatically strips HTML and normalizes whitespace)
        const originalText = element.textContent.trim();
        
        // Immediately show fully scrambled text
        let initialScrambled = '';
        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            const code = char.charCodeAt(0);
            // Preserve emojis (check for surrogate pairs and high Unicode values) and spaces
            if (code >= 0xD800 || char === ' ') {
                initialScrambled += char;
            } else {
                initialScrambled += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        element.textContent = initialScrambled;
        
        setTimeout(() => {
            const interval = setInterval(() => {
                let scrambled = '';
                
                for (let i = 0; i < originalText.length; i++) {
                    const char = originalText[i];
                    const code = char.charCodeAt(0);
                    
                    // Preserve only emojis (check for surrogate pairs) and spaces
                    if (code >= 0xD800 || char === ' ') {
                        scrambled += char;
                    } else if (char === '\n' || char === '\r') {
                        // Skip newlines
                        continue;
                    } else {
                        // Check if this character should be revealed yet
                        const revealThreshold = (currentIteration / iterations) * originalText.length;
                        
                        if (i < revealThreshold) {
                            scrambled += char;
                        } else {
                            scrambled += chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                }
                
                element.textContent = scrambled;
                currentIteration++;
                
                if (currentIteration >= iterations) {
                    clearInterval(interval);
                    element.textContent = originalText;
                    console.log('[SCRAMBLE] Completed:', originalText);
                }
            }, (duration * 1000) / iterations);
        }, startDelay);
    }
    
    // Find scramble elements on the slide
    const scrambleElements = slide.querySelectorAll('.title-scramble');
    
    scrambleElements.forEach((element, index) => {
        if (!element.dataset.scrambled) {
            const text = element.textContent.trim();
            const delay = 0.5 + (index * 0.5); // Stagger delays: 0.5s, 1s, 1.5s, etc.
            console.log(`[SCRAMBLE] Found title-scramble[${index}]:`, text, 'delay:', delay);
            scrambleText(element, text, 2, delay);
            element.dataset.scrambled = true;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    Reveal.initialize({
        hash: true,
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
        transition: 'slide',
        slideNumber: false,
        margin: 0.05,
        width: "100%",
        height: "100%",
        minScale: 1,
        maxScale: 1,
        progress: true
    });

    // Pre-render all slides after Markdown is parsed
    Reveal.addEventListener('ready', event => {
        console.log('[DEBUG] Reveal ready, rendering all slides...');
        // Force parse all slides
        Reveal.getSlides().forEach(slideEl => {
            if (slideEl.dataset.parsed) return;
            if (slideEl.querySelector('textarea[data-template]')) {
                RevealMarkdown.parseSlide(slideEl);
                slideEl.dataset.parsed = true;
            }
        });
        renderGraphviz(); // render all slides (diagrams don't have animations)
        triggerGSAPAnimations(event.currentSlide); // trigger initial animations
        // Don't initialize charts on ready - let slidechanged handle it
    });

    // Render diagrams on slide change (for dynamically added slides)
    Reveal.on('slidechanged', event => {
        console.log('[DEBUG] Slide changed to index', event.indexh);
        
        // Clean up charts on previous slide
        if (event.previousSlide) {
            event.previousSlide.querySelectorAll('.echarts-container[data-chart]').forEach(container => {
                if (container._chartInstance) {
                    console.log('[DEBUG] Disposing chart on previous slide:', container.id);
                    container._chartInstance.dispose();
                    container._chartInstance = null;
                    container.innerHTML = '';
                    delete container.dataset.initialized;
                }
            });
            
            // Reset scramble flags when leaving first slide
            event.previousSlide.querySelectorAll('.title-scramble').forEach(el => {
                delete el.dataset.scrambled;
            });
        }
        
        // Render new slide
        renderGraphviz(event.currentSlide);
        triggerGSAPAnimations(event.currentSlide);
        
        // Delay chart initialization to make animation visible
        setTimeout(() => {
            initializeECharts(event.currentSlide);
        }, 300);
    });

    // Render diagrams when Markdown plugin parses a slide
    Reveal.addEventListener('markdown', event => {
        console.log('[DEBUG] Markdown parsed for slide', event.slide);
        renderGraphviz(event.slide);
        // Don't initialize charts here - let slidechanged handle it to preserve animations
    });
});

// OBS WebSocket Integration
// Enable OBS support if ?obs=host:port or ?obs=host:port:password is present in the URL
(function() {
    function getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }
    const obsParam = getQueryParam('obs');
    if (obsParam) {
        // obsParam format: host:port or host:port:password (password may contain colons)
        const parts = obsParam.split(":");
        let host = parts[0] || "";
        let port = parts[1] || "";
        let password = "";
        if (parts.length > 2) {
            // Join everything after the second part as password (to support colons in password)
            password = parts.slice(2).join(":");
        }
        if (!host || !port) {
            host = prompt("Enter OBS host (e.g. 192.168.1.100):", "localhost") || "localhost";
            port = prompt("Enter OBS port (e.g. 4455):", "4455") || "4455";
        }
        const obsWsUrl = `ws://${host}:${port}`;

        // Inject obs-websocket-js
        var obsScript = document.createElement('script');
        obsScript.src = 'https://cdn.jsdelivr.net/npm/obs-websocket-js';
        obsScript.onload = function() {
            const obs = new OBSWebSocket();

            const connectToObs = async () => {
                try {
                    await obs.connect(obsWsUrl, password);
                    console.log('Connected to OBS!');
                    
                    // Fetch available scenes from OBS
                    try {
                        const { scenes } = await obs.call('GetSceneList');
                        obsScenes = scenes.map(scene => scene.sceneName).reverse();
                        console.log('Available OBS scenes:', obsScenes);
                        
                        if (obsScenes.length === 0) {
                            console.warn('No scenes found in OBS, using default scenes');
                            obsScenes = ["Screen Only", "Video RB", "Video Only"];
                        }
                        
                        // Get current scene and set index
                        const { currentProgramSceneName } = await obs.call('GetCurrentProgramScene');
                        obsSceneIndex = obsScenes.indexOf(currentProgramSceneName);
                        if (obsSceneIndex === -1) obsSceneIndex = 0;
                        console.log(`Current scene: ${currentProgramSceneName}, index: ${obsSceneIndex}`);
                    } catch (error) {
                        console.error('Failed to fetch scenes from OBS:', error);
                        obsScenes = ["Screen Only", "Video RB", "Video Only"];
                    }
                } catch (error) {
                    console.error('Failed to connect:', error);
                }
            };

            const switchScene = async (sceneName) => {
                try {
                    await obs.call('SetCurrentProgramScene', { sceneName });
                    console.log(`Switched to scene: ${sceneName}`);
                } catch (error) {
                    console.error('Failed to switch scene:', error);
                }
            };

            connectToObs();

            let obsSceneIndex = 0;
            let obsScenes = ["Screen Only", "Video RB", "Video Only"]; // Default fallback

            document.addEventListener("keydown", (e) => {
                const key = e.key;
                if (key != "b" && key != "Escape" && key != "Shift" &&
                        key != "F5" && key != "Alt" && key != "Meta" && key != "π") {
                        return;
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                if (key === "b") {
                        obsSceneIndex = (obsSceneIndex - 1 + obsScenes.length) % obsScenes.length;
                } else if (key === "Escape" || key === "π") {
                        obsSceneIndex = (obsSceneIndex + 1) % obsScenes.length;
                }
                if (key === "b" || key === "Escape" || key === "π") {
                        const currentScene = obsScenes[obsSceneIndex];
                        switchScene(currentScene);
                }
            }, true);
        };
        document.body.appendChild(obsScript);
    }
})();
