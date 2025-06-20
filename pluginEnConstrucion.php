<?php

/**
 * Plugin Name: En Construcción
 * Description: Muestra una página de configuración "En Construcción".
 * Version: 1.0
 * Author: Lin
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

defined('ABSPATH') || exit;

add_action('admin_menu', function () {
    add_menu_page(
        'En Construcción',
        'En Construcción',
        'manage_options',
        'enconstruccion',
        'MostrarSeccion',
        'dashicons-hammer',
        80
    );

    add_submenu_page(
        'enconstruccion',
        'Mantenimiento Global',
        'Mantenimiento Global',
        'manage_options',
        'mantenimiento-global',
        'MostrarMantenimientoGlobal'
    );
});

function MostrarSeccion()
{
    echo '<div id="enconstruccion-root"></div>';
}

function MostrarMantenimientoGlobal()
{
    $diseños = get_option('enconstruccion_disenos', []);

    // Procesar acciones globales
    if (isset($_POST['activar_global'])) {
        $index = intval($_POST['activar_global']);
        if (isset($diseños[$index])) {
            update_option('enconstruccion_mantenimiento_global', $diseños[$index]);
            echo '<div class="notice notice-success"><p>Mantenimiento global activado.</p></div>';
        }
    }

    if (isset($_POST['desactivar_global'])) {
        // Aquí corregimos para eliminar la opción del mantenimiento global
        delete_option('enconstruccion_mantenimiento_global');
        echo '<div class="notice notice-warning"><p>Mantenimiento global desactivado.</p></div>';
    }

    echo '<div class="wrap"><h1>Mantenimiento Global</h1>';

    // MANTENIMIENTO GLOBAL
    echo '<h2>Diseños disponibles</h2>';
    $global = get_option('enconstruccion_mantenimiento_global', false);

    if ($global) {
        echo '<p><strong>Diseño actual:</strong> ' . esc_html($global['titulo']) . '</p>';
        echo '<form method="post" action="">
                <input type="submit" name="desactivar_global" class="button" value="❌ Cancelar mantenimiento global">
              </form>';
    } else {
        echo '<p>Haz clic en un diseño para aplicarlo globalmente:</p>';
        echo '<ul>';
        foreach ($diseños as $i => $d) {
            echo '<li>
                <form method="post" style="display:inline">
                    <input type="hidden" name="activar_global" value="' . esc_attr($i) . '">
                    <button class="button button-secondary">' . esc_html($d['titulo']) . '</button>
                </form>
            </li>';
        }
        echo '</ul>';
    }

    echo '</div>';
}

add_action('admin_enqueue_scripts', function ($hook) {
    if (!in_array($hook, ['toplevel_page_enconstruccion', 'en-construccion_page_mantenimiento-global'])) return;
    wp_enqueue_media();
    wp_enqueue_script(
        'enconstruccion-script',
        plugin_dir_url(__FILE__) . 'build/index.js',
        ['wp-element'],
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
        true
    );
    wp_localize_script('enconstruccion-script', 'EnConstruccionData', [
        'previewUrl' => plugin_dir_url(__FILE__) . 'preview.php',
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'imagesBaseUrl' => plugin_dir_url(__FILE__) . 'marcos/' // Aquí añadimos la ruta de las imágenes
    ]);
});

add_action('wp_ajax_guardar_diseño', function () {
    $diseños = get_option('enconstruccion_disenos', []);
    $nuevo = [
        'color' => sanitize_hex_color($_POST['color']),
        'logo' => esc_url_raw($_POST['logo']),
        'fuente' => sanitize_text_field($_POST['fuente']),
        'titulo' => sanitize_text_field($_POST['titulo']),
        'mensaje' => sanitize_textarea_field($_POST['mensaje']),
        'fecha' => sanitize_text_field($_POST['fecha']),
        'marco' => sanitize_text_field($_POST['marcoSeleccionado']),
        'ColorLetra' => sanitize_hex_color($_POST['letraColor']),
        'fecha_guardado' => current_time('mysql'),
    ];
    $diseños[] = $nuevo;
    update_option('enconstruccion_disenos', $diseños);
    wp_send_json_success(['mensaje' => 'Diseño guardado correctamente.']);
});

add_action('template_redirect', function () {
    if (is_admin()) return;

    if (current_user_can('edit_pages')) return;

    if (!is_singular()) return;

    $id = get_the_ID();
    $global = get_option('enconstruccion_mantenimiento_global', false);

    // Mostrar página en construcción si procede
    if ($global) {
        if (is_array($global)) {
            include plugin_dir_path(__FILE__) . 'ContrucionReal.php';
            exit;
        }
    }
});

function ImplementarCss()
{
    wp_enqueue_style(
        'mi-plugin-styles',
        plugin_dir_url(__FILE__) . 'assets/preview.css',
        [], 
        null,
        'all'
    );
}
add_action('wp_enqueue_scripts', 'ImplementarCss');

function ImplementarFuente()
{
    global $font;
    if (isset($font) && $font === 'Roboto') {
        wp_enqueue_style(
            'google-roboto-font',
            'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
            [], 
            null
        );
    }
}
add_action('wp_enqueue_scripts', 'ImplementarFuente');

