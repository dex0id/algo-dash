const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.donut,
    {
        radius: 8,
        arcWidth: 3,
        remainColor: 'black',
        yPadding: 2,
    },
    (component, layout) => setInterval(() => {
        const {
            online,
            total,
        } = dataModel.get('supply');

        const onlinePercent = (online / total * 100).toFixed(2);
        const totalSupply = 10_000_000_000_000_000n;
        const circulatingSupplyPer = (Number(BigInt(total) / 1_000_000n) / Number(totalSupply / 1_000_000n) * 100).toFixed(2)

        component.setData([
            {percent: Number(onlinePercent), label: 'Online', color: 'green'},
            {percent: Number(circulatingSupplyPer), label: 'Circulating', color: 'Yellow'},
        ])
        layout.debounceRender();
    }, 1000)
]