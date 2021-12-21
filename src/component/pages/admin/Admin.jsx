import { useEffect, useState } from "react"
import Axios from "axios"
import { storage } from "../appload/firebase"
import "./Admin.css"

function Admin() {
    const [ text, setText ] = useState("")
    const [ adlist, setAdlist] = useState([])
    const [ preview, setPreView ] = useState("")
    const [ url, setUrl ] = useState("")

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getAlert`)
        .then((response) => {
            console.log(response.data)
            setText(response.data.text)
        })
    },[])

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getAds`)
        .then((response) => {
            console.log(response.data)
            setAdlist(response.data)
        })
    },[])

    const sendAlert = () => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/sendAlert`,{
            text:text
        })
        .then((response) => {
            alert("注意書きの更新が完了しました")
        })
    }

    const sendAds = () => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/sendAds`,{
            img:preview,
            url:url
        })
        .then((response) => {
            Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getAds`)
            .then((response) => {
                setAdlist(response.data)
                setPreView("")
                setUrl("")
                alert("広告の追加が完了しました")
            })
        })
    }
    const deleteAd = (id) => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/deleteAds`,{
            id:id
        })
        .then((response) => {
            Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getAds`)
            .then((response) => {
                setAdlist(response.data)
                alert("広告の削除が完了しました")
            })
        })
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
                    setPreView(url)
                    console.log(url)
                }
                )
            })
        }
    }

    return(
        <div className="admin-page">
        <h1>管理者ページ</h1>
        <h2>～注意書き設定～</h2>
        <textarea value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <br/>
        <button onClick={sendAlert}>決定</button>
        <br/><br/><br/><br/>
        <h2>～広告設定～</h2>
        <h3>現在の広告</h3>
        {adlist.length > 0 ?
        <>
            {adlist.map((data, index) => {
                return(
                    <div key={index} className="ad">
                        <a href={data.url}><img className="admin-img" src={data.img} alt="" /></a>
                        <br/>
                        <button onClick={()=>{deleteAd(data.id)}}>削除</button>
                    </div>
                )
            })}
        </>
        :
        <p>まだ設定された広告はありません</p>
        }
        <br/>
        <h3>広告の追加</h3>
        {preview !== "" ?
        <img className="preview" alt="" src={preview}/>
        :
        null
        }
        <input type="file" onChange={changeImage}/>
        <br/>
        <label>URL：</label>
        <input type="text" onChange={(e)=>{setUrl(e.target.value)}}/>
        <button onClick={sendAds}>決定</button>
        </div>
    )
}

export default Admin