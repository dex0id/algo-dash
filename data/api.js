

class DataApi {
    async load()
    {
        try {
            const [host, token, adminToken] = await Promise.all([
                fs.readFile(`${process.env.DATA_DIR}/algod.net`, { encoding: 'utf8' }),
                fs.readFile(`${process.env.DATA_DIR}/algod.token`, { encoding: 'utf8' }),
                fs.readFile(`${process.env.DATA_DIR}/algod.admin.token`, { encoding: 'utf8' }),
            ])

            this.host = host;
            this.token = token;
            this.adminToken = adminToken;
        } catch(err) {
            console.log(err);
        }
    }

    get(resource, data = {})
    {
        return this.request('GET', resource, data)
    }

    async request(method, resource, data={})
    {
        try {
            const token = resource.indexOf('/v2') === 0 ? this.adminToken : this.token;
            const response = await fetch(`${this.host}${resource}`, {
                method,
                headers: {
                    "X-Algo-API-Token": token,
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) return {};

            return await response.json();
        } catch(e) {
            console.log(e);
            return {}
        }
    }
}