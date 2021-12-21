import { useEffect, useState, memo } from "react"
import { useHistory } from "react-router-dom"
import Axios from "axios"
import "./Thread.css"
import Image1 from "../images/115946.jpg"
import Image2 from "../images/147190.jpg"

const Thread = memo((props) => {
    const { id, username, userCategory, threId, userId, title, text, date, time } = props
    const [name, setName] = useState("")
    const [area, setArea] = useState("")
    const [category, setCategory] = useState("")
    const [age, setAge] = useState("")
    const [imgList, setImgList] = useState([])
    const [openImg, setOpenImg] = useState(false)
    const [open, setOpen] = useState(true)
    const [cuImg, setCuImg] = useState("")

    const history = useHistory()
    useEffect(() => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/getUserInfo`, {
            userId: userId
        })
            .then((response) => {
                console.log(response.data)
                setName(response.data.name)
                setArea(response.data.area)
                setCategory(response.data.category)
                setAge(response.data.age)
            })
    }, [userId])

    useEffect(() => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/getThreImg`, {
            threId: threId
        })
            .then((response) => {
                setImgList(response.data)
            })
    }, [threId])

    const goChat = async () => {
        const { data } = await Axios.post(`https://dark-tanushimaru-0706.lolipop.io/checkChat/${id}/${userId}`)
        if (data.isCheck) {
            history.push({ pathname: `/chat/${userId}`, state: { rName: name, category: category } })
        } else {
            const today = new Date();
            const year = String(today.getFullYear())
            const month = String(Number(today.getMonth()) + Number(1))
            const date = String(today.getDate())
            const allDate = year + "/" + month + "/" + date;
            const hour = today.getHours()
            const minute = today.getMinutes()
            const allTime = hour + ":" + minute
            Axios.post(`https://dark-tanushimaru-0706.lolipop.io/addChat`, {
                userId: id,
                username: username,
                category: userCategory,
                rId: userId,
                rName: name,
                rCategory: category,
                date: allDate + " " + allTime
            })
                .then((response) => {
                    history.push({ pathname: `/chat/${userId}`, state: { rName: name, category: category } })
                })
        }
    }

    const openImage = (url) => {
        setOpenImg(true)
        setCuImg(url)
    }

    const closeImage = () => {
        setOpenImg(false)
        setCuImg("")
    }

    const deleteThread = () => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/deleteThread/${threId}`)
        setOpen(false)
    }

    return (
        <>
            {open ?
                <>
                    {openImg ?
                        <div className="open-img" onClick={closeImage}>
                            <div className="container">
                                <img src={cuImg} alt="" />
                            </div>
                        </div>
                        : null}
                    <div className="thre-wrapper">
                        <div className="top" onClick={() => { history.push(`/profile/${userId}`) }}>
                            {category === "純男"
                                ?
                                <img src={Image1} alt="" />
                                :
                                <img src={Image2} alt="" />
                            }
                            <h2>{name}</h2>
                        </div>
                        {category === "純男"
                            ?
                            <div className="info man">
                                <label>[住所：{area}]</label>
                                <label>[年齢：{age}歳]</label>
                                <label>[カテゴリ：{category}]</label>
                            </div>
                            :
                            <div className="info woman">
                                <label>[住所：{area}]</label>
                                <label>[年齢：{age}歳]</label>
                                <label>[カテゴリ：{category}]</label>
                            </div>
                        }

                        <div className="main">
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>

                        <div className="imgs">
                            {imgList.map((data, index) => {
                                return (
                                    <img key={index} src={data.url} alt="" onClick={() => openImage(data.url)} />
                                )
                            })}
                            <div className="clear-left"></div>
                        </div>
                        <div className="bottom">
                            <label>
                                <span><i className="far fa-clock"></i> </span>
                                {date} {time}
                            </label>
                        </div>
                        {id === undefined || id === null ?
                            <button onClick={() => { history.push("/login") }}>ログインしてチャットする</button>
                            :
                            <>
                                {userId === id || id === 7 ?
                                    <button onClick={deleteThread}>スレッドを削除</button>
                                    :
                                    <button onClick={goChat}>チャットを送る</button>
                                }
                                <br/>
                                <br/>

                                {id === 7 ?
                                    <button onClick={goChat}>注意メッセージを送る</button>
                                    :null
                                }</>
                        }

                    </div>
                </>
                :
                null}
        </>
    )
})
export default Thread