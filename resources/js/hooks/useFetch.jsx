import {useEffect, useState} from "react";

const useFetch = (url, method, data) => {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        setResponse(json)
        setLoading(false)

    }, [url, method, data] );

    return {response, loading}
}

export default useFetch;
