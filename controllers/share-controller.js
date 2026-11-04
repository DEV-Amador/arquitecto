export class ShareController {
  constructor() {
    this.button = document.getElementById('share-button');
    this.message = document.getElementById('share-message');
  }

  initialize(getReport) {
    this.button.addEventListener('click', () => this.share(getReport()));
  }

  async share(report) {
    if (!report) {
      this.showMessage('Corrige los datos antes de compartir el cálculo.');
      return;
    }

    const { design, materials } = report;
    const text = [
      'Cálculo de varillas para columnas',
      `Varillas longitudinales: ${design.barCount} × ${design.selectedBar} por columna`,
      `Cuantía de acero: ${design.ratio.toFixed(2)}%`,
      `Varilla longitudinal a comprar: ${materials.longitudinalPieces} piezas`,
      `Varilla para estribos a comprar: ${materials.stirrupPieces} piezas`
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Cálculo de varillas', text });
        this.showMessage('Cálculo compartido.');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        this.showMessage('Cálculo copiado al portapapeles.');
      } else {
        this.showMessage('Este navegador no permite compartir ni copiar el cálculo.');
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      this.showMessage('No se pudo compartir el cálculo.');
      console.error('Error al compartir el cálculo:', error);
    }
  }

  showMessage(message) {
    this.message.textContent = message;
    this.message.hidden = false;
  }
}
