<?php

/**
 * Plugin Name: En Construcción
 * Description: Muestra una página de configuración "En Construcción" solo con mantenimiento global.
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
});

function MostrarSeccion()
{
    echo '<div id="enconstruccion-root"></div>';
}

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook === 'toplevel_page_enconstruccion') {
        wp_enqueue_script(
            'enconstruccion-script',
            plugin_dir_url(__FILE__) . 'build/index.js',
            ['wp-element'],
            filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
            true
        );
    }
});

function MostrarPaginasGuardadas()
{
    $diseños = get_option('enconstruccion_disenos', []);

    // Procesar acción global
    if (isset($_POST['activar_global'])) {
        $index = intval($_POST['activar_global']);
        if (isset($diseños[$index])) {
            update_option('enconstruccion_mantenimiento_global', $diseños[$index]);
            echo '<div class="notice notice-success"><p>Mantenimiento global activado.</p></div>';
        }
    }

    if (isset($_POST['desactivar_global'])) {
        delete_option('enconstruccion_mantenimiento_global');
        echo '<div class="notice notice-warning"><p>Mantenimiento global desactivado.</p></div>';
    }

    echo '<div class="wrap"><h1>Mantenimiento Global</h1>';

    // MANTENIMIENTO GLOBAL
    echo '<h2>Mantenimiento global</h2>';
    $global = get_option('enconstruccion_mantenimiento_global', false);

    if ($global) {
        echo '<p><strong>Diseño actual:</strong> ' . esc_html($global['titulo']) . '</p>';
        echo '<form method="post"><input type="submit" name="desactivar_global" class="button" value="❌ Cancelar mantenimiento global"></form>';
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

    // LISTADO DE DISEÑOS
    if (empty($diseños)) {
        echo '<p>No hay diseños guardados.</p></div>';
        return;
    }

    echo '<h2>Diseños disponibles</h2>';
    echo '<table class="widefat fixed"><thead><tr><th>Título</th><th>Fecha</th><th>Vista previa</th></tr></thead><tbody>';
    foreach ($diseños as $d) {
        $url = plugin_dir_url(__FILE__) . 'preview.php?' . http_build_query([
            'bg' => $d['color'],
            'logo' => $d['logo'],
            'font' => $d['fuente'],
            'title' => $d['titulo'],
            'msg' => $d['mensaje'],
            'date' => $d['fecha'],
            'marco' => $d['marco'],
            'ColorLetra' => $d['ColorLetra']
        ]);

        echo '<tr>';
        echo '<td>' . esc_html($d['titulo']) . '</td>';
        echo '<td>' . esc_html($d['fecha_guardado']) . '</td>';
        echo '<td><a href="' . esc_url($url) . '" target="_blank">Ver</a></td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

// Guardar diseño en el backend
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

// Desactivar mantenimiento de una página
add_action('template_redirect', function () {
    if (is_admin()) return;

    if (current_user_can('edit_pages')) return;

    if (!is_singular()) return;

    $id = get_the_ID();
    $global = get_option('enconstruccion_mantenimiento_global', false);

    // Mostrar página en construcción si está activado el mantenimiento global
    if ($global) {
        include plugin_dir_path(__FILE__) . 'ContrucionReal.php';
        exit;
    }
});

// Cargar hojas de estilo y fuentes
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
