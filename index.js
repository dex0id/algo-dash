const { exec } = require('node:child_process')
const Tail = require('nodejs-tail');
const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const grid = new contrib.grid({
    rows: 3,
    cols: 5,
    screen
});

const line = grid.set(
    0, 2, 2, 3,
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
    }
)

line.setData({
    x: ['t1', 't2', 't3', 't4'],
    y: [5, 1, 7, 5]
})


const log = grid.set(
	2,2,1,3,
	contrib.log,
	{ fg: "green"
      , label: 'Server Log'
      , height: "20%"
      , tags: true
      , border: {type: "line", fg: "cyan"} }
)

const filename = '/home/ubuntu/node/data/node.log';
const tail = new Tail(filename);
tail.on('line', (line) => {
	if (!~line.indexOf('LFLL27QB3GZCGP3C4OQW64PAHDHVS65TWL2L3XCUW5LRFJCPX75HXNMVXA')) return;
	log.log(line);
	screen.render();

})
tail.watch();

const wallet = grid.set(
   1,0,1,2,
	blessed.box,
{
                label: "Node Wallets",
  left: 1,
  right: 1,
  height: 10,
  align: 'left',
}
);

exec('goal wallet list', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }

        wallet.setContent(output);
	screen.render();
})



const text = grid.set(
    2,0,1,2,
    blessed.box,
	{
		label: "Node Status",
  left: 1,
  right: 1,
  height: 10,
  align: 'left',
}
)

setInterval(() => {

exec('goal node status', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }

	text.setContent(output);
screen.render();
})

}, 1000);

const pic = grid.set(
    0, 0, 1, 2,
    contrib.picture,
    {
        file: './logo.png',
        type: 'overlay',
        cols: 18,
        onReady: () => screen.render()
    }
)

screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));