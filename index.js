require('dotenv').config();

const screen = require('blessed').screen({ smartCSR: true, autoPadding: true });
screen.title = 'Algorand Node';
const Layout = require('./component/layout');
const dataModel = require('./data/model');
(async() => {
    await dataModel.load()

    const home = new Layout(screen,
        {
            'home': [
                ['header',          'header',       'header',       'info',         'info'],
                ['header',          'header',       'header',       'menu',         'menu'],
                ['partkeyinfo',     'partkeyinfo',  'partkeyinfo',  'partkeyinfo',  'partkeyinfo'],
                ['partkeyinfo',     'partkeyinfo',  'partkeyinfo',  'partkeyinfo',  'partkeyinfo'],
                ['node_status',     'node_status',  'log',          'log',          'log'],
                ['node_status',     'node_status',  'log',          'log',          'log'],
                ['node_status',     'node_status',  'log',          'log',          'log'],
                ['node_status',     'node_status',  'log',          'log',          'log'],
            ],
            'blocks': [
                ['header',          'header',           'header',           'info',             'info',],
                ['header',          'header',           'header',           'menu',             'menu',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
                ['blocks/table',    'blocks/table',     'blocks/table',     'blocks/table',     'blocks/table',],
            ],
            'log': [
                ['header',  'header', 'header', 'info', 'info',],
                ['header',  'header', 'header', 'menu', 'menu',],
                ['log',     'log',    'log',    'log',  'log'],
                ['log',     'log',    'log',    'log',  'log'],
                ['log',     'log',    'log',    'log',  'log'],
                ['log',     'log',    'log',    'log',  'log'],
                ['log',     'log',    'log',    'log',  'log'],
                ['log',     'log',    'log',    'log',  'log'],
            ],
            'metrics': [
                ['header',                  'header',                   'header',               'info',                 'info',],
                ['header',                  'header',                   'header',               'menu',                 'menu',],
                ['metrics/tx_pool_count',   'metrics/tx_pool_count',    'metrics/online',       'metrics/online',       'metrics/online'],
                ['metrics/tx_pool_count',   'metrics/tx_pool_count',    'metrics/circulating',  'metrics/circulating',  'metrics/circulating'],
                ['metrics/tx_pool_count',   'metrics/tx_pool_count',    'blocks/txn_per_sec',   'blocks/txn_per_sec',   'blocks/txn_per_sec'],
                ['blocks/txn_count',        'blocks/txn_count',         'blocks/txn_count',     'blocks/txn_count',     'metrics/algod_transactions'],
                ['blocks/txn_count',        'blocks/txn_count',         'blocks/txn_count',     'blocks/txn_count',     'metrics/algod_transactions'],
                ['blocks/txn_count',        'blocks/txn_count',         'blocks/txn_count',     'blocks/txn_count',     'metrics/algod_transactions'],
            ],
        }
    )
    home.render();
    screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));
})()