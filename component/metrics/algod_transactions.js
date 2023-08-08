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
        label: 'Messages',
        showLegend: true,
        legend: {width: 12}
    },
    (component, layout) => {
        const interval = setInterval(() => {
            if (!component.visible) return clearInterval(interval);
            const {
                time,
                algod_transaction_messages_handled,
                algod_transaction_messages_err_or_committed,
                algod_transaction_messages_remember
            } = dataModel.get('metrics');
            if (time.length) {
                component.setData([
                    {
                        title: 'Messages Handled',
                        x: time.slice(-20),
                        y: algod_transaction_messages_handled.slice(-20).map(x => +x),
                        style: { line: 'green' }
                    }, {
                        title: 'Err or Committed',
                        x: time.slice(-20),
                        y: algod_transaction_messages_err_or_committed.slice(-20).map(x => +x),
                        style: { line: 'red' }
                    }, {
                        title: 'Messages Remember',
                        x: time.slice(-20),
                        y: algod_transaction_messages_remember.slice(-20).map(x => +x),
                        style: { line: 'yellow' }
                    }
                ])
                layout.debounceRender();
            }
        }, 1000)
}
]