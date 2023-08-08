const DataApi = require('./api')
const fs = require('fs').promises
class DataModel {
    Average_Block_Time = 3.3 * 10000;

    _data = { blocks: new Map() }

    constructor(data)
    {
        this._data = data;
    }

    // load all data from all sources into this model so it can be used between components.

    async load()
    {
        this.api = new DataApi();
        await this.api.load();

        const pid = await fs.readFile(`${process.env.DATA_DIR}/algod.pid`, { encoding: 'utf8' });
        const [versions, metrics, participation] = await Promise.all([
            this.api.get('/versions'),
            this.api.get('/metrics'),
            this.api.get('/v2/participation'),
        ]);

        const { major, minor, build_number, channel } = versions.build;
        this._data.node = {
            process_id: pid,
            genesis_id: versions.genesis_id,
            genesis_hash: versions.genesis_hash_b64,
            version: `${major}.${minor}.${build_number}.${channel}`
        };

        this._data.metrics = metrics.match(/^[^#].+/gm).reduce((c,l) => {
            const [key, value] = l.match(/\w+/g);
            c[key] = value;
            return c;
        }, {});

        this._data.participation = participation;

        setInterval(async () => {
            const supply = await this.api.get('/v2/ledger/supply');
            this._data.current_round = supply.current_round;
            this._data.supply = {
                online: supply['online-money'],
                total:  supply['total-money'],
            };

            const { block } = await this.api.get(`v2/blocks/${this._data.current_round}`);
            this._data.blocks.set(block.rnd, block);
            this._data.node.time_since_last_block = Date.now() - block.ts;
            console.log(this._data)
        }, 1000)
    }

    get(key)
    {
        return this._data[key];
    }

    set(key, value)
    {
        this._data[key] = value;
        return this;
    }
}

globalThis.dataModel = globalThis.dataModel || new DataModel();
module.exports = globalThis.dataModel;