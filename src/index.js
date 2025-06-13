import { render, createElement, useState, useEffect } from "@wordpress/element";

const App = () => {
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [ColorDeLetra, setColorDeLetra] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState(null);
  const [fuente, setFuente] = useState("sans-serif");
  const [mensaje, setMensaje] = useState(
    "Disculpa las molestias. Volveremos pronto."
  );
  const [titulo, setTitulo] = useState("🚧 Estamos trabajando");
  const [marcoSeleccionado, setMarcoSeleccionado] = useState("");
  const [fecha, setFecha] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const imagenesBaseUrl = EnConstruccionData.imagesBaseUrl;

  const handleColorFondoChange = (event) => {
    setColorFondo(event.target.value);
  };

  const handleColorDeLetraChange = (event) => {
    setColorDeLetra(event.target.value);
  };
  const handleSelectLogo = () => {
    const frame = wp.media({
      title: "Seleccionar logo",
      button: { text: "Usar este logo" },
      multiple: false,
    });

    frame.on("select", () => {
      const attachment = frame.state().get("selection").first().toJSON();
      setLogoUrl(attachment.url);
    });

    frame.open();
  };

  const handlePreviewClick = () => {
    const url = `${EnConstruccionData.previewUrl}?bg=${encodeURIComponent(
      colorFondo
    )}${
      logoUrl ? `&logo=${encodeURIComponent(logoUrl)}` : ""
    }&font=${encodeURIComponent(fuente)}&msg=${encodeURIComponent(
      mensaje
    )}&title=${encodeURIComponent(titulo)}${
      fecha ? `&date=${encodeURIComponent(fecha)}` : ""
    }${
      marcoSeleccionado ? `&marco=${encodeURIComponent(marcoSeleccionado)}` : ""
    }${ColorDeLetra ? `&ColorLetra=${encodeURIComponent(ColorDeLetra)}` : ""}`;

    window.open(url, "_blank");
  };

  const getMarcoPreviewUrl = (marco) => {
    return `${imagenesBaseUrl}${marco}`;
  };

  // Efecto para actualizar el preview de la plantilla
  useEffect(() => {
    if (marcoSeleccionado) {
      setPreviewUrl(getMarcoPreviewUrl(marcoSeleccionado));
    } else {
      setPreviewUrl("");
    }
  }, [marcoSeleccionado]);

  return createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        padding: "40px",
      },
    },
    createElement(
      "div",
      {
        style: {
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
        },
      },

      createElement("h1", null, "Página en construcción"),

      createElement(
        "div",
        { style: { marginBottom: "20px" } },
        createElement("label", { htmlFor: "titulo" }, "Título principal: "),
        createElement("input", {
          id: "titulo",
          type: "text",
          value: titulo,
          onChange: (e) => setTitulo(e.target.value),
          style: {
            width: "100%",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginTop: "8px",
          },
        })
      ),

      createElement(
        "div",
        { style: { marginBottom: "20px" } },
        createElement(
          "label",
          { htmlFor: "mensaje" },
          "Mensaje personalizado: "
        ),
        createElement("textarea", {
          id: "mensaje",
          value: mensaje,
          onChange: (e) => setMensaje(e.target.value),
          style: {
            display: "block",
            width: "100%",
            padding: "8px",
            fontSize: "14px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            resize: "vertical",
          },
          rows: 3,
        })
      ),

      createElement(
        "div",
        { style: { marginBottom: "20px" } },
        createElement(
          "label",
          { htmlFor: "fecha" },
          "Fecha estimada de regreso (opcional): "
        ),
        createElement("input", {
          id: "fecha",
          type: "date",
          value: fecha,
          onChange: (e) => setFecha(e.target.value),
          style: {
            marginTop: "8px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          },
        })
      ),
      createElement(
        "div",
        { style: { marginBottom: "20px" } },
        createElement(
          "button",
          {
            onClick: handleSelectLogo,
            style: {
              padding: "8px 16px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "#f3f4f6",
              color: "#111",
              border: "1px solid #ccc",
              borderRadius: "4px",
            },
          },
          "Seleccionar logo"
        )
      ),
      logoUrl &&
        createElement(
          "div",
          { style: { marginTop: "10px" } },
          createElement("img", {
            src: logoUrl,
            alt: "Vista previa del logo",
            style: { maxWidth: "150px", height: "auto" },
          })
        ),

      createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          },
        },
        createElement(
          "div",
          null,
          createElement("label", { htmlFor: "bg-color" }, "Color de fondo: "),
          createElement("input", {
            id: "bg-color",
            type: "color",
            value: colorFondo,
            onChange: handleColorFondoChange,
            style: { display: "block", marginTop: "8px" },
          })
        ),
        createElement(
          "div",
          null,
          createElement(
            "label",
            { htmlFor: "letra-color" },
            "Color de letra: "
          ),
          createElement("input", {
            id: "letra-color",
            type: "color",
            value: ColorDeLetra,
            onChange: handleColorDeLetraChange,
            style: { display: "block", marginTop: "8px" },
          })
        )
      ),

      createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          },
        },
        createElement(
          "div",
          null,
          createElement("label", { htmlFor: "marco" }, "Plantillas: "),
          createElement(
            "select",
            {
              id: "marco",
              value: marcoSeleccionado,
              onChange: (e) => setMarcoSeleccionado(e.target.value),
              style: {
                display: "block",
                marginTop: "8px",
                padding: "6px",
                width: "200px",
                borderRadius: "4px",
              },
            },
            createElement("option", { value: "" }, "Ninguno"),
            createElement("option", { value: "12313.jpg" }, "Plantilla 1"),
            createElement("option", { value: "bacck.jpg" }, "Plantilla 2"),
            createElement("option", { value: "paper.jpg" }, "Plantilla 3"),
            createElement("option", { value: "future.jpg" }, "Plantilla 4"),
            createElement("option", { value: "neon.gif" }, "Plantilla 5")
          )
        ),
        createElement(
          "div",
          null,
          createElement("label", { htmlFor: "fuente" }, "Fuente de letra: "),
          createElement(
            "select",
            {
              id: "fuente",
              value: fuente,
              onChange: (e) => setFuente(e.target.value),
              style: {
                display: "block",
                marginTop: "8px",
                padding: "6px",
                width: "200px",
                borderRadius: "4px",
              },
            },
            createElement("option", { value: "sans-serif" }, "Sans-serif"),
            createElement("option", { value: "serif" }, "Serif"),
            createElement("option", { value: "monospace" }, "Monospace"),
            createElement("option", { value: "Roboto" }, "Roboto"),
            createElement("option", { value: "Courier New" }, "Courier New"),
            createElement("option", { value: "Arial" }, "Arial"),
            createElement("option", { value: "Verdana" }, "Verdana"),
            createElement("option", { value: "Georgia" }, "Georgia"),
            createElement(
              "option",
              { value: "Times New Roman" },
              "Times New Roman"
            ),
            createElement("option", { value: "Courier" }, "Courier"),
            createElement("option", { value: "Impact" }, "Impact")
          )
        )
      ),

      previewUrl &&
        createElement(
          "div",
          { style: { marginTop: "10px" } },
          createElement("img", {
            src: previewUrl,
            alt: "Vista previa de la plantilla seleccionada",
            style: { width: "300px", height: "auto", borderRadius: "8px" },
          })
        ),
      createElement(
        "button",
        {
          onClick: handlePreviewClick,
          style: {
            marginTop: "30px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007cba",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          },
        },
        "Vista previa"
      ),
      createElement(
        "button",
        {
          onClick: async () => {
            const formData = new FormData();
            formData.append("action", "guardar_diseño");
            formData.append("color", colorFondo);
            formData.append("logo", logoUrl || "");
            formData.append("fuente", fuente);
            formData.append("titulo", titulo);
            formData.append("mensaje", mensaje);
            formData.append("fecha", fecha);
            formData.append("marcoSeleccionado", marcoSeleccionado);
            formData.append("letraColor", ColorDeLetra);

            const response = await fetch(EnConstruccionData.ajaxUrl, {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            alert(result?.data?.mensaje || "Guardado");
          },
          style: {
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#38a169",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginLeft: "10px",
          },
        },
        "Guardar diseño"
      )
    )
  );
};

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("enconstruccion-root");
  if (root) {
    render(createElement(App), root);
  }
});
