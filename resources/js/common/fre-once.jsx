import React from 'react';

const FreOnce = ({color = "currentColor", width = "1em", height = "1em"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
            <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12V9a3 3 0 0 1 3-3h13m-3-3l3 3l-3 3m3 3v3a3 3 0 0 1-3 3H4m3 3l-3-3l3-3m4-4l1-1v4"></path>
        </svg>
    );
};

export default FreOnce;
