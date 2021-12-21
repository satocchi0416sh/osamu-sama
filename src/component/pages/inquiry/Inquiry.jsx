import { useEffect, useState } from "react"
import Axios from "axios"
import Display from "./Display"
import "./Inquiry.css"

function Inquiry(props) {
    const { id } = props
    const [ isSend, setIsSend ] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ text, setText ] = useState("")
    const [ list, setList ] = useState([])
    
    useEffect(() => {
        if(id === 7){
            Axios.get("https://dark-tanushimaru-0706.lolipop.io/getInquiry")
            .then((response) => {
                setList(response.data)
                console.log(response.data)
            })
        }
    },[id])

    const submit = (e) => {
        e.preventDefault()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/sendInquiry",{
            name:name,
            email:email,
            text:text,
            time:year + "-" + month + "-" + day + " " + hour + ":" + minute,
        })
        setIsSend(true)
    }

    return(
        <div className="app-wrapper">
            {id === 7 ?
            <>
            {list.map((data, index) => {
                return(
                    <Display  key={index} inquiryId={data.id} name={data.name} 
                    email={data.email} text={data.text}
                    time={data.newTime} isCheck={data.isCheck}/>
                )
            })}
            </>
            :
            <>
            {isSend ?
            <>
            <h3>お問い合わせありがとうございます。
                <br/>内容を確認次第、ご入力頂いたメールアドレス宛にメールを送信いたします。
            </h3>
            </>
            :
            <>
            <h1>お問い合わせ</h1>
            <div className="container">
            <form onSubmit={submit}>
                <div className="top">   
                <label>お名前</label>
                <br/>
                <input value={name} onChange={(e) => {setName(e.target.value)}} required/>
                <br/>
                <label>メールアドレス</label>
                <br/>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <br/>
                <label>お問い合わせ内容</label>
                <br/>
                <textarea value={text} onChange={(e) => {setText(e.target.value)}} required/>
                <br/>
                <button type="submit" className="app-btn" >送信</button>
                </div>
            </form>
            </div>
            </>
            }
            
            </>
            }
            
        </div>
    )
}
export default Inquiry