/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const App = () => {
  const [colorFondo, setColorFondo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("#ffffff");
  const [ColorDeLetra, setColorDeLetra] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("#ffffff");
  const [logoUrl, setLogoUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [fuente, setFuente] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("sans-serif");
  const [mensaje, setMensaje] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("Disculpa las molestias. Volveremos pronto.");
  const [titulo, setTitulo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("🚧 Estamos trabajando");
  const [marcoSeleccionado, setMarcoSeleccionado] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [fecha, setFecha] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [previewUrl, setPreviewUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const imagenesBaseUrl = EnConstruccionData.imagesBaseUrl;
  const handleColorFondoChange = event => {
    setColorFondo(event.target.value);
  };
  const handleColorDeLetraChange = event => {
    setColorDeLetra(event.target.value);
  };
  const handleSelectLogo = () => {
    const frame = wp.media({
      title: "Seleccionar logo",
      button: {
        text: "Usar este logo"
      },
      multiple: false
    });
    frame.on("select", () => {
      const attachment = frame.state().get("selection").first().toJSON();
      setLogoUrl(attachment.url);
    });
    frame.open();
  };
  const handlePreviewClick = () => {
    const url = `${EnConstruccionData.previewUrl}?bg=${encodeURIComponent(colorFondo)}${logoUrl ? `&logo=${encodeURIComponent(logoUrl)}` : ""}&font=${encodeURIComponent(fuente)}&msg=${encodeURIComponent(mensaje)}&title=${encodeURIComponent(titulo)}${fecha ? `&date=${encodeURIComponent(fecha)}` : ""}${marcoSeleccionado ? `&marco=${encodeURIComponent(marcoSeleccionado)}` : ""}${ColorDeLetra ? `&ColorLetra=${encodeURIComponent(ColorDeLetra)}` : ""}`;
    window.open(url, "_blank");
  };
  const getMarcoPreviewUrl = marco => {
    return `${imagenesBaseUrl}${marco}`;
  };

  // Efecto para actualizar el preview de la plantilla
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (marcoSeleccionado) {
      setPreviewUrl(getMarcoPreviewUrl(marcoSeleccionado));
    } else {
      setPreviewUrl("");
    }
  }, [marcoSeleccionado]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "40px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      backgroundColor: "#f9f9f9",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      width: "100%"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "Página en construcción"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "titulo"
  }, "Título principal: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "titulo",
    type: "text",
    value: titulo,
    onChange: e => setTitulo(e.target.value),
    style: {
      width: "100%",
      padding: "8px",
      fontSize: "14px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginTop: "8px"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "mensaje"
  }, "Mensaje personalizado: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "mensaje",
    value: mensaje,
    onChange: e => setMensaje(e.target.value),
    style: {
      display: "block",
      width: "100%",
      padding: "8px",
      fontSize: "14px",
      marginTop: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      resize: "vertical"
    },
    rows: 3
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "fecha"
  }, "Fecha estimada de regreso (opcional): "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "fecha",
    type: "date",
    value: fecha,
    onChange: e => setFecha(e.target.value),
    style: {
      marginTop: "8px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleSelectLogo,
    style: {
      padding: "8px 16px",
      fontSize: "14px",
      cursor: "pointer",
      backgroundColor: "#f3f4f6",
      color: "#111",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }
  }, "Seleccionar logo")), logoUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "10px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: logoUrl,
    alt: "Vista previa del logo",
    style: {
      maxWidth: "150px",
      height: "auto"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "bg-color"
  }, "Color de fondo: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "bg-color",
    type: "color",
    value: colorFondo,
    onChange: handleColorFondoChange,
    style: {
      display: "block",
      marginTop: "8px"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "letra-color"
  }, "Color de letra: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "letra-color",
    type: "color",
    value: ColorDeLetra,
    onChange: handleColorDeLetraChange,
    style: {
      display: "block",
      marginTop: "8px"
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "marco"
  }, "Plantillas: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "marco",
    value: marcoSeleccionado,
    onChange: e => setMarcoSeleccionado(e.target.value),
    style: {
      display: "block",
      marginTop: "8px",
      padding: "6px",
      width: "200px",
      borderRadius: "4px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, "Ninguno"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "12313.jpg"
  }, "Plantilla 1"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "bacck.jpg"
  }, "Plantilla 2"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "paper.jpg"
  }, "Plantilla 3"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "future.jpg"
  }, "Plantilla 4"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "neon.gif"
  }, "Plantilla 5"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "fuente"
  }, "Fuente de letra: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "fuente",
    value: fuente,
    onChange: e => setFuente(e.target.value),
    style: {
      display: "block",
      marginTop: "8px",
      padding: "6px",
      width: "200px",
      borderRadius: "4px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "sans-serif"
  }, "Sans-serif"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "serif"
  }, "Serif"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "monospace"
  }, "Monospace"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Roboto"
  }, "Roboto"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Courier New"
  }, "Courier New"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Arial"
  }, "Arial"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Verdana"
  }, "Verdana"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Georgia"
  }, "Georgia"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Times New Roman"
  }, "Times New Roman"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Courier"
  }, "Courier"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "Impact"
  }, "Impact")))), previewUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "10px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: previewUrl,
    alt: "Vista previa de la plantilla seleccionada",
    style: {
      width: "300px",
      height: "auto",
      borderRadius: "8px"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handlePreviewClick,
    style: {
      marginTop: "30px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#007cba",
      color: "#fff",
      border: "none",
      borderRadius: "4px"
    }
  }, "Vista previa"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
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
        body: formData
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
      marginLeft: "10px"
    }
  }, "Guardar diseño")));
};
window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("enconstruccion-root");
  if (root) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App), root);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map