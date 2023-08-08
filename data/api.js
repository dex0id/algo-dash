const fs = require('fs').promises

module.exports = class DataApi {
    async load()
    {
        try {
            const host = await fs.readFile(`${process.env.DATA_DIR}/algod.net`, { encoding: 'utf8' });
            const token = await fs.readFile(`${process.env.DATA_DIR}/algod.token`, { encoding: 'utf8' });
            const adminToken = await fs.readFile(`${process.env.DATA_DIR}/algod.admin.token`, { encoding: 'utf8' });

            this.host = host.trim();
            this.token = token.trim();
            this.adminToken = adminToken.trim();
        } catch(err) {
            console.log(err);
        }
    }

    get(resource)
    {
        return this.request('GET', resource)
    }

    async request(method, resource)
    {
        try {
            const token = resource.indexOf('/v2') === 0 ? this.adminToken : this.token;
            const response = await fetch(`http://${this.host}${resource}`, {
                method,
                headers: {
                    "X-Algo-API-Token": token,
                }
            })

            if (!response.ok) return {};

            if (resource === '/metrics') return await response.text();
            return await response.json();
        } catch(e) {
            console.log(e);
            return {}
        }
    }
}