import moment from "moment";

const taskInitData = {
    title: null,
    description: null,
    frequency: null,
    priority: null,
    time: '09:00',
    begin_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
    completed: false,
    reminder: false,
}

export {taskInitData}
