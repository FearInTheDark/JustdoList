import React from 'react';

const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

export const MyPagination = ({links, action}) => {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4 mx-auto flex justify-center">
                <div className="flex flex-wrap mt-8 z-10  backdrop-blur-sm">
                    {links.map((link, key) => (
                        link.url === null ?
                            (
                                <div key={key} className="mr-1 mb-1 px-4 py-3 flex flex-row items-center text-sm leading-4 text-gray-400 border rounded">
                                    {decodeHtml(link.label)}
                                </div>) :
                            (<button onClick={() => action(parseInt(link.label))} key={key}
                                     className={getClassName(link.active)}>
                                {decodeHtml(link.label)}
                            </button>)
                    ))}
                </div>
            </div>

        )

    );

}

