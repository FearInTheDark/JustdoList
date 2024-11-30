import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState(null);

    return (
        <EventContext.Provider value={{ selectedEvent, setSelectedEvent, events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};
