process.env.partKeyAddress = 'LFLL27QB3GZCGP3C4OQW64PAHDHVS65TWL2L3XCUW5LRFJCPX75HXNMVXA';
process.env.dataDir = '/Users/don/algorand/node/data';

const screen = require('blessed').screen();
const Layout = require('./component/layout');
const home = new Layout(screen,
    {
        'home': [
            ['info',       'menu',       'menu',],
            ['partkeyinfo','partkeyinfo','partkeyinfo', ],
            ['partkeyinfo','partkeyinfo','partkeyinfo', ],
            ['node_status','node_status','node_status', ],
            ['node_status','node_status','node_status', ],
        ],
        'blocks': [
            ['info',       'menu',       'menu',],
        ],
        'log': [
            ['info',    'menu',   'menu',],
            ['log',     'log',    'log'],
            ['log',     'log',    'log'],
            ['log',     'log',    'log'],
            ['log',     'log',    'log'],
            ['log',     'log',    'log'],
        ],
    }
)
home.render();
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));