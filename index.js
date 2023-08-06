const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const grid = new contrib.grid({
    rows: 4,
    cols: 5,
    screen
});

process.env.partKeyAddress = 'LFLL27QB3GZCGP3C4OQW64PAHDHVS65TWL2L3XCUW5LRFJCPX75HXNMVXA';

var renderqueue = 0;
function queueRender() {
    renderqueue = 1;
}
setInterval(() => {
    if (!renderqueue) return;
    screen.render();
}, 1000);

const { create } = require('./component/factory')

create('logo',          grid, [0, 0, 1, 2], queueRender);
create('line',          grid, [0, 2, 2, 3], queueRender);
create('wallet',        grid, [1, 0, 1, 2], queueRender);
create('partkeyinfo',   grid, [2, 0, 1, 2], queueRender);
create('log',           grid, [3, 2, 1, 3], queueRender);
create('node_status',   grid, [3, 0, 1, 2], queueRender);

screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));