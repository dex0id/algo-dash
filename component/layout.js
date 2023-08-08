const contrib = require('blessed-contrib')

class Layout {
    screen      = null;
    layout      = null;
    grid        = null;
    timeout     = null;
    created     = [];
    gridCache   = {};
    listeners   = {};
    state       = { page: 'home' }

    constructor(screen, layout) {
        this.screen = screen;
        this.layout = layout;
    }

    create(componentName) {
        const [mod, config, callback] = require(`./${componentName}`);
        const component = this.grid.set.apply(this.grid, this.getLayoutCoordinates(componentName).concat([mod, config]));
        try {
            callback(component, this)
        } catch(e) {}

        return componentName;
    }

    getLayoutCoordinates(componentName) {
        const coord = [null, null, 0, 0];

        this.layout[this.state.page].forEach((row, rowIndex) => {
            row.forEach((column, colIndex) => {
                if (column === componentName) {
                    // row
                    coord[0] = coord[0] === null ? rowIndex : coord[0]
                    // column
                    coord[1] = coord[1] === null ? colIndex : coord[1]
                    // row span
                    coord[2] = (rowIndex - coord[0]) + 1;
                    // col span
                    coord[3] = (colIndex - coord[1]) + 1;
                }
            });
        });

        return coord;
    }

    debounceRender(config)
    {
        if (this.timeout) return this;
        this.timeout = setTimeout(() => this.render(config), 1000);
        return this;
    }

    render(config) {
        this.timeout = null;

        if (config) {
            Object.assign(this.state, config);
            let i = this.screen.children.length;
            while (i--) this.screen.children[i].detach();
            this.created = [];
            this.render();
        }

        const cacheKey = this.state.page;
        this.gridCache[cacheKey] = this.grid = this.gridCache.hasOwnProperty(cacheKey) ? this.gridCache[cacheKey] : new contrib.grid({
            rows: this.layout[this.state.page].length,
            cols: this.layout[this.state.page][0].length,
            screen: this.screen
        });

        this.layout[this.state.page].forEach(row => {
            row.forEach(column => {
                if (!column) return;
                if (this.created)
                if (!~this.created.indexOf(column)) this.created.push(this.create(column))
            })
        });

        this.screen.render();
    }

    trigger(event) {
        if (!this.listeners.hasOwnProperty(event)) return this;
        this.listeners[event].forEach(callback => callback());
        return this;
    }

    on(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        return this;
    }
}

module.exports = Layout