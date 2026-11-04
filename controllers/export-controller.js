export class ExportController {
  constructor() {
    this.button = document.getElementById('export-button');
    this.message = document.getElementById('export-message');
  }

  initialize(getReport) {
    this.button.addEventListener('click', () => this.download(getReport()));
  }

  download(report) {
    if (!report) {
      this.message.textContent = 'Corrige los datos antes de exportar el cálculo.';
      this.message.hidden = false;
      return;
    }

    const rows = [
      ['Dato', 'Valor'],
      ['Ancho (cm)', report.values.width],
      ['Largo (cm)', report.values.depth],
      ['Altura (m)', report.values.height],
      ['Número de columnas', report.values.columnCount],
      ['Varilla longitudinal', report.design.selectedBar],
      ['Varillas por columna', report.design.barCount],
      ['Cuantía de acero (%)', report.design.ratio.toFixed(2)],
      ['Varilla de estribo', report.materials.stirrupBar],
      ['Estribos por columna', report.materials.stirrupsPerColumn],
      ['Varilla longitudinal a comprar (piezas)', report.materials.longitudinalPieces],
      ['Varilla para estribos a comprar (piezas)', report.materials.stirrupPieces]
    ];
    const csv = '\uFEFF' + rows.map(row => row.map(value =>
      `"${String(value).replaceAll('"', '""')}"`
    ).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculo-varillas-columnas.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.message.textContent = 'Se descargó el reporte CSV.';
    this.message.hidden = false;
  }
}
