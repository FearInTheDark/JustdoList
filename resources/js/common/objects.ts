const priorities = {
    low: 1,
    medium: 2,
    high: 3,
    extreme: 4,
} as const

const keywords = {
    '_today': {
        frequency: 'once',
        begin_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
    },
    '_tomorrow': {
        frequency: 'once',
        begin_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
        end_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    },
    '_once': {
        frequency: 'once',
        begin_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
    },
    '_daily': {
        frequency: 'daily',
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    },
    '_weekly': {
        frequency: 'weekly',
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    },
    '_monthly': {
        frequency: 'monthly',
        end_date: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().split('T')[0],
    },
    '_yearly': {
        frequency: 'yearly',
        end_date: new Date(new Date().setDate(new Date().getDate() + 365)).toISOString().split('T')[0],
    },
    '_low': {
        priority: 'low',
    },
    '_medium': {
        priority: 'medium',
    },
    '_high': {
        priority: 'high',
    },
    '_extreme': {
        priority: 'extreme',
    },
    '_reminder': {
        reminder: true,
    },
} as const

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 1,
        slidesToSlide: 1
    }
} as const

const freDots = {
    once: "bg-blue-500",
    daily: "bg-green-500",
    weekly: "bg-yellow-500",
    monthly: "bg-red-500",
    yearly: "bg-purple-500",
} as const

const priorDots = {
    low: "bg-yellow-500",
    medium: "bg-rose-300",
    high: "bg-red-500",
    extreme: "bg-purple-500",
}

const frequencyDescriptions = {
    once: "This task should be done once",
    daily: "This task should be done daily",
    weekly: "This task should be done weekly",
    monthly: "This task should be done monthly",
    yearly: "This task should be done yearly",
} as const

export {priorities, frequencyDescriptions, keywords, responsive, freDots, priorDots}
