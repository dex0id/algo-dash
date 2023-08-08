const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.gauge,
    {
        label: 'Online Supply',
        gaugeSpacing: 2,
        gaugeHeight: 1,
    },
    (component, layout) => {
        const interval = setInterval(() => {
            if (!component.visible) return clearInterval(inverval);
            const {
                online,
                total,
            } = dataModel.get('supply');

            const onlinePercent = (online / total * 100).toFixed(2);

            component.setStack([{ percent: onlinePercent, stroke: 'green'}, { percent: 100 - onlinePercent, stroke: 'red'}]);
            // component.setGauges([
            //     { showLabel: true, label: 'Online Supply', stack: [{ label: "online", percent: onlinePercent, stroke: 'green'}, { label: 'total', percent: 100 - onlinePercent, stroke: 'red'}] },
            //     { showLabel: true, label: 'Circulating Supply', stack: [{label: 'circulating', percent: circulatingSupplyPer, stroke: 'blue'}, {label: 'total', percent: 100 - circulatingSupplyPer, stroke: 'grey'}] },
            // ])
            layout.debounceRender();
        }, 1000)
    }
]