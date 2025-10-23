(function () {
    const { registerPlugin } = wp.plugins;
    const { PluginSidebar } = wp.editPost;
    const { PanelBody, ToggleControl } = wp.components;
    const el = wp.element.createElement;
    const { useState, useEffect } = wp.element;

    // Usamos las traducciones pasadas desde PHP
    const __ = key => FocuseditI18n[key] || key;

    // Constante para la clave de localStorage
    const STORAGE_KEY = 'focusedit-settings'; 

    function FocusEditSidebar() {
        const defaultSettings = {
            hideTitle: false,
            cleanInterface: false,
            topBarSpacing: false,
            collapsibleTopBar: false,
            floatingSidePanels: false,
            floatingBottomPanel: false,
            manualPin: false,
            smartExpansion: false,
            minimalScrollbars: false,
            floatingArrow: false
        };

        const [settings, setSettings] = useState(() => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const loadedSettings = Object.keys(defaultSettings).reduce((acc, key) => {
                        acc[key] = typeof parsed[key] === 'boolean' ? parsed[key] : defaultSettings[key];
                        return acc;
                    }, {});
                    return loadedSettings;
                }
            } catch (error) {
                console.error("Error loading focusedit settings from localStorage:", error);
            }
            return defaultSettings;
        });

        useEffect(() => {
            Object.entries(settings).forEach(([key, value]) => {
                document.body.classList.toggle(`focusedit-${key}`, value);
            });
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

            if (settings.smartExpansion) initPopoverExpansionSystem();
            if (settings.manualPin) {
                initAnchoringSystem();
                initPanelObservers();
            }
        }, [settings]);

        return el(
            PluginSidebar,
            { name: 'focusedit-sidebar', title: __('pluginTitle') },
            el(
                PanelBody,
                { title: __('settingsTitle') },
				Object.keys(settings).map(key => {
					const label = __(key);
					const desc = FocuseditI18n['desc_' + key]; // ✅ Accede directamente al objeto

					return el('div', { key, style: { marginBottom: '12px' } },
						el(ToggleControl, {
							label: label,
							checked: settings[key],
							onChange: value => setSettings(prev => ({ ...prev, [key]: value }))
						}),
						desc && el('small', {
							style: { opacity: 0.7, fontSize: '12px' }
						}, desc)
					);
				})
            )
        );
    }

    registerPlugin('focusedit', { render: FocusEditSidebar });

// ----------------------------------------------------------------------

// === SISTEMA EXPANSIÓN Y ANCLAJE JS ===

    function initPopoverExpansionSystem() {
        const rightPanel = document.querySelector('.interface-navigable-region.interface-interface-skeleton__sidebar');
        if (!rightPanel) return;

        let closeTimeout;

        function isPopoverRelevant(popoverContent) {
            return popoverContent.querySelector(
                'input, button, select, textarea, [data-wp-component], .react-colorful, .eb-ai-form'
            );
        }

        function isRightPanelActive(panel) {
            return panel.querySelector('.interface-complementary-area__fill') ||
                panel.querySelector('input, button, select, textarea, [data-wp-component]');
        }

        document.addEventListener('mouseenter', function (e) {
            const popoverContent = e.target.closest('.components-popover');
            if (popoverContent && isPopoverRelevant(popoverContent) && isRightPanelActive(rightPanel)) {
                clearTimeout(closeTimeout);
                rightPanel.classList.add('force-expand');
            }
        }, true);

        document.addEventListener('mouseleave', function (e) {
            const popoverContent = e.target.closest('.components-popover');
            if (popoverContent && isPopoverRelevant(popoverContent)) {
                clearTimeout(closeTimeout);
                closeTimeout = setTimeout(() => {
                    if (!rightPanel.classList.contains('pinned')) {
                        rightPanel.classList.remove('force-expand');
                    }
                }, 2000);
            }
        }, true);
    }

    function initAnchoringSystem() {
        document.addEventListener('click', function (e) {
            if (
                e.target.closest('.block-editor-tabbed-sidebar__tablist-and-close-button') &&
                e.target.tagName !== 'BUTTON' &&
                !e.target.closest('.block-editor-tabbed-sidebar__tablist-and-close-button button')
            ) {
                const panel = document.querySelector('.interface-interface-skeleton__secondary-sidebar');
                if (panel) panel.classList.toggle('pinned');
                return;
            }

            if (
                e.target.closest('.components-panel__header') &&
                e.target.tagName !== 'BUTTON' &&
                !e.target.closest('.components-panel__header button')
            ) {
                const panel = document.querySelector('.interface-interface-skeleton__sidebar');
                if (panel) panel.classList.toggle('pinned');
                return;
            }

            if (
                e.target.closest('.interface-interface-skeleton__header') &&
                !e.target.closest('button, a')
            ) {
                const panel = e.target.closest('.interface-interface-skeleton__header');
                if (panel) panel.classList.toggle('pinned');
                return;
            }

            if (
                e.target.closest('.interface-interface-skeleton__footer') &&
                !e.target.closest('button, a')
            ) {
                const panel = e.target.closest('.interface-interface-skeleton__footer');
                if (panel) panel.classList.toggle('pinned');
            }
        }, true);
    }

    function initPanelObservers() {
        const leftPanel = document.querySelector('.interface-interface-skeleton__secondary-sidebar');
        const rightPanel = document.querySelector('.interface-interface-skeleton__sidebar');

        if (leftPanel) {
            const leftObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (
                        mutation.type === 'childList' &&
                        !leftPanel.querySelector('.interface-complementary-area__fill') &&
                        leftPanel.classList.contains('pinned')
                    ) {
                        leftPanel.classList.remove('pinned');
                    }
                });
            });
            leftObserver.observe(leftPanel, { childList: true, subtree: true });
        }

        if (rightPanel) {
            const rightObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (
                        mutation.type === 'childList' &&
                        !rightPanel.querySelector('.interface-complementary-area__fill') &&
                        rightPanel.classList.contains('pinned')
                    ) {
                        rightPanel.classList.remove('pinned');
                    }
                });
            });
            rightObserver.observe(rightPanel, { childList: true, subtree: true });
        }
    }
})();