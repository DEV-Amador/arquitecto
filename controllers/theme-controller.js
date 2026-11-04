export class ThemeController {
  constructor() {
    this.button = document.getElementById('theme-button');
    this.key = 'varillas-columnas-theme';
  }

  initialize() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(this.key);
    } catch (error) {
      console.error('No se pudo recuperar la preferencia de tema:', error);
      this.showStorageError();
    }
    const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme);
    this.button.addEventListener('click', () => {
      this.setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    this.button.textContent = theme === 'dark' ? '☀️ Tema claro' : '🌙 Tema oscuro';
    this.button.setAttribute('aria-pressed', String(theme === 'dark'));
    try {
      localStorage.setItem(this.key, theme);
    } catch (error) {
      console.error('No se pudo guardar la preferencia de tema:', error);
      this.showStorageError();
    }
  }

  showStorageError() {
    const message = document.getElementById('storage-message');
    message.textContent = 'No se pudo guardar o recuperar la preferencia de tema.';
    message.hidden = false;
  }
}
