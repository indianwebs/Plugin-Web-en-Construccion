<?php
require_once dirname(__FILE__, 4) . '/wp-load.php';

$color = isset($_GET['bg']) ? sanitize_hex_color($_GET['bg']) : '#ffffff';
$colorLetra = isset($_GET['ColorLetra']) ? sanitize_hex_color($_GET['ColorLetra']) : '#000000';
$logo  = isset($_GET['logo']) ? esc_url_raw($_GET['logo']) : null;
$font  = isset($_GET['font']) ? esc_attr($_GET['font']) : 'sans-serif';
$titulo = isset($_GET['title']) ? wp_kses_post($_GET['title']) : '🚧 Estamos trabajando';
$mensaje = isset($_GET['msg']) ? wp_kses_post($_GET['msg']) : 'Disculpa las molestias. Volveremos pronto.';
$fecha = isset($_GET['date']) ? esc_attr($_GET['date']) : null;
$marco = isset($_GET['marco']) ? basename($_GET['marco']) : '';
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Página en construcción</title>
    <?php wp_head();
    ?>
    <script>
        function iniciarCuentaAtras(fechaFinal) {
            const contador = document.getElementById("CuentaAtras321");

            function actualizar() {
                const ahora = new Date().getTime();
                const final = new Date(fechaFinal).getTime();
                const diff = final - ahora;

                if (diff <= 0) {
                    contador.innerHTML = "¡Ya disponible!";
                    return;
                }

                const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diff % (1000 * 60)) / 1000);

                contador.innerHTML = `Volvemos en ${dias}d ${horas}h ${minutos}m ${segundos}s`;
                setTimeout(actualizar, 1000);
            }
            actualizar();
        }
    </script>
</head>

<body style="background-color: <?php echo esc_attr($color); ?>; color: <?php echo esc_attr($colorLetra); ?>; font-family: <?php echo esc_attr($font === 'Roboto' ? "'Roboto', sans-serif" : $font); ?>;">

    <div class="container">
        <?php if ($marco): ?>
            <img src="<?php echo esc_url(plugins_url("marcos/$marco", __FILE__)); ?>" alt="Marco decorativo" class="marco">
        <?php endif; ?>
        <?php if ($logo): ?>
            <img src="<?php echo esc_url($logo); ?>" alt="Logo" class="logo">
        <?php endif; ?>
        <h1><?php echo esc_html($titulo); ?></h1>
        <div class="textoContenedor">
            <p><?php echo esc_html(nl2br($mensaje)); ?></p>
        </div>

        <?php if ($fecha): ?>
            <div id="CuentaAtras321" style="margin-top:20px; font-weight:bold;"></div>
            <script>
                iniciarCuentaAtras("<?php echo esc_js($fecha); ?>");
            </script>
        <?php endif; ?>
    </div>

    <?php wp_footer();
    ?>
</body>

</html>