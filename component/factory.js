module.exports.create = function create(componentName, grid, coordinates, queueRender) {
    const [mod, config, callback] = require(`./${componentName}`);
    const component = grid.set.apply(grid, coordinates.concat([mod, config]));
    try {
        callback(
            component,
            queueRender
        )
    } catch(e) {}
}