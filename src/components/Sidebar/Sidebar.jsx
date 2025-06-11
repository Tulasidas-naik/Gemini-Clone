import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context'

const Sidebar = () => {
  const { onSent, prevPrompt, setRecentPrompt, newChat, theme } = useContext(Context);

  const [ extended, setExtended ] = useState(false);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt);
  }

  return (
    <div className='sidebar' id={theme}>
      <div className="sidebar-top">
        <img onClick = {() => setExtended(prev=>!prev)} src={assets.menu_icon} className='menu' alt="" />
        <div onClick = {() =>newChat() }className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null }
        </div>
        {extended ? 
        <div className="history">
            <p className='title'>Recent</p>
            {
            prevPrompt.map((item, index) => {
              return (
              <div onClick={()=> loadPrompt(item)} key = {index} className='recent-history'>
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 18)}...</p>
              </div>
              )
            })}
           
        </div> : null }
      </div>
      <div className="sidebar-bottom">
        <div className="bottom recent-history">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null }
        </div>
        <div className="bottom recent-history">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null }
        </div>
        <div className="bottom recent-history">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
