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
        columnSpacing: 10,
        columnWidth: [50, 60, 25]
    },
    (component, layout) => {
        try {
            const participation = dataModel.get('participation');
            component.setData({
                headers: ['key', 'address', 'expires'],
                data: participation.reduce((carry, partkeyinfo) => {
                    const now = Date.now();
                    const blockDiff = partkeyinfo['effective-last-valid'] - dataModel.get('current_round');
                    const blockDiffTime = blockDiff * dataModel.Average_Block_Time;

                    carry.push([
                        partkeyinfo.id,
                        partkeyinfo.address,
                        (new Date( now + blockDiffTime )).toLocaleString()
                    ])
                    return carry;
                }, [])
            })
        } catch(e) {
            component.setContent(e.toString());
        }

        layout.debounceRender();
    }
]