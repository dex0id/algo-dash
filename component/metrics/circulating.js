const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.gauge,
    {
        label: 'Circulating Supply',
        gaugeSpacing: 2,
        gaugeHeight: 1,
    },
    (component, layout) => {
        const interval = setInterval(() => {
            if (!component.visible) return clearInterval(inverval);
            const {
                total,
            } = dataModel.get('supply');

            const totalSupply = 10_000_000_000_000_000n;
            const circulatingSupplyPer = (Number(BigInt(total) / 1_000_000n) / Number(totalSupply / 1_000_000n) * 100).toFixed(2)

            component.setStack([{percent: circulatingSupplyPer, stroke: 'blue'}, {percent: (100 - circulatingSupplyPer).toFixed(2), stroke: 'white'}]);
            layout.debounceRender();
        }, 1000)
    }
]