<?php
/**
 * Plugin Name: FocusEdit
 * Description: Mejora la interfaz del editor de bloques con opciones visuales avanzadas, paneles flotantes, anclaje manual y expansión inteligente. Modular, reversible y sin base de datos.
 * Version: 1.0.0
 * Author: Antonio Romani
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: focusedit
 * Domain Path: /languages
 * Requires at least: 6.4
 * Tested up to: 6.8
 */

defined('ABSPATH') || exit;

function focusedit_enqueue_assets() {
    $screen = get_current_screen();
    if (!$screen || !in_array($screen->base, ['post', 'page'])) return;

    $plugin_url = plugin_dir_url(__FILE__);

    wp_enqueue_style('focusedit-style', $plugin_url . 'build/style.css', [], '1.0.0');

    wp_enqueue_script(
        'focusedit-script',
        $plugin_url . 'build/index.js',
        ['wp-plugins', 'wp-edit-post', 'wp-components', 'wp-element'],
        '1.0.0',
        true
    );

    // Traducciones pasadas desde PHP (en español como base)

    $labels = [
        'pluginTitle' => __('FocusEdit', 'focusedit'),
        'settingsTitle' => __('Ajustes del editor', 'focusedit'),
        'hideTitle' => __('Ocultar título del editor', 'focusedit'),
        'cleanInterface' => __('Interfaz limpia', 'focusedit'),
        'topBarSpacing' => __('Barra superior con espacios optimizados', 'focusedit'),
        'collapsibleTopBar' => __('Barra superior colapsable', 'focusedit'),
        'floatingSidePanels' => __('Paneles laterales flotantes', 'focusedit'),
        'floatingBottomPanel' => __('Panel inferior flotante', 'focusedit'),
        'manualPin' => __('Anclaje manual de paneles con clic en espacio libre', 'focusedit'),
        'smartExpansion' => __('Expansión inteligente en panel derecho', 'focusedit'),
        'minimalScrollbars' => __('Scrollbars mínimalistas en paneles', 'focusedit'),
        'floatingArrow' => __('Flecha en paneles flotantes', 'focusedit'),
        'desc_hideTitle' => __('Funciona con algunos temas y plugins: Spectra One, Ultimate Blocks, Otter, Getwig, Publishpress, Essential Blocks... no con: Kadence, Greenshift...', 'focusedit'),
        'desc_cleanInterface' => __('Optimiza espacios en el Content Canvas y paneles', 'focusedit'),
        'desc_manualPin' => __('En los paneles laterales, debe hacer clic en espacio libre de barra superior', 'focusedit'),
        'desc_smartExpansion' => __('Mostrar panel bloques al mouseover sobre Block Toolbar en el Content Canvas. Funciona con algunos temas y plugins.', 'focusedit'),
    ];

    wp_localize_script('focusedit-script', 'FocuseditI18n', $labels);
}
add_action('enqueue_block_editor_assets', 'focusedit_enqueue_assets');