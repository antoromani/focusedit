=== FocusEdit ===
Contributors: Antonio Romani
Tags: editor, interface, sidebar, floating panels, FSE
Requires at least: 6.4
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Mejora la interfaz del editor de bloques con paneles flotantes, anclaje manual y expansión inteligente. Sin base de datos.

== Description ==

FocusEdit es un plugin diseñado para mejorar la experiencia de usuario en el editor de bloques de WordPress. Ofrece ajustes visuales avanzados que se activan mediante toggles, sin modificar el núcleo ni guardar datos en la base de datos.

**Características principales:**

- Ocultar título del editor (funciona con algunos plugins Spectra, Ultimate Blocks, Otter, Getwig, Publishpress, Essential Blocks no con Kadence, Greenshift).
- Interfaz limpia y sin distracciones
- Barra superior colapsable con espacios optimizados
- Paneles laterales flotantes con expansión por hover
- Panel inferior flotante con expansión por hover
- Indicadores visuales en paneles colapsados
- Anclaje manual de paneles con clic en espacio libre (barra superior en paneles laterales)
- Expansión inteligente del panel derecho para estabilizar popovers
- Expansión inteligente para mostrar panel bloques al mouseover sobre Block Toolbar en el Content Canvas
- Scrollbars mínimalistas
- Persistencia automática de ajustes por navegador

**Modular y reversible:** Cada ajuste se activa mediante una clase CSS específica. No se altera el comportamiento interno del editor ni se manipulan elementos de forma directa.

**Bilingüe:** Interfaz disponible en español e inglés, según el idioma del navegador.

== Installation ==

1. Sube la carpeta `focusedit` al directorio `/wp-content/plugins/`
2. Activa el plugin desde el menú "Plugins" en WordPress
3. Abre el editor de bloques y accede al panel lateral "FocusEdit"
4. Activa los toggles que desees y disfruta.

== Frequently Asked Questions ==

= ¿Se guarda algo en la base de datos? =
No. FocusEdit usa `localStorage` para recordar tus ajustes en el navegador. No guarda nada en WordPress.

= ¿Es compatible con todos los temas? =
Sí, especificamente con temas FSE. Algunos ajustes pueden variar según el tema activo.

= ¿Puedo desactivar todos los efectos? =
Sí. Todos los ajustes son reversibles desde el panel lateral.

== Changelog ==

= 1.0.0 =
* Versión inicial con 10 toggles visuales y sistema de persistencia local.

== Upgrade Notice ==

= 1.0.0 =
Versión estable inicial. Mejora visual del editor sin alterar el núcleo.

