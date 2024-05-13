import { useState } from "react";
import { Button } from "react-bootstrap";

const Timer : React.FC = () => {
    const [time, setTime] = useState(new Date());

    setInterval(()=>{
        setTime(new Date());
    }, 1000);

    return (
        <>
        <h2>현재 시간 : {time.toLocaleTimeString()}</h2>
        </>
    )
}

export default Timer;