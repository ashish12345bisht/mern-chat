import React,{useEffect, useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chats = ({socket,name,room}) => {
    const [message,setMessage] = useState("")
    const [messageList,setMessageList] = useState([])

    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            setMessageList([...messageList,data])
        })
    },[socket])
    const sendMessage=async()=>{
        if(message){
            console.log(message)
            const messageData={
                room,
                name,
                message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message',messageData);
        }
    }
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
        <ScrollToBottom className='message-container'>{
            messageList.map((item)=>(
                <div>
                    <p><strong>{item.name}</strong>:{item.message}</p>
                    <p>{item.time}</p>
                </div>
            ))
        }</ScrollToBottom></div>
        <div className='chat-footer'>
            <input type="text" placeholder='Type Your Message Here...'
                onChange={e=>setMessage(e.target.value)}
                onKeyPress={e=>{
                    e.key==='Enter' && sendMessage()
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chats