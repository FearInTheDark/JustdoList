import React from 'react';

const DateCalendar = () => {
    return (
        <div className="font-bold font-ui">
            {new Date().getDate()}
        </div>
    );
};

export default DateCalendar;
