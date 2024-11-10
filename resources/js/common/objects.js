const priorities = {
    low: 1,
    medium: 2,
    high: 3,
    extreme: 4,
}

const frequencies = {
    daily: 1,
    weekly: 2,
    monthly: 3,
    yearly: 4,
}

const prioritiesMap = new Map([
    [priorities.low, 'Low'],
    [priorities.medium, 'Medium'],
    [priorities.high, 'High'],
    [priorities.extreme, 'Extreme'],
])

export {priorities, frequencies}
