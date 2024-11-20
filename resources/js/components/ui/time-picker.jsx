'use client'

import React, {useState, useEffect, useRef} from 'react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import moment from "moment"
import {cn} from "@/lib/utils"

const TimePicker = ({state, setState, classname}) => {
    const [isDragging, setIsDragging] = useState(false)
    const clockRef = useRef(null)
    const handleMouseDown = (e) => {
        setIsDragging(true)
        handleMouseMove(e)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        const clockElement = clockRef.current
        const rect = clockElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        const hours = ((angle / (Math.PI * 2)) * 12 + 3) % 12
        const minutes = Math.round(((hours % 1) * 60) / 5) * 5

        const newDate = new Date()
        newDate.setHours(Math.floor(hours))
        newDate.setMinutes(minutes)
        setState({...state, time: moment(newDate).format('H:m')})
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    return (
        <div className={cn("flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md", classname)}>
            <div
                className="relative cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={clockRef}

            >
                <Clock
                    value={state.time}
                    size={200}
                    hourHandWidth={4}
                    minuteHandWidth={2}
                    hourMarksWidth={2}
                    className="text-gray-800 dark:text-white"
                />
                <div className="absolute inset-0 bg-transparent" />
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
                {state?.time}
            </div>
        </div>
    )
}

export default TimePicker
