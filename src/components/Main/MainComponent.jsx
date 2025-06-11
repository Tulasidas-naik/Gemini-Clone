import React, { useContext } from 'react'
import './MainComponent.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context'
import main from '../../Gemini'
import Switch from 'react-switch'

const MainComponent = () => {
  const {
        input,
        setInput,
        loading,
        resultData,
        recentPrompt,
        prevPrompt,
        showResult,
        onSent,
        theme,
        changeTheme,
  } = useContext(Context)

  return (
    <div className='main' id={theme}>
      <div className="nav">
        <p><span>Gemini</span></p>
        <div className='user-switch'>
          <div id='switch'>
            <label>{theme} Mode</label>
            <Switch onChange={() => changeTheme()} checked={theme === 'dark'} />
          </div>
          <img src={assets.user_icon} alt="" />
        </div>
      </div>

      <div className='main-content'>
      {!showResult ?
      <div className='main-conatainer'>
        <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team building activity for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
      </div> 
      : 
      <div className='result'>
        <div className="title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="resultData">
          <img src={assets.gemini_icon} alt="" />
          {loading ?
          <div className='loading'>
              <hr />
              <hr />
              <hr />
          </div>
          : <p dangerouslySetInnerHTML={{__html: resultData}}></p>
          }

        </div>
      </div>
      }
      
      <div className="main-bottom">
        <div className='input-info'>
          <input onChange = {(e) => setInput(e.target.value)} value = {input} type='text' placeholder='Enter a prompt here'></input>
          <div className='footer-nav'>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            {input?<img onClick = {() => onSent()} src={assets.send_icon} alt="" />:null}
          </div>
        </div>
        <div className='gemini-info'>
          <p>Gemini may display inaccurate info, including about people, so double heck its responses, Your privacy and Gemini Apps.</p>
        </div>
        
      </div>
      </div>

    </div>
  )
}

export default MainComponent
