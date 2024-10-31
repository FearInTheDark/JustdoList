import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import MyNavigation from "@/components/MyNavigation.jsx";
export default function Landing() {
    const [count, setCount] = useState(0)

    const handleClick = (e) => {
        e.preventDefault()
        setCount((prev) => {
            return prev + 1
        })
    }
    return (
        <>
            <div className="min-h-full dark:bg-gray-800">
                <MyNavigation />
                <div className="w-screen h-screen flex flex-col justify-center items-center ">
                    <span className="text-3xl font-semibold dark:text-white">Hello From TailwindCSS</span>
                    <Button className="mt-5 bg-yellow-400 hover:bg-yellow-600 text-red-600" onClick={handleClick}>
                        Click Me {count}
                    </Button>
                </div>

            </div>
        </>
    )

}
