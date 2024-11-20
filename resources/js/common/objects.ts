const priorities = {
    low: 1,
    medium: 2,
    high: 3,
    extreme: 4,
} as const

const frequencyDescriptions = {
    once: "This task should be done once",
    daily: "This task should be done daily",
    weekly: "This task should be done weekly",
    monthly: "This task should be done monthly",
    yearly: "This task should be done yearly",
} as const

export {priorities, frequencyDescriptions}
