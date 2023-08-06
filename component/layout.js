const contrib = require('blessed-contrib')

class Layout {
    layout      = null;
    grid        = null;
    created     = [];
    listeners   = {};

    constructor(layout) {
        this.layout = layout;
    }

    create(componentName) {
        const [mod, config, callback] = require(`./${componentName}`);
        const component = this.grid.set.apply(this.grid, this.getLayoutCoordinates(componentName).concat([mod, config]));
        try {
            callback(component, () => this.trigger('repaint'))
        } catch(e) {}

        return componentName;
    }

    getLayoutCoordinates(componentName) {
        const coord = [null, null, 0, 0];

        this.layout.forEach((row, rowIndex) => {
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

    render(screen) {
        this.grid = new contrib.grid({
            rows: this.layout.length,
            cols: this.layout[0].length,
            screen
        });

        this.layout.forEach(row => {
            row.forEach(column => {
                if (!~this.created.indexOf(column)) this.created.push(this.create(column))
            })
        });
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