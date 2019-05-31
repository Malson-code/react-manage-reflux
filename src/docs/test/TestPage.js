import React,{useState,useEffect,useRef} from 'react';
import {} from 'antd';
function Counter() {
    let [count, setCount] = useState(2);
  
  
    return <h1>{count}</h1>;
  }
const TestPage =  (props)=> {
    console.log(props);
    const [count,setCount] = useState(3)
    useEffect(()=>{
        console.log(count);
    })
    return (
        <div onClick = {()=>setCount(2)}>
            TestPage!{count}
            {props.children}
        </div> 
    )
}

export default function showPage() {
    return <TestPage name='malson'>
        <div>hhh</div>
        <Counter />
    </TestPage>
}

