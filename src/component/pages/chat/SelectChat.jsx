import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Axios from "axios"
import Image1 from "../../images/115946.jpg"
import Image2 from "../../images/147190.jpg"
import "./SelectChat.css"

function SelectChat(props) {
    const { id, newMessage, openModal } = props
    const [chatList, setChatList] = useState([])
    const [today, setToday] = useState('')
    const history = useHistory()

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getChats/${id}`)
            .then((response) => {
                setChatList(response.data)
                console.log(response.data)
            })
        const today = new Date();
        const month = String(Number(today.getMonth()) + Number(1))
        const date = String(today.getDate())
        const allDate = month + "/" + date;
        setToday(allDate)
    }, [id, newMessage])

    const goChat = (id, name, category) => {
        history.push({ pathname: `/chat/${id}`, state: { rName: name, category: category } })
        openModal()
    }

    return (
        <div className="selectChat-page">
            <div className="container">
                {chatList.map((data, index) => {
                    let newTime;
                    if (data.time.charAt(0) === "0") {
                        newTime = data.time.charAt(1) + ":" + data.time.charAt(3) + data.time.charAt(4)
                    } else {
                        newTime = data.time
                    }
                    if (data.isRead === 1) {
                        return (
                            <div key={index} className="selecter notRead"
                                onClick={() => { goChat(data.rId, data.rName, data.category) }}>
                                {data.category === "純男" ?
                                    <img src={Image1} alt="" />
                                    :
                                    <img src={Image2} alt="" />
                                }
                                <div className="chat-info">
                                    <h2>{data.rName}</h2>
                                    {today === data.newDate ?
                                        <h4>{newTime}</h4>
                                        :
                                        <h4>{data.newDate} {newTime}</h4>
                                    }
                                    <div className="clear-left"></div>
                                    <div className="clear-right"></div>
                                    <h5>{data.text}</h5>
                                    <h6 className="midoku">未読</h6>
                                    

                                </div>
                                <div className="clear-left"></div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={index} className="selecter"
                                onClick={() => { goChat(data.rId, data.rName, data.category) }}>
                                {data.category === "純男" ?
                                    <img src={Image1} alt="" />
                                    :
                                    <img src={Image2} alt="" />
                                }
                                <div className="chat-info">
                                    <h2>{data.rName}</h2>
                                    {today === data.newDate ?
                                        <h4>{newTime}</h4>
                                        :
                                        <h4>{data.newDate} {newTime}</h4>
                                    }
                                    <div className="clear-left"></div>
                                    <div className="clear-right"></div>
                                    <h5>{data.text}</h5>
                                    <h6 className="kidoku">既読</h6>

                                </div>
                                <div className="clear-left"></div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}
export default SelectChat