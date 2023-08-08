const blessed = require('blessed')

module.exports = [
    blessed.listbar,
    {
        label: "Menu",
        mouse: true,
        keys: true,
        interactive: true,
        invertSelected: true,
        autoCommandKeys: false,
        style: {
            selectedBg: 'white',
            selectedFg: 'black',
            selectedBold: true,
            selectedUnderline: true,
            itemBg: 'black',
            itemFg: 'white',
        },
    },
    (component, layout) => {
        component.items.forEach(component.removeItem);
        component.focus();

        ['Home', 'Blocks', 'Log'].forEach(item => {
            component.addItem(item);
        });
        component.on('select', item => layout.render({ page: item.getText().split(':').pop().toLowerCase() }))
    }
]