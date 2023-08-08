const contrib = require('blessed-contrib')
const dataModel = require('../data/model')

module.exports = [
    contrib.table,
    {
        label: "Part Key Info",
        left: 1,
        right: 1,
        height: 10,
        align: 'left',
        columnWidth: '50%'
    },
    (component, layout) => {
        try {

            const participation = dataModel.get('participation');

            const data = participation.reduce((carry, partkeyinfo) => {
                carry.push([
                    partkeyinfo.address,
                    partkeyinfo.id,
                    (new Date(Date.now() + ( (partkeyinfo['effective-last-valid'] - dataModel.get('current_round')) * dataModel.Average_Block_Time ) )).toLocaleString()
                ])
                return carry;
            }, []);

            component.setData({
                headers: ['key', 'address', 'expires'],
                data: data
            })
        } catch(e) {
            component.setContent(e.toString());
        }

        layout.debounceRender();
    }
]