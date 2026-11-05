# 🐱 Meow Code App

Editor HTML visual con vista previa en vivo, edición WYSIWYG, temas, zoom, pantalla completa y exportación a PDF. Funciona offline como PWA.

## ✨ Características

- 📝 **Editor CodeMirror** con resaltado HTML/CSS/JS
- 👁️ **Vista previa en vivo** con edición visual (contentEditable)
- 🔍 **Zoom de vista previa** (25%–300%) con Ctrl+rueda, pinch táctil y atajos
- ✋ **Pan (arrastrar)** con ratón/táctil cuando el zoom supera 100%
- 🖥️ **Pantalla completa** para el editor y el preview
- 🎨 **Dos skins**: HTML Classic y Terminal GUI (6 colores)
- 🧩 **Bloques de código reutilizables** guardados en localStorage
- 🖼️ **Edición de imágenes** (URL o subida, redimensionado)
- 📥 **Exportar** a `.html` y `.pdf`
- 💾 **Autoguardado** del código, zoom, tema y modo
- 📱 **Layout adaptativo** móvil/escritorio
- 🌐 **PWA** con Service Worker para uso offline

## 🚀 Uso

Abre `index.html` en un navegador moderno o sirve la carpeta:

```bash
python -m http.server 8000
# o
npx serve .
