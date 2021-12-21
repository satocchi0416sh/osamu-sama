import { useState, useEffect, memo } from "react"

const Display = memo((props) => {
    const { inquiryId, name, email, text, time, isCheck } = props
    const [ check, setCheck ] = useState(isCheck)

    const clickCheck = (num) => {
        setCheck(num)
    }

    return(
        <div className="inquiry">
            <h3>お名前：{name}</h3>
            <label>メール：{email}</label>
            <h5>{time}</h5>
            <h4>{text}</h4>
            
            {check === 0 ?
            <button onClick={()=>{clickCheck(1)}} className="nozumi">未返信</button>
            :
            <button onClick={()=>{clickCheck(0)}} className="zumi">返信済み</button>
            }
        </div>
    )
})
export default Display