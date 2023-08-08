require('dotenv').config();

const screen = require('blessed').screen();
const Layout = require('./component/layout');
const dataModel = require('./data/model');
(async() => await dataModel.load())
const home = new Layout(screen,
    {
        'home': [
            ['info',       'menu',       'menu',        'menu', 'menu'],
            ['partkeyinfo','partkeyinfo','partkeyinfo', 'log', 'log'],
            ['partkeyinfo','partkeyinfo','partkeyinfo', 'log', 'log'],
            ['node_status','node_status','node_status', 'log', 'log'],
            ['node_status','node_status','node_status', 'log', 'log'],
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