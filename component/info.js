const blessed = require('blessed')
const dataModel = require('../data/model')

const info = {

}

module.exports = [
    blessed.box,
    {
        tags: true,
        style: {
            fg: "green",
        }
    },
    async (component, layout) => {
        const { process_id, version } = dataModel.get('node');
        component.setContent([
            '{center}{white-fg}{green-bg}{bold}  Algorand Node  {/bold}{/green-bg}{/white-fg}{/center}',
            'Algorand Node Dashboad: v0.0.1',
            `Algorand Node: ${version}`,
            `Process ID: ${process_id}`,
        ].join("\n"));
        layout.debounceRender();
    }
]