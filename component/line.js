const contrib = require('blessed-contrib')

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
        label: 'Title'
    },
    (component, render) => setInterval(() => {
        component.setData({
            x: ['t1', 't2', 't3', 't4'],
            y: [5, 1, 7, 5]
        })
        render();
    }, 1000)
]