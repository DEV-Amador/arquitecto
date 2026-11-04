export class ValidationController {
  constructor() {
    this.message = document.getElementById('validation-message');
  }

  validate() {
    const number = id => Number(document.getElementById(id).value);
    const errors = [];
    const width = number('b');
    const depth = number('h');

    if (!(width > 0)) errors.push('El ancho debe ser mayor que 0.');
    if (!(depth > 0)) errors.push('El largo debe ser mayor que 0.');
    if (!(number('alt') > 0)) errors.push('La altura debe ser mayor que 0.');
    if (!(Number.isInteger(number('nc')) && number('nc') >= 1)) {
      errors.push('El número de columnas debe ser un entero mayor que 0.');
    }
    if (!(number('sep') > 0)) errors.push('La separación de estribos debe ser mayor que 0.');
    if (!(number('rec') >= 0)) errors.push('El recubrimiento no puede ser negativo.');
    else if (width > 0 && depth > 0 && number('rec') * 2 >= Math.min(width, depth)) {
      errors.push('El recubrimiento debe ser menor que la mitad de cada lado de la sección.');
    }
    if (!(number('lc') > 0)) errors.push('La longitud comercial debe ser mayor que 0.');
    if (!(number('des') >= 0)) errors.push('El desperdicio no puede ser negativo.');

    this.message.textContent = errors.join(' ');
    this.message.hidden = errors.length === 0;
    return errors.length === 0;
  }
}
