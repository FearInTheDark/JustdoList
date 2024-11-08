import {Link} from "@inertiajs/react";

const Credit = () => {
    return <>
        <div className="fixed font-ui bottom-2  text-sm right-2 z-[300] text-gray-500/60 rounded-lg flex justify-end items-center px-2">
            <span>JustdoList&reg; - A simple todo list app<br/>
                <span className="hidden sm:block">Authorized by{" "}
                    <a className="text-gray-600" href="https://github.com/FearInTheDark" target="_blank">Vincent Tran&#174;</a>
                </span>
            </span>
        </div>
    </>
}

export default Credit
