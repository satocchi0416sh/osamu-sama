import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Axios from "axios"
import Thread from "../../ui/Thread"
import { Pagination } from "@mui/material"
import { Box } from "@mui/system"
import { Rect, LeaderBoard } from "../../../ads/Ads"

function Area(props) {
    const { id, username, category, openModal } = props
    const [threList, setThreList] = useState([])
    const { area } = useParams()
    const history = useHistory()

    const [isRead, setIsRead ] = useState(false)

    const ITEMS_IN_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [itemCount, setItemCount] = useState(1);

    const [pagettl, setPagettl] = useState("");

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getNotRead/${id}`)
        .then((response) => {
            console.log(response.data)
            setIsRead(response.data.result)
        })
    },[id])


    useEffect(() => {
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/getThreads", {
            area: area
        })
            .then((response) => {
                setThreList(response.data)
                setItemCount((response.data).length)
                setMaxPage(Math.floor((response.data).length / ITEMS_IN_PAGE) + 1)
            })

        for (let i = 0; i < arealist.length; i++) {
            if (arealist[i].link === area)
                setPagettl(arealist[i].title);
        }
    }, [])

    useEffect(() => {
        console.log(itemCount);
        console.log(maxPage)
        console.log(currentPage)
    }, [itemCount, maxPage, currentPage])

    const pageDidUpdate = () => {
        window.scroll({ top: 0 });
    }

    const arealist = [
        { title: "北海道掲示板", link: "hokkaido" },
        { title: "東北掲示板", link: "tohoku" },
        { title: "関東掲示板", link: "kanto" },
        { title: "甲信越掲示板", link: "koshinetsu" },
        { title: "北陸掲示板", link: "hokuriku" },
        { title: "東海掲示板", link: "tokai" },
        { title: "近畿掲示板", link: "kinki" },
        { title: "中国掲示板", link: "tyugoku" },
        { title: "四国掲示板", link: "shikoku" },
        { title: "九州沖縄掲示板", link: "kyushu" }
    ]

    return (
        <div className="top-page top-container" id={"scroll-area"}>

            
            <main className="main">
            {isRead ?
            <div onClick={()=>{history.push(`/selectChat/${id}`)}}>
            <p className="mAlert"><i className="fas fa-envelope-open-text"></i> 新着メッセージがあります</p>
            <br/><br/>
            </div>
            :
            null
            }
                <h1 style={{ textAlign: "center", width: "100%", marginBottom: "30px" }}>{pagettl}</h1>
                {/* 広告を挿入 */}
                {(() => {

                    const i = getRandomInt(LeaderBoard.length)
                    return (
                        <a href={LeaderBoard[i].url} target="_blank"><img className="img" style={{ width: "500px" }} src={LeaderBoard[i].img} alt="ad" /></a>
                    )
                })()}

                {threList.map((data, index) => {
                    if (index >= (currentPage - 1) * ITEMS_IN_PAGE
                        && index < currentPage * ITEMS_IN_PAGE)
                        return (
                            <>
                                <Thread key={index} threId={data.threId} userId={data.userId}
                                    title={data.title} text={data.text} date={data.date}
                                    time={data.time} id={id} username={username} userCategory={category} />
                                {(index + 1) % 5 === 0
                                    ?
                                    <>

                                        {/* 広告を挿入 */}
                                        {(() => {

                                            const i = getRandomInt(Rect.length)
                                            return (
                                                <a href={Rect[i].url}><img className="img" style={{ width: "500px" }} src={Rect[i].img} alt="ad" /></a>
                                            )
                                        })()}

                                    </>
                                    :
                                    null
                                }
                            </>
                        )
                    return null
                })}

                {id === undefined || id === null ?
                    <button className="app-btn" onClick={() => { history.push("/login") }}>ログインして投稿する</button>
                    :
                    <button className="app-btn" onClick={() => { history.push(`/appload/${id}`) }}>投稿する</button>
                }

                <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 20 }}>
                    <Pagination count={maxPage} size="large" onChange={(e, value) => { setCurrentPage(value); pageDidUpdate(); openModal(); }} />
                </Box>
                {/* 広告を挿入 */}
                {(() => {

                    const i = getRandomInt(LeaderBoard.length)
                    return (
                        <a href={LeaderBoard[i].url} target="_blank"><img className="img fade" style={{ width: "90%", maxWidth: "500px", position: "fixed", bottom: 0, left: "50%", transform: "translate(-50%)" }} src={LeaderBoard[i].img} alt="ad" /></a>
                    )
                })()}
            </main>
            <div class="sidebar">
                <div class="sidebar__item sidebar__item--fixed">
                    {/* 広告を挿入 */}
                    {(() => {

                        const i = getRandomInt(Rect.length)
                        return (
                            <a href={Rect[i].url} target="_blank"><img className="img" src={Rect[i].img} alt="ad" /></a>
                        )
                    })()}
                </div>
            </div>
        </div>
    )
}
export default Area