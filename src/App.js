import logo from './logo.svg';
import './App.css';
import {useState, useEffect } from "react"
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Record from "./components/Record"
import {CSVLink} from "react-csv"
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  const [data,setData] = useState([]);
  const [showData,setShowData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [selectedData,setSelectedData] = useState([]);
  const [checked,setChecked] = useState(false);
  const [sortType,setSort] = useState([ {name : {ascending:false,clicked:false}},{gender: {ascending:false,clicked:false}},{dob: {ascending:false,clicked:false}},{email: {ascending:false,clicked:false}},{phone: {ascending:false,clicked:false}}])

  const headers = [
    {label:'Name',key:'Name'},
    {label:'Gender',key:'Gender'},
    {label:'DOB',key:'DOB'},
    {label:'Email',key:'Email'},
    {label:'Phone',key:'Phone'},
    {label:'Age',key:'Age'}
  ]

  const csvReport = {
    filename:'Userinfo.csv',
    headers:headers,
    data:selectedData
  }

  console.log(selectedData)
  console.log("show data")
  console.log(showData)

  const addUserHandler = (item)=>{

    console.log(item)
    const name = {Name: `${item.name.title}. ${item.name.first} ${item.name.last}`,
                  Gender: `${item.gender}`,
                  DOB:new Date(item.dob.date).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric'}),
                  Email:`${item.email}`,
                  Phone:`${item.phone}`,
                Age : `${item.dob.age}`}
    setSelectedData((prev)=>{
      return [...prev,name]
    })
  }

  const removeUserHandler = (item)=>{
    setSelectedData((prev)=>{
      return prev.filter((record)=>{
        return !(record.Name === `${item.name.title}. ${item.name.first} ${item.name.last}` && record.Gender === `${item.gender}` && record.Email === `${item.email}` && record.Phone === `${item.phone}` && record.Age === `${item.dob.age}`)
      })
    })
  }


  useEffect(async()=>{
    const getRequest = async()=>{
      
      const userinfo = await fetch("https://randomuser.me/api/?results=100").then(async(response)=>{
        return response.json();
      });

      console.log(await userinfo)
      setData(userinfo.results)
      setShowData(userinfo.results)
      setLoading(false);
    }

    await getRequest();
  },[])

  const InputHandler = (e)=>{
    console.log(e.target.value)
    const subname = e.target.value;
    if(subname.trim().length !== 0){
      console.log("hi")

        const searcheduser =  data.filter((item)=>{
          console.log(item.name.title)
          const Name = item.name.title +" "+item.name.first+" "+item.name.last
          return Name.includes(subname)
        })
        console.log("data")
        setShowData(searcheduser)
    }

  }

  const modeHandler = (e)=>{
    console.log("mode change")
    setChecked((prev)=>{
      return !prev;
    })
  }

  const sortColumn = (column)=>{
    console.log(column);
    let obj = [...showData]
    if(column === 'name'){
      let type = 1
      if (sortType[0].name.ascending){
        type = -1;

      }
      obj.sort((a,b)=>{
        if(`${a.name.title}. ${a.name.first} ${a.name.last}` === `${b.name.title}. ${b.name.first} ${b.name.last}`){
          return 0;
        }
        return (`${a.name.title}. ${a.name.first} ${a.name.last}` > `${b.name.title}. ${b.name.first} ${b.name.last}`)?1*type:-1*type;
      })
      setSort([{name : {ascending:(type === 1)?true:false,clicked:true}},{gender: {ascending:false,clicked:false}},{dob: {ascending:false,clicked:false}},{email: {ascending:false,clicked:false}},{phone: {ascending:false,clicked:false}}])
    }
    else if(column === 'gender'){
      let type = 1
      if( sortType[1].gender.ascending){
        type = -1
      } 
      obj.sort((a,b)=>{
        if(a.gender === b.gender){
          return 0;
        }
        return (a.gender > b.gender)?1*type:-1*type;
      })
      setSort([{name : {ascending:false,clicked:false}},{gender: {ascending:(type === 1)?true:false,clicked:true}},{dob: {ascending:false,clicked:false}},{email: {ascending:false,clicked:false}},{phone: {ascending:false,clicked:false}}])
    }
    else if(column === 'dob'){
      let type = 1
      if(sortType[2].dob.ascending){
        type = -1
      }
      obj.sort((a,b)=>{
        return (new Date(a.dob.date) - new Date(b.dob.date))*type
      })
      setSort([{name : {ascending:false,clicked:false}},{gender: {ascending:false,clicked:false}},{dob: {ascending:(type===1)?true:false,clicked:true}},{email: {ascending:false,clicked:false}},{phone: {ascending:false,clicked:false}}])
    }
    else if(column === 'email'){
      let type = 1
      if(sortType[3].email.ascending){
        type = -1
      }
       obj.sort((a,b)=>{
         if(a.email === b.email){
           return 0;
         }
        return (a.email > b.email)?1*type:-1*type;
      })
      setSort([{name : {ascending:false,clicked:false}},{gender: {ascending:false,clicked:false}},{dob: {ascending:false,clicked:false}},{email: {ascending:(type===1)?true:false,clicked:true}},{phone: {ascending:false,clicked:false}}])
    }
    else if(column === 'phone'){
      let type = 1
      if(sortType[4].phone.ascending){
        type = -1
      }
      obj.sort((a,b)=>{
        if(a.phone === b.phone){
          return 0;
        }
        return (a.phone > b.phone)?1*type:-1*type
      })
      setSort([{name : {ascending:false,clicked:false}},{gender: {ascending:false,clicked:false}},{dob: {ascending:false,clicked:false}},{email: {ascending:false,clicked:false}},{phone: {ascending:(type===1)?true:false,clicked:true}}])
    }
    setShowData(obj)
  }

  const showGender = (gender)=>{
    console.log(gender)
    if(gender === 'both'){
      setShowData(data)
    }else{
      const obj = data.filter((item)=>{
        return item.gender === gender
      })
      setShowData(obj);
    }
  }

  if(loading){
    return <CircularProgress className="loader" color="success" />
  }

  return (
    <div className={`App ${checked && 'dark'}`}>
      <div className= {`top`} >
        <div className='searchBar'>
          <SearchIcon className='icon'/>
          <input type="text" placeholder='Enter the Name' onChange={InputHandler}></input>
        </div>
        <div className={`button ${checked && 'darkbtn'}`}>
          <CSVLink {...csvReport}><button className={`${checked && 'btndark'}` } disabled={selectedData.length === 0 && true}><FileDownloadIcon className='downloadIcon'/>Export</button></CSVLink>
        </div>
        <div className='switch'>
          <Switch color="secondary" onChange={modeHandler}/>
        </div>
      </div>
      <div className="mainwrapper">
      <div className='filter'>
          <div className='title'>
            FILTER
          </div>
          <div className='gender'>
            <div className='title'>
              <b>GENDER</b>
            </div>
            <div className='option'>
            <RadioGroup>
              <FormControlLabel value="female" control={<Radio />} label="Female" onClick={()=>{showGender('female')}} />
              <FormControlLabel value="male" control={<Radio />} label="Male" onClick={()=>{showGender('male')}}/>
              <FormControlLabel value="both" control={<Radio />} label="Both" onClick={()=>{showGender('both')}}/>
            </RadioGroup>
            </div>
          </div>
        </div>
      <div className='showUsers'>
        
        <table>
        <tr className={`${!checked?'title':'darktitle'}`}>
          <th className='name' onClick={()=>{sortColumn('name')}}>Name {(sortType[0].name.clicked) && ((sortType[0].name.ascending)?<ArrowDownwardIcon />:<ArrowUpwardIcon />) }</th>
          <th className='gender' onClick={()=>{sortColumn('gender')}}>Gender {(sortType[1].gender.clicked) && ((sortType[1].gender.ascending)?<ArrowDownwardIcon />:<ArrowUpwardIcon />) }</th>
          <th className='dob' onClick={()=>{sortColumn('dob')}}>DOB {(sortType[2].dob.clicked) && ((sortType[2].dob.ascending)?<ArrowDownwardIcon />:<ArrowUpwardIcon />) }</th>
          <th className='email' onClick={()=>{sortColumn('email')}}>Email {(sortType[3].email.clicked) && ((sortType[3].email.ascending)?<ArrowDownwardIcon />:<ArrowUpwardIcon />) }</th>
          <th className='phone' onClick={()=>{sortColumn('phone')}}>Phone {(sortType[4].phone.clicked) && ((sortType[4].phone.ascending)?<ArrowDownwardIcon />:<ArrowUpwardIcon />) }</th>
        </tr>
        {showData.map((item,index)=>{
          return <Record key={index} id={index} item={item} mode={checked} addUser= {addUserHandler} removeUser={removeUserHandler}/>
        })}
        </table>
      </div>
      </div>
    </div>
  );
}

export default App;
