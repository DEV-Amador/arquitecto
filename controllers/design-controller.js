import { STEEL_BARS } from './inputs-controller.js';

export class DesignController {
  calculate(values) {
    const area = values.width * values.depth;
    const minimumSteel = area * 0.01;
    const maximumSteel = area * 0.08;
    const selectedArea = STEEL_BARS[values.longitudinalBar][1];
    const barCount = this.barCount(minimumSteel, selectedArea);
    const providedSteel = barCount * selectedArea;

    return {
      area,
      minimumSteel,
      maximumSteel,
      barCount,
      providedSteel,
      ratio: providedSteel / area * 100,
      selectedBar: values.longitudinalBar,
      alternatives: Object.keys(STEEL_BARS).slice(1).map(bar => {
        const steelArea = STEEL_BARS[bar][1];
        const count = this.barCount(minimumSteel, steelArea);
        return { bar, steelArea, count, totalArea: count * steelArea, ratio: count * steelArea / area * 100 };
      })
    };
  }

  barCount(requiredArea, barArea) {
    const count = Math.max(4, Math.ceil(requiredArea / barArea));
    return count % 2 && count > 4 ? count + 1 : count;
  }
}
