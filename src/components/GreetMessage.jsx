import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants";

const GreetMessage = () => {
    const [message, setMessage] = useState("");
    useEffect(() => {


        fetchData = async () => {
            const data = await fetch(BASE_URL + "/api/DisplayGreet");
            const result = await data.text()
            setMessage(result)
        }
        fetchData()
    }, [])
    return (<>
        <h1>{message}</h1>
    </>)

}

export default GreetMessage;
