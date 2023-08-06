module.exports.create = function create(componentName, grid, coordinates) {
    const [mod, config, callback] = require(`./${componentName}`);
    callback(
        grid.set(coordinates.concat([mod, config])),
        queueRender
    );
}