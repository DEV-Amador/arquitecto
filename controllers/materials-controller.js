export class MaterialsController {
  calculate(values, design) {
    const longitudinalMeters = values.height * design.barCount * values.columnCount;
    const longitudinalWithWaste = longitudinalMeters * values.wasteFactor;
    const stirrupPerimeter = 2 * (values.width - 2 * values.cover)
      + 2 * (values.depth - 2 * values.cover) + 20;
    const stirrupsPerColumn = Math.ceil(values.height * 100 / values.stirrupSpacing) + 1;
    const stirrupMeters = stirrupPerimeter * stirrupsPerColumn * values.columnCount / 100;
    const stirrupWithWaste = stirrupMeters * values.wasteFactor;

    return {
      longitudinalBar: values.longitudinalBar,
      longitudinalMeters,
      longitudinalWithWaste,
      longitudinalPieces: Math.ceil(longitudinalWithWaste / values.commercialLength),
      commercialLength: values.commercialLength,
      stirrupBar: values.stirrupBar,
      stirrupPerimeter,
      stirrupsPerColumn,
      stirrupMeters,
      stirrupWithWaste,
      stirrupPieces: Math.ceil(stirrupWithWaste / values.commercialLength),
      height: values.height,
      barCount: design.barCount,
      columnCount: values.columnCount
    };
  }
}
