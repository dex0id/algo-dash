const contrib = require('blessed-contrib')
const dataModel = require('../../data/model')

module.exports = [
    contrib.line,
    {
        style: {
            line: "yellow",
            text: "green",
            baseline: "black"
        },
        xLabelPadding: 3,
        xPadding: 5,
        label: 'Txn Pool Count',
        showLegend: true,
        legend: {width: 12}
    },
    (component, layout) => setInterval(() => {
        const {
            time,
            algod_tx_pool_count,
        } = dataModel.get('metrics');
        if (time.length) {
            component.setData([
                {
                    title: 'Txn Pool Count',
                    x: time.slice(-20),
                    y: algod_tx_pool_count.slice(-20).map(x => +x),
                    style: { line: 'green' }
                }
            ])
            layout.debounceRender();
        }
    }, 1000)
]