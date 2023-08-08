const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.table,
    {
        keys: true,
        fg: 'white',
        selectedFg: 'white',
        selectedBg: 'green',
        interactive: true,
        label: 'Blocks',
        border: {type: "line", fg: "cyan"},
        columnSpacing: 20, //in chars,
        columnWidth: [20, 20, 20] /*in chars*/
    },
    (component, layout) => {
        component.on('click', () => component.focus());

        const interval = setInterval(() => {
            if (!component.visible) return clearInterval(interval);
            const blocks = dataModel.get('blocks');

            const data = Array.from(blocks).slice(-20).reverse().reduce((carry, [key, value]) => {
                carry.push([
                    ""+value.rnd,
                    value.txns.length,
                    (new Date(value.ts * 1000)).toLocaleString()
                ])
                return carry;
            }, []);

            if (data.length) {
                component.setData({
                    headers: ['Round', 'Total Transactions', 'Timestamp'],
                    data
                })
                layout.debounceRender();
            }
        }, 1000)
    }
]