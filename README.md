# Varillas en Columnas

Calculadora estática para estimar el acero y los materiales de columnas. No requiere instalar dependencias ni compilar.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y configura este proyecto como su rama `main`.
2. En **Settings → Pages**, selecciona **GitHub Actions** como origen.
3. Sube la rama `main`. El flujo de trabajo de GitHub Actions desplegará los archivos del sitio; su URL aparecerá en **Settings → Pages** y en la ejecución del flujo.

La aplicación usa rutas relativas, por lo que funciona bajo la ruta de proyecto de GitHub Pages. El service worker almacena la app para uso sin conexión.

## Microsoft Store

Primero publica la aplicación y confirma que su URL HTTPS carga correctamente. Después, usa esa URL en [PWABuilder](https://www.pwabuilder.com/) para generar un paquete de Windows y completar los datos requeridos. Para enviar el paquete y la ficha de la aplicación necesitas una cuenta de desarrollador de Microsoft Partner Center. La creación del paquete y el envío no se realizan automáticamente con el despliegue de GitHub Pages.
