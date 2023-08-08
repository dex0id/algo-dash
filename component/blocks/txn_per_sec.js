const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.sparkline,
    {
        style: {
            line: "yellow",
            text: "green",
            baseline: "black"
        },
        xLabelPadding: 3,
        xPadding: 5,
        label: 'Transactions / Sec',
        // barWidth: 10,
        barSpacing: 6,
        xOffset: 0,
       maxHeight: 9,
       tags: true
    },
    (component, layout) => {
        const interval = setInterval(() => {
            if (!component.visible) return clearInterval(interval);
            const blocks = dataModel.get('blocks');

            const { data } = Array.from(blocks).slice(-20).reverse().reduce((carry, [key, value]) => {
                if (carry.previous) {
                    const secondsDiff = carry.previous.ts - value.ts
                    carry.data.set(key, +(value.txn.length / secondsDiff).toFixed(2))
                }
                carry.previous = value;
                return carry;
            }, { previous: null, data: new Map() });

            if (data.size) {
                component.setData([''], [Array.from(data.values())])
                layout.debounceRender();
            }
        }, 1000)
    }
]