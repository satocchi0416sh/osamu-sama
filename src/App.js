import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from "react"
import Axios from "axios"
import './App.css';
import io from 'socket.io-client'

import Login from './component/pages/signup/Login';
import SignUp from "./component/pages/signup/signup"
import Top from './component/pages/top/Top';
import Header from './component/ui/header';
import Appload from './component/pages/appload/appload';
import Chat from './component/pages/chat/chat';
import SelectChat from './component/pages/chat/SelectChat';
import Profile from './component/pages/profile/Profile';
import Area from './component/pages/top/Area';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { Rect } from './ads/Ads';
import Inquiry from './component/pages/inquiry/Inquiry';

const socket = io('https://dark-tanushimaru-0706.lolipop.io')
function App() {
  const [id, setId] = useState(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [area, setArea] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newMessage, setNewMessage] = useState({})
  const isMountRef = useRef(null)

  useEffect(() => {
    const strage = localStorage.getItem("loggedDataTokenForKeijiban")
    const loggedData = JSON.parse(strage)
    if (loggedData !== null) {
      let token = loggedData["token"]
      Axios.post("https://dark-tanushimaru-0706.lolipop.io/auth", { token: token }, { withCredentials: true }).then((response) => {
        console.log(response.data)
        if (response.data.auth) {
          setId(response.data.id)
          setName(response.data.name)
          setArea(response.data.area)
          setCategory(response.data.category)
          setIsLoggedIn(true)
        }
      })
    }
  }, [])

  const login = (id, username, category, area) => {
    setIsLoggedIn(true)
    setId(id)
    setName(username)
    setCategory(category)
    setArea(area)
  }

  const logout = () => {
    Axios.post("https://dark-tanushimaru-0706.lolipop.io/logout")
    localStorage.removeItem("loggedDataTokenForKeijiban")
    setIsLoggedIn(false)
    setId(null)
    setName("")
  }

  /* チャット関係 */

  /* 自分のidに参加 */
  useEffect(() => {
    if (id !== null) {
      socket.emit("JOIN_ID", { id: id })
    }
  }, [id])

  /* リアルタイムでメッセージを取得 */
  useEffect(() => {
    isMountRef.current = true;
    socket.on("RECEIVE_MESSAGE", (data) => {
      if (isMountRef.current) {
        setNewMessage(data)
        console.log(data)
      }
    })
    return () => isMountRef.current = false
  }, [])

  /* リアルタイムでメッセージを送る */
  const sendMessage = (rId, type, message, date, time, realDate) => {
    socket.emit("SEND_MESSAGE", {
      sId: id,
      sName: name,
      rId: rId,
      type:type,
      text: message,
      date: date,
      time: time,
      realDate: realDate
    })
  }
  const [open, setOpen] = useState(false);
  const modalHandleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="App">

      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} id={id} name={name} logout={logout} openModal={modalHandleOpen} />
        <Switch>
          <Route exact path="/">
            <Top id={id} username={name} category={category} />
          </Route>

          <Route path="/area/:area">
            <Area id={id} username={name} category={category} openModal={modalHandleOpen} />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/login">
            <Login login={login} />
          </Route>

          <Route path="/inquiry">
            <Inquiry id={id} />
          </Route>

          <Route path="/profile/:userId">
            <Profile id={id} username={name} category={category} />
          </Route>

          <Route path="/appload/:id">
            <Appload id={id} area={area} openModal={modalHandleOpen} />
          </Route>

          <Route path="/selectChat/:id">
            <SelectChat id={id} newMessage={newMessage} openModal={modalHandleOpen} />
          </Route>

          <Route path="/chat/:rId">
            <Chat id={id} name={name} newMessage={newMessage} sendMessage={sendMessage} />
          </Route>
        </Switch>
      </BrowserRouter>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
          {/* 広告を挿入 */}
          {(() => {

            const i = getRandomInt(Rect.length)
            return (
              <a href={Rect[i].url}>
                <img
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "95%",
                    maxWidth:"500px"
                  }}
                  src={Rect[i].img}
                  alt="ad" />
              </a>
            )

          })()}

        </Box>
      </Modal>
    </div>
  );
}

export default App;