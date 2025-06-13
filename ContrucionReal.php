<?php
// Variables desde get_post_meta
$color = isset($diseño['color']) ? sanitize_hex_color($diseño['color']) : '#ffffff';
$colorLetra = isset($diseño['ColorLetra']) ? sanitize_hex_color($diseño['ColorLetra']) : '#ffffff';
$logo  = isset($diseño['logo']) ? esc_url_raw($diseño['logo']) : null;
$font  = isset($diseño['fuente']) ? esc_attr($diseño['fuente']) : 'sans-serif';
$titulo = isset($diseño['titulo']) ? wp_kses_post($diseño['titulo']) : '🚧 Estamos trabajando';
$mensaje = isset($diseño['mensaje']) ? wp_kses_post($diseño['mensaje']) : 'Disculpa las molestias. Volveremos pronto.';
$fecha = isset($diseño['fecha']) ? esc_attr($diseño['fecha']) : null;
$marco = isset($diseño['marco']) ? basename($diseño['marco']) : '';
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
        <p><?php echo esc_html(nl2br($mensaje)); ?></p>
        <?php if ($fecha): ?>
            <div id="CuentaAtras321" style="margin-top:20px; font-weight:bold;"></div>
            <script>
                iniciarCuentaAtras("<?php echo esc_attr($fecha); ?>");
            </script>
        <?php endif; ?>
    </div>

    <?php wp_footer();
    ?>
</body>

</html>