const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const grid = new contrib.grid({
    rows: 3,
    cols: 5,
    screen
});

process.env.partKeyAddress = 'LFLL27QB3GZCGP3C4OQW64PAHDHVS65TWL2L3XCUW5LRFJCPX75HXNMVXA';

const renderqueue = 0;
const queueRender = function() {
    renderqueue = 1;
}
setInterval(() => {
    if (!renderqueue) return;
    screen.render();
}, 1000);

const { create } = require('./component/factory')

create('logo',          grid, [0, 0, 1, 2]);
create('line',          grid, [0, 2, 2, 3]);
create('wallet',        grid, [1, 0, 1, 2]);
create('log',           grid, [2, 2, 1, 3]);
create('node_status',   grid, [2, 0, 1, 2]);

screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));