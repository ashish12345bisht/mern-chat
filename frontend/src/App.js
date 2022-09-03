import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import React, {useState} from 'react'
import Chats from './components/Chats';

const socket = io.connect("http://localhost:3001");

function App() {
  const [values,setValue]=useState({
    name:"",
    room:""
  })
  const [show,setShow] = useState(false)

  const joinRoom = ()=> {
    if(values.name && values.room){
      socket.emit('join_room',values.room)
      setShow(true)
    }
  }
  return (
    <div className="App">
      <h3>Join a Chat</h3>
      <input placeholder="John..." onChange={(e)=>setValue({...values,name:e.target.value})} />
      <input placeholder="room id..."  onChange={(e)=>setValue({...values,room:e.target.value})}/>
      <button onClick={joinRoom}>Join a Room</button>
      {show && 
        <Chats socket={socket} name={values.name} room={values.room} />}
    </div>
  );
}

export default App;
