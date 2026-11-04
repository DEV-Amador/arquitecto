export const STEEL_BARS = {
  '#2 (1/4")': [0.635, 0.32],
  '#3 (3/8")': [0.953, 0.71],
  '#4 (1/2")': [1.27, 1.27],
  '#5 (5/8")': [1.588, 1.98],
  '#6 (3/4")': [1.905, 2.85],
  '#8 (1")': [2.54, 5.07]
};

export class InputsController {
  constructor() {
    this.fields = document.querySelectorAll('input,select');
    this.longitudinalBar = document.getElementById('dv');
    this.stirrupBar = document.getElementById('de');
    this.populateBars();
  }

  populateBars() {
    const bars = Object.keys(STEEL_BARS);
    this.longitudinalBar.innerHTML = bars.slice(1)
      .map(bar => `<option${bar === '#4 (1/2")' ? ' selected' : ''}>${bar}</option>`)
      .join('');
    this.stirrupBar.innerHTML = bars.slice(0, 3)
      .map(bar => `<option${bar === '#3 (3/8")' ? ' selected' : ''}>${bar}</option>`)
      .join('');
  }

  onChange(callback) {
    this.fields.forEach(field => field.addEventListener('input', callback));
  }

  getValues() {
    const number = id => Number(document.getElementById(id).value);
    const values = {
      width: number('b'),
      depth: number('h'),
      height: number('alt'),
      columnCount: number('nc') || 1,
      stirrupSpacing: number('sep'),
      cover: number('rec'),
      commercialLength: number('lc') || 12,
      wasteFactor: 1 + number('des') / 100,
      longitudinalBar: this.longitudinalBar.value,
      stirrupBar: this.stirrupBar.value
    };

    if (!(values.width > 0 && values.depth > 0 && values.height > 0 && values.stirrupSpacing > 0)) {
      return null;
    }
    return values;
  }
}
