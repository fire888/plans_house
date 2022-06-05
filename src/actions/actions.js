export const createActions = (root) => {
    return {
        toggleVisibleFloor: (keyFloor, is) => {
            root.system_assets &&
                root.system_assets.toggleVisibleFloor(keyFloor, is)
        },
        changePath: (data) => {
            root.system_arrows && root.system_arrows.drawPath(data)
        }
    }
} 