import { useState } from "react";
import "./Record.css"

const Record = (props)=>{

    const item = props.item;
    const [selected,setSelected] = useState(false);
    const checked = props.mode
    


    console.log(selected)

    const clickHandler = ()=>{
        console.log("clicked")

        if(!selected){
            props.addUser(item)
        }else{
            props.removeUser(item)
        }
        
        setSelected((prev)=>{
            return !prev;
        })
    }
    return <tr className={`eachuser${checked?'dark':' '} ${selected && (checked?'darkchecked':'clicked')} ${checked && 'darkrecord'}`} onClick={clickHandler}>
    <td className='name'><img src={item.picture.medium} /> {item.name.title}. {item.name.first} {item.name.last}</td>
    <td>{item.gender}</td>
    <td className='dob'>{new Date(item.dob.date).toLocaleDateString('en-US',{  year: 'numeric', month: 'long', day: 'numeric' })}</td>
    <td className='email'>{item.email}</td>
    <td className='phone'>{item.cell}</td>
    </tr>

}

export default Record;