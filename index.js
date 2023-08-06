process.env.partKeyAddress = 'LFLL27QB3GZCGP3C4OQW64PAHDHVS65TWL2L3XCUW5LRFJCPX75HXNMVXA';

const screen = require('blessed').screen();
const Layout = require('./component/layout');
const layout = new Layout(
    [
        ['logo',            'wallet',        'log',    'log',    'log'],
        ['partkeyinfo',     'partkeyinfo',   'log',    'log',    'log'],
        ['partkeyinfo',     'partkeyinfo',   'log',    'log',    'log'],
        ['node_status',     'node_status',   'log',    'log',    'log'],
        ['node_status',     'node_status',   'log',    'log',    'log'],
    ]
)
layout.on('repaint', () => screen.render())
layout.render(screen);
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));