import {createContext, useContext, useEffect, useState} from "react"

const SheetContext = createContext()

export const SheetProvider = ({children}) => {
    const [sheetOpen, setSheetOpen] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const res = await axios.get(route('list-reminders'))
        setTasks(res.data.tasks)
    }

    useEffect(() => {
        if (window.location.pathname === '/') return;
        fetchTasks().then()
        const listener = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === "L")
                setSheetOpen(pre => !pre)
            else if (e.key === "K") fetchTasks().then()
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, []);

    return (
        <SheetContext.Provider value={{sheetOpen, setSheetOpen, tasks, setTasks}}>
            {children}
        </SheetContext.Provider>
    )
}

export const useSheet = () => {
    const context = useContext(SheetContext)
    if (!context) {
        throw new Error("useSheet must be used within a SheetProvider")
    }
    return context
}
