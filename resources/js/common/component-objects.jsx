import React from "react"

const icons = {
    updated: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
        <path fill="currentColor" d="M10.2 3.28c3.53 0 6.43 2.61 6.92 6h2.08l-3.5 4l-3.5-4h2.32a4.44 4.44 0 0 0-4.32-3.45c-1.45 0-2.73.71-3.54 1.78L4.95 5.66a6.97 6.97 0 0 1 5.25-2.38m-.4 13.44c-3.52 0-6.43-2.61-6.92-6H.8l3.5-4c1.17 1.33 2.33 2.67 3.5 4H5.48a4.44 4.44 0 0 0 4.32 3.45c1.45 0 2.73-.71 3.54-1.78l1.71 1.95a6.95 6.95 0 0 1-5.25 2.38"></path>
    </svg>,
    created: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"></path>
        <path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"></path>
    </svg>,
    deleted: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"></path>
        </g>
    </svg>,
    restored: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <circle cx={12} cy={12} r={0} fill="currentColor">
            <animate fill="freeze" attributeName="r" begin="0.8s" dur="0.2s" values="0;2"></animate>
        </circle>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path strokeDasharray={48} strokeDashoffset={48} d="M4.25 14c0.89 3.45 4.02 6 7.75 6c4.42 0 8 -3.58 8 -8c0 -4.42 -3.58 -8 -8 -8c-2.39 0 -4.53 1.05 -6 2.71l-2 2.29">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"></animate>
            </path>
            <path fill="currentColor" strokeWidth={1} d="M5.63 7.38l0 0l0 0l0 0z" opacity={0}>
                <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M5.63 7.38l0 0l0 0l0 0z;M5.63 7.38L3.5 5.25L3.5 9.5L7.75 9.5z"></animate>
                <set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set>
            </path>
        </g>
    </svg>,
    missed: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
        <path fill="currentColor" d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8m5 11l-3-3l3-3l-2-2l-3 3l-3-3l-2 2l3 3l-3 3l2 2l3-3l3 3z"></path>
    </svg>,
    finished: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 100 100">
        <path fill="currentColor" d="M50 0a3.5 3.5 0 0 0-3.5 3.5v80A3.5 3.5 0 0 0 50 87a3.5 3.5 0 0 0 3.5-3.5V47h43a3.5 3.5 0 0 0 3.5-3.5v-40A3.5 3.5 0 0 0 96.5 0h-46a4 4 0 0 0-.254.01A4 4 0 0 0 50 0m13.8 7h9.8v7.43h9.8V7H93v7.43h-9.6v9.799H93v9.8h-9.6V40h-9.8v-5.97h-9.8V40H54v-5.97h9.8v-9.801H54v-9.8h9.8zm0 7.43v9.799h9.8v-9.8zm9.8 9.799v9.8h9.8v-9.8z" color="currentColor"></path>
        <path fill="currentColor" d="M38.004 76.792C27.41 78.29 20 81.872 20 87.143C20 94.243 32.381 100 50 100s30-5.756 30-12.857c0-5.272-7.41-8.853-18.003-10.35l-1.468 2.499C68.514 80.399 74 82.728 74 85.429c0 3.787-10.745 6.857-24 6.857s-24-3.07-24-6.857c-.001-2.692 5.45-5.018 13.459-6.13z" color="currentColor"></path>
    </svg>
}

export {icons}
