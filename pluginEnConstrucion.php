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
        60
    );

    add_submenu_page(
        'enconstruccion',
        'Mis páginas guardadas',
        'Mis páginas guardadas',
        'manage_options',
        'paginas-guardadas',
        'MostrarPaginasGuardadas'
    );
});

function MostrarSeccion()
{

    echo '<div id="enconstruccion-root"></div>';
}

function MostrarPaginasGuardadas()
{
    $diseños = get_option('enconstruccion_disenos', []);

    if (isset($_POST['BorrarPlantilla'])) {
        $fecha = sanitize_text_field($_POST['BorrarPlantilla']);
        $diseños = array_filter($diseños, fn($d) => $d['fecha_guardado'] !== $fecha);
        update_option('enconstruccion_disenos', $diseños);
        echo '<div class="notice notice-success"><p>Diseño eliminado correctamente.</p></div>';
    }

    echo '<div class="wrap"><h1>Mis diseños guardados</h1>';
    if (empty($diseños)) {
        echo '<p>No hay diseños guardados.</p></div>';
        return;
    }

    echo '<table class="widefat fixed"><thead><tr><th>Título</th><th>Fecha</th><th>Vista previa</th><th>Eliminar</th></tr></thead><tbody>';
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
        echo '<td><form method="post" onsubmit="return confirm(\'Eliminar?\');">
                <input type="hidden" name="BorrarPlantilla" value="' . esc_attr($d['fecha_guardado']) . '">
                <input type="submit" class="button button-secondary" value="Eliminar">
              </form></td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}
add_action('admin_enqueue_scripts', function ($hook) {
    if (!in_array($hook, ['toplevel_page_enconstruccion', 'en-construccion_page_paginas-guardadas'])) return;
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

add_filter('manage_pages_columns', function ($columnasPropia) {
    $columnasPropia['mantenimiento'] = 'Mantenimiento';
    return $columnasPropia;
});

add_action('manage_pages_custom_column', function ($column_name, $post_id) {
    if ($column_name === 'mantenimiento') {
        $activo = get_post_meta($post_id, 'ConstrucionActivado', true);
        if ($activo) {
            echo '<button class="boton-terminar" data-postid="' . esc_attr($post_id) . '">Terminar</button>';
        } else {
            echo '<button class="boton-activar" data-postid="' . esc_attr($post_id) . '">Mantener</button>';
        }
    }
}, 10, 2);

add_action('wp_ajax_activar_diseño_directo', function () {
    $id = intval($_POST['post_id']);
    $diseños = get_option('enconstruccion_disenos', []);
    $seleccionado = intval($_POST['index']);
    if (!isset($diseños[$seleccionado])) wp_send_json_error();
    update_post_meta($id, 'ConstrucionActivado', true);
    update_post_meta($id, 'ConstrucionDiseno', $diseños[$seleccionado]);
    wp_send_json_success();
});

add_action('wp_ajax_desactivar_diseño_directo', function () {
    $id = intval($_POST['post_id']);
    delete_post_meta($id, 'ConstrucionActivado');
    delete_post_meta($id, 'ConstrucionDiseno');
    wp_send_json_success();
});
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook === 'edit.php') {
        wp_enqueue_style(
            'enconstruccion-admin-style',
            plugin_dir_url(__FILE__) . 'assets/admin.css',
            [],
            filemtime(plugin_dir_path(__FILE__) . 'assets/admin.css')
        );
    }
});


add_action('admin_footer-edit.php', function () {
    if (get_current_screen()->id !== 'edit-page') return;
    $diseños = get_option('enconstruccion_disenos', []);
?>
    <script>
        document.querySelectorAll('.boton-activar').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const postID = btn.dataset.postid;
                const lista = document.createElement('ul');
                lista.className = 'lista-disenos';

                <?php foreach ($diseños as $i => $d): ?>
                    const li<?php echo esc_js($i); ?> = document.createElement('li');
                    li<?php echo esc_js($i); ?>.textContent = "<?php echo esc_js($d['titulo']); ?>";
                    li<?php echo esc_js($i); ?>.addEventListener('click', () => {
                        fetch(ajaxurl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: `action=activar_diseño_directo&post_id=${postID}&index=<?php echo esc_js($i); ?>`
                        }).then(res => res.json()).then(() => location.reload());
                    });
                    lista.appendChild(li<?php echo esc_js($i); ?>);
                <?php endforeach; ?>

                btn.replaceWith(lista);
            });
        });

        document.querySelectorAll('.boton-terminar').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const postID = btn.dataset.postid;
                fetch(ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `action=desactivar_diseño_directo&post_id=${postID}`
                }).then(res => res.json()).then(() => location.reload());
            });
        });
    </script>
<?php
});


add_action('template_redirect', function () {
    if (!is_singular()) return;
    $id = get_the_ID();
    $activo = get_post_meta($id, 'ConstrucionActivado', true);
    $diseño = get_post_meta($id, 'ConstrucionDiseno', true);
    if ($activo && is_array($diseño)) {
        include plugin_dir_path(__FILE__) . 'ContrucionReal.php';
        exit;
    }
});

function ImplementarCss()
{
    wp_enqueue_style(
        'mi-plugin-styles', // Identificador único para el archivo CSS
        plugin_dir_url(__FILE__) . 'assets/preview.css', // Ruta al archivo CSS
        array(), // Dependencias (si las hay)
        null, // Versión (puedes poner una versión específica o null)
        'all' // Medio de estilo (puedes usar 'screen', 'print', etc.)
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
            array(),
            null
        );
    }
}
add_action('wp_enqueue_scripts', 'ImplementarFuente');
