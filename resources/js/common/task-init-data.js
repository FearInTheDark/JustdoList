import moment from "moment";

const taskInitData = {
    title: '',
    description: '',
    frequency: '',
    priority: '',
    time: '09:00',
    begin_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
    histories: [],
    completed: false,
    reminder: false,
}

export {taskInitData}
