import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Axios from "axios"
import Talk from "./Talk";
import Image1 from "../../images/135683.png"
import { storage } from "../appload/firebase"

const Chat = (props) => {
    const { id, name, sendMessage, newMessage } = props
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState("")
    const [ mode, setMode ] = useState(false)
    const [ image, setImage ] = useState("")
    const [ email, setEmail ] = useState("")//相手ユーザーのメールアドレス
    const [ openImage, setOpenImage ] = useState("")
    const messagesEndRef = useRef(null)
    const history = useHistory()
    const { state } = useLocation();
    const { rId } = useParams();
    
    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getMessages/${id}/${rId}`)
        .then((response) => {
            setMessageList(response.data);
            console.log(response.data)
        })
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getEmail/${rId}`)
        .then((response) => {
            console.log(response.data.email)
            setEmail(response.data.email)
        })
    }, [id, rId])

    useEffect(() => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/setRead/${id}/${rId}`)
    }, [])

    useEffect(() => {
        if (newMessage.sId === Number(rId)) {
            setMessageList(messageList => [...messageList, newMessage])
            scrollToBottom()
            Axios.post(`https://dark-tanushimaru-0706.lolipop.io/setRead/${id}/${rId}`)
        }
    }, [newMessage])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const changeImage = (e) => {
        if (e.target.files[0] !== null) {
            let blob = new Blob([e.target.files[0]], { type: "image/jpeg" })
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            const N = 30;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
            const uploadRef = storage.ref("images").child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setImage(url)
                    console.log(url)
                }
                )
            })
        }
    }

    const onClickSend = (e) => {
        e.preventDefault()
        const today = new Date();
        const year = String(today.getFullYear())
        const month = String(Number(today.getMonth()) + Number(1))
        const date = String(today.getDate())
        const allDate = year + "/" + month + "/" + date;
        const hour = today.getHours()
        let minute = String(today.getMinutes())

        if (minute.length === 1) {
            minute = "0" + minute
        }
        console.log(minute)
        const allTime = hour + ":" + minute
        const realDate = month + "/" + date

        if(mode){
            sendMessage(rId, 1, image, allDate, allTime, realDate)
            setMessageList([...messageList, {
                sId: id,
                sName: name,
                rId: Number(rId),
                type:1,
                text: image,
                date: realDate,
                time: hour + ":" + minute
            }])
            setImage("")
            setMode(false)
        }else{
            sendMessage(rId, 0, message, allDate, allTime, realDate)
            setMessageList([...messageList, {
                sId: id,
                sName: name,
                rId: Number(rId),
                type:0,
                text: message,
                date: realDate,
                time: hour + ":" + minute
            }])
            setMessage("")
            }
        
    }

    const openImg = (url) => {
        setOpenImage(url)
    }

    return (
        <div>
            {openImage !== "" ?
            <div className="open-img" onClick={()=>{setOpenImage("")}}>
                <div className="container">
                    <img src={openImage} alt="" />
                </div>
            </div>
            :
            null}
            <div className="chatTop">
                <h2><span><i onClick={() => { history.goBack() }} className="fas fa-chevron-left"></i></span><span> </span> {state.rName}</h2>
                <div className="clear"></div>
            </div>
            <div className="talk">
                {messageList.map((data, index) => {
                    if (data.sId === id) {
                        return (
                            <div key={index}>
                                <Talk pos="right" name={data.sName} type={data.type} message={data.text} date={data.date} time={data.time} category={state.category} openImg={openImg}/>
                            </div>
                        )
                    } else {
                        return (
                            <div key={index}>
                                <Talk pos="left" name={data.sName} type={data.type} message={data.text} date={data.date} time={data.time} category={state.category} openImg={openImg}/>
                            </div>
                        )
                    }

                })}
                <br /><br /><br /><br /><br />
                <div ref={messagesEndRef} />
            </div>
            {mode ?
            <div className="chatBottom2" >
                {image === "" ?
                <>
                <label className="input-btn" htmlFor="file">
                    <p>写真を選択</p>
                    <img className="plus-img" src={Image1} alt="" />
                </label>
                <input type="file" id="file" className="file-input" onChange={changeImage} />
                </>
                :
                <>
                <img className="send-img" alt="" src={image}/>
                <br/>
                <button onClick={onClickSend}>送信</button>
                <button onClick={()=>{setImage("")}}>選びなおす</button>
                </>
                }
                <br/>
                <p onClick={()=>{setMode(false)}}><i class="far fa-comment-dots"></i>文章を送る</p>
            </div>
            :
            <div className="chatBottom" >
                <form onSubmit={onClickSend}>
                    <input type="text" placeholder='メッセージを入力' value={message}
                        onChange={(e) => { setMessage(e.target.value) }} required />
                    <button type="submit">送信</button>
                </form>
                <p onClick={()=>{setMode(true)}}><i class="fas fa-images"></i>画像を送る</p>
            </div>
            }
            



        </div>
    );
}

export default Chat