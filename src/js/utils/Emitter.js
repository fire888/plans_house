

export const createEventEmitter = function () { 
    const storage = {}
    return { 
        emit: (id, data) => getOrCreateArrFromObj(storage, id)
            .forEach(action => action(data)),
        subscribe: (id, callback) => getOrCreateArrFromObj(storage, id)
            .push(callback)
    }
}

const getOrCreateArrFromObj = (obj, key) => obj[key] || []

