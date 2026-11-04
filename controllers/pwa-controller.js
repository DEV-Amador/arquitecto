export class PwaController {
  constructor() {
    this.installButton = document.getElementById('inst');
    this.status = document.getElementById('pwa-status');
    this.installPrompt = null;
  }

  initialize() {
    if (!window.isSecureContext) {
      this.showStatus('Para instalarla, abre la app desde HTTPS o desde localhost. No funciona si abres el archivo index.html directamente.');
    } else if (!('serviceWorker' in navigator)) {
      this.showStatus('Este navegador no permite instalar esta PWA. Prueba con Chrome o Edge actualizados.');
    } else {
      navigator.serviceWorker.register('./sw.js')
        .then(() => this.showStatus('Si no aparece el botón, abre el menú del navegador y busca “Instalar app” o “Añadir a pantalla principal”.'))
        .catch(error => {
          this.showStatus('No se pudo preparar la instalación. Revisa que la app esté publicada en HTTPS y vuelve a cargarla.');
          console.error('No se pudo registrar el service worker:', error);
        });
    }

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.installPrompt = event;
      this.installButton.style.display = 'block';
      this.showStatus('La app está lista para instalar.');
    });

    window.addEventListener('appinstalled', () => {
      this.installPrompt = null;
      this.installButton.style.display = 'none';
      this.showStatus('La app se instaló correctamente.');
    });

    this.installButton.addEventListener('click', () => this.install());
  }

  async install() {
    if (!this.installPrompt) return;
    try {
      const promptEvent = this.installPrompt;
      this.installPrompt = null;
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      this.installButton.style.display = 'none';
      this.showStatus(outcome === 'accepted'
        ? 'Se inició la instalación de la app.'
        : 'Instalación cancelada. Puedes instalarla desde el menú del navegador.');
    } catch (error) {
      this.showStatus('No se pudo iniciar la instalación. Prueba desde el menú del navegador.');
      console.error('No se pudo iniciar la instalación:', error);
    }
  }

  showStatus(message) {
    this.status.textContent = message;
    this.status.hidden = false;
  }
}
