import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, Collapse, IconButton, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./Top.css"
import Axios from "axios"

function Top(props) {
    const { id } = props
    const history = useHistory()

    const [isRead, setIsRead ] = useState(false)

    const data = [
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
    const goArea = (area) => {
        history.push(`/area/${area}`)
    }

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getNotRead/${id}`)
        .then((response) => {
            console.log(response.data)
            setIsRead(response.data.result)
        })
    },[id])

    const [open, setOpen] = useState(true);
    return (
        <div className="top-page">
            {isRead ?
            <div onClick={()=>{history.push(`/selectChat/${id}`)}}>
            <p className="mAlert"><i className="fas fa-envelope-open-text"></i> 新着メッセージがあります</p>
            <br/><br/>
            </div>
            :
            null
            }

            <Collapse in={open}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 5, maxWidth: "sm", mx: "auto" }}
                >
                    <AlertTitle>注意</AlertTitle>
                    ここに注意事項が入ります。 — <strong>強調することもできます。</strong>
                    <br/>１．〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                    <br/>２．〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                    <br/>３．〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                    <br/>４．〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                </Alert>
            </Collapse>
            <div className="container">
                <h1>地域別</h1>
                {data.map((data, index) => {
                    return (
                        <button key={index} onClick={() => { goArea(data.link) }}>{data.title}</button>
                    )
                })}
                <div className="clear-left"></div>
                <iframe src="https://www.mmaaxx.com/table/dx/9103042/index.html?affid=222309" maxWidth="600" frameborder="no" scrolling="no" title="DXLiveオンラインバナー"></iframe>

            </div>
        </div >
    )
}
export default Top