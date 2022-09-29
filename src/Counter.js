import {useEffect, useState} from "react"

const Counter = ({number,duration}) =>{
    const [count, setCount] = useState("0");


    useEffect(() => {
        let start = 0;
        const end = parseInt(number)
        if(start===end) return;
        let totalMilSecDur = parseInt(duration)
        let incrementTime = (totalMilSecDur / end) * 1000;

        let timer =setInterval(()=>{
            start+=1;
            setCount(start)
            if(start ===end) clearInterval(timer)
        },incrementTime)


    }, [number,duration]);


    return <div>{count}</div>

}
export default Counter;
