export class ViewController {
  constructor() {
    this.designOutput = document.getElementById('o1');
    this.alternativesTable = document.getElementById('alt-t');
    this.materialsOutput = document.getElementById('o2');
  }

  format(value, decimals = 2) {
    return Number(value).toFixed(decimals);
  }

  row(label, value) {
    return `<div class="r"><span>${label}</span><b>${value}</b></div>`;
  }

  renderDesign(result) {
    const meetsRatio = result.ratio >= 1 && result.ratio <= 8;
    const warning = result.selectedBar === '#3 (3/8")'
      ? '<div class="r"><span class="bad">⚠ Se recomienda mínimo #4 (1/2") en columnas</span></div>'
      : '';
    this.designOutput.innerHTML =
      this.row('Área de la sección', this.format(result.area, 0) + ' cm²')
      + this.row('As mínimo (1%)', this.format(result.minimumSteel) + ' cm²')
      + this.row('As máximo (8%)', this.format(result.maximumSteel) + ' cm²')
      + this.row('Varillas necesarias', `<span class="big">${result.barCount} × ${result.selectedBar}</span>`)
      + this.row('As proporcionado', this.format(result.providedSteel) + ' cm²')
      + this.row('Cuantía real', `<span class="${meetsRatio ? 'ok' : 'bad'}">${this.format(result.ratio)} % ${meetsRatio ? '✔ cumple' : '✘ fuera de rango'}</span>`)
      + warning;

    this.alternativesTable.innerHTML = '<tr><th>Varilla</th><th>cm²</th><th>Cant.</th><th>As total</th><th>%</th></tr>'
      + result.alternatives.map(alternative => `<tr><td>${alternative.bar}</td><td>${alternative.steelArea}</td><td>${alternative.count}</td><td>${this.format(alternative.totalArea)}</td><td class="${alternative.ratio <= 8 ? 'ok' : 'bad'}">${this.format(alternative.ratio)}</td></tr>`).join('');
  }

  renderMaterials(result) {
    this.materialsOutput.innerHTML =
      `<div class="r"><b>Varilla longitudinal ${result.longitudinalBar}</b><span></span></div>`
      + this.row(`Metros lineales (${this.format(result.height, 1)} m × ${result.barCount} × ${result.columnCount})`, this.format(result.longitudinalMeters) + ' m')
      + this.row('Con desperdicio', this.format(result.longitudinalWithWaste) + ' m')
      + this.row(`Piezas de ${result.commercialLength} m`, `<span class="big">${result.longitudinalPieces}</span>`)
      + `<div class="r"><b>Estribos ${result.stirrupBar}</b><span></span></div>`
      + this.row('Perímetro de cada estribo', this.format(result.stirrupPerimeter, 0) + ' cm')
      + this.row('Estribos por columna', result.stirrupsPerColumn)
      + this.row('Metros lineales', this.format(result.stirrupMeters) + ' m')
      + this.row('Con desperdicio', this.format(result.stirrupWithWaste) + ' m')
      + this.row(`Piezas de ${result.commercialLength} m`, `<span class="big">${result.stirrupPieces}</span>`);
  }

}
