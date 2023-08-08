const blessed = require('blessed')
const fs = require('fs/promises');

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
        const content = [];
        content.push('{white-fg}{green-bg}{bold}Algorand Node{/bold}{/green-bg}{/white-fg}');
        content.push('Algorand Node TUI Dashboad (v0.0.1)');

        try {
            if (Object.keys(info).length) {
                content.push(`Process ID: ${info.processID}`);
                content.push(`Local API Host: ${info.localApiHost}`);
                content.push(`Genesis ID: ${info.walletGenesisID}`);
            } else {
                Promise.all([
                    fs.readFile(`${process.env.DATA_DIR}/algod.pid`, { encoding: 'utf8' }),
                    fs.readFile(`${process.env.DATA_DIR}/algod.net`, { encoding: 'utf8' }),
                    fs.readFile(`${process.env.DATA_DIR}/wallet-genesis.id`, { encoding: 'utf8' }),
                ]).then(([processID, localApiHost, walletGenesisID]) => {
                    info.processID = processID.trim();
                    info.localApiHost = localApiHost.trim();
                    info.walletGenesisID = walletGenesisID.trim();

                    content.push(`Process ID: ${info.processID}`);
                    content.push(`Local API Host: ${info.localApiHost}`);
                    content.push(`Genesis ID: ${info.walletGenesisID}`);

                    component.setContent(content.join("\n"));
                    layout.debounceRender();
                }, (err) => {
                    info.processID = err.toString();
                    content.push(err.toString());
                    component.setContent(content.join("\n"));
                    layout.debounceRender();
                });
            }

          } catch (err) {
            content.push(err.toString());
          }

        component.setContent(content.join("\n"));
        layout.debounceRender();
    }
]