import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(url)
            await setResponse(res.data)
        }
        getData().then()
        setLoading(false)
    }, []);

    return {response, loading}
}

export default useFetch;
