const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.bar,
    {
        style: {
            line: "yellow",
            text: "green",
            baseline: "black"
        },
        xLabelPadding: 3,
        xPadding: 5,
        label: 'Transactions / Block',
        barWidth: 10,
        barSpacing: 6,
        xOffset: 0,
       maxHeight: 9,
    },
    (component, layout) => {
        const inverval = setInterval(() => {
            if (!component.visible) clearInterval(inverval);
            const blocks = dataModel.get('blocks');

            const { titles, data } = Array.from(blocks).slice(-7).reverse().reduce((carry, [key, value]) => {
                carry.titles.push(""+value.rnd);
                carry.data.push(value.txns.length);
                return carry;
            }, {titles: [], data: []});

            if (data.length && titles.length) {
                component.setData({ titles, data })
                layout.debounceRender();
            }
        }, 1000)
    }
]