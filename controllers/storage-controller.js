export class StorageController {
  constructor() {
    this.key = 'varillas-columnas-inputs';
    this.message = document.getElementById('storage-message');
  }

  initialize(fields) {
    this.fields = fields;
    this.restore();
    this.fields.forEach(field => {
      field.addEventListener('input', () => this.save());
      field.addEventListener('change', () => this.save());
    });
  }

  restore() {
    try {
      const saved = localStorage.getItem(this.key);
      if (!saved) return;

      const values = JSON.parse(saved);
      this.fields.forEach(field => {
        if (typeof values[field.id] !== 'string' && typeof values[field.id] !== 'number') return;
        if (field instanceof HTMLSelectElement
          && !Array.from(field.options).some(option => option.value === String(values[field.id]))) return;
        field.value = String(values[field.id]);
      });
    } catch (error) {
      this.showError('No se pudieron recuperar los valores guardados.');
      console.error('Error al recuperar los valores guardados:', error);
    }
  }

  save() {
    try {
      const values = Object.fromEntries(
        Array.from(this.fields, field => [field.id, field.value])
      );
      localStorage.setItem(this.key, JSON.stringify(values));
      this.message.hidden = true;
    } catch (error) {
      this.showError('No se pudieron guardar los valores en este dispositivo.');
      console.error('Error al guardar los valores:', error);
    }
  }

  showError(message) {
    this.message.textContent = message;
    this.message.hidden = false;
  }
}
