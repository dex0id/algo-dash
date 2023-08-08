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
        columnWidth: [25, 25, 25, 25]
    },
    (component, layout) => {
        try {
            const participation = dataModel.get('participation');
            component.setData({
                headers: ['Key', 'Address', 'Last Valid Round', 'Estimated Expiration'],
                data: participation.reduce((carry, partkeyinfo) => {
                    const now = Date.now();
                    const node = dataModel.get('node');
                    const blockDiff = partkeyinfo['effective-last-valid'] - node.current_round;
                    const blockDiffTime = blockDiff * dataModel.Average_Block_Time;

                    carry.push([
                        partkeyinfo.id.substring(0,20) + '...',
                        partkeyinfo.address.substring(0,20) + '...',
                        partkeyinfo['effective-last-valid'],
                        (new Date( now + (blockDiffTime) )).toLocaleString()
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