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
        const { version } = dataModel.get('node');
        component.setContent(`     _   _                           _   _  _         _
    /_\\ | |__ _ ___ _ _ __ _ _ _  __| | | \\| |___  __| |___
   / _ \\| / _\` / _ \\ '_/ _\` | ' \\/ _\` | | .\` / _ \\/ _\` / -_)
  /_/ \\_\\_\\__, \\___/_| \\__,_|_||_\\__,_| |_|\\_\\___/\\__,_\\___|
          |___/ ${version}
        `);
        layout.debounceRender();
    }
]