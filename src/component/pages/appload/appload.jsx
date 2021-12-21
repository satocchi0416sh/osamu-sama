import { useState, useEffect, memo } from "react"
import { useHistory, useParams } from "react-router-dom"
import { storage } from "./firebase"
import Image1 from "../../images/135683.png"
import Axios from "axios"
import "./appload.css"
const Appload = memo((props) => {
    const { id, area, openModal } = props
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [previews, setPreviews] = useState([])
    const [apploaded, setApploaded] = useState(false)
    const history = useHistory()


    /*画像をついか */
    useEffect(() => {
        if (image !== null) {
            let blob = new Blob([image], { type: "image/jpeg" })
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            const N = 16;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
            const uploadRef = storage.ref("images").child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setPreviews([...previews, url])
                    console.log(url)
                }
                )
            })
        }
    }, [image])

    /*イメージを変える */
    const changeImage = (e) => {
        setImage(e.target.files[0])
    }

    /* アップロードする */
    const appload = (e) => {
        e.preventDefault()
        const today = new Date();
        const year = String(today.getFullYear())
        const month = String(Number(today.getMonth()) + Number(1))
        const date = String(today.getDate())
        const allDate = year + "-" + month + "-" + date;
        const hour = today.getHours()
        const minute = today.getMinutes()
        const allTime = hour + ":" + minute + ":00"
        console.log(area)
        let region
        if (area === "北海道") {
            region = "hokkaido"
        } else if (area === "青森県" ||
            area === "岩手県" ||
            area === "宮城県" ||
            area === "秋田県" ||
            area === "山形県" ||
            area === "福島県") {
            region = "tohoku"
        } else if (area === "茨城県" ||
            area === "栃木県" ||
            area === "群馬県" ||
            area === "埼玉県" ||
            area === "千葉県" ||
            area === "東京都" ||
            area === "神奈川県") {
            region = "kanto"
        } else if (area === "新潟県" ||
            area === "山梨県" ||
            area === "長野県") {
            region = "koshinetsu"
        } else if (area === "石川県" ||
            area === "富山県" ||
            area === "福井県") {
            region = "hokuriku"
        } else if (area === "岐阜県" ||
            area === "静岡県" ||
            area === "愛知県" ||
            area === "三重県") {
            region = "tokai"
        } else if (area === "滋賀県" ||
            area === "京都府" ||
            area === "大阪府" ||
            area === "兵庫県" ||
            area === "奈良県" ||
            area === "和歌山県") {
            region = "kinki"
        } else if (area === "鳥取県" ||
            area === "島根県" ||
            area === "岡山県" ||
            area === "広島県" ||
            area === "山口県") {
            region = "tyugoku"
        } else if (area === "徳島県" ||
            area === "香川県" ||
            area === "愛媛県" ||
            area === "広島県" ||
            area === "山口県") {
            region = "shikoku"
        } else if (area === "福岡県" ||
            area === "佐賀県" ||
            area === "長崎県" ||
            area === "熊本県" ||
            area === "大分県" ||
            area === "宮崎県" ||
            area === "鹿児島県" ||
            area === "沖縄県") {
            region = "kyushu"
        }
        console.log(region)
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/addThread", {
            userId: id,
            title: title,
            text: text,
            area: region,
            date: allDate,
            time: allTime
        }).then((response) => {
            console.log(response.data)
            previews.forEach((data) => {
                Axios.post("https://dark-tanushimaru-0706.lolipop.io/addImg", {
                    threId: response.data.threId,
                    url: data
                })
            })
        })
        setApploaded(true)
        openModal();
    }

    return (
        <div className="app-wrapper">
            {apploaded ?
                <div className="container">
                    <div>
                        <h2>アップロードが完了しました</h2>
                        <button className="app-btn" onClick={() => { history.goBack() }}>ホームに戻る</button>
                    </div>
                </div>
                :
                <div className="container">
                    <form onSubmit={appload}>
                        <div className="top">
                            <label>タイトル</label>
                            <br />
                            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                            <br /><br />
                            <label>本文</label>
                            <br />
                            <textarea type="text" value={text} onChange={(e) => { setText(e.target.value) }} required />
                            <br /><br />
                            <label>画像 (4枚まで)</label>
                        </div>

                        <div className="imgs">
                            {previews.length < 4 ?
                                <>
                                    <label className="input-btn" htmlFor="file">
                                        <img className="plus-img" src={Image1} alt="" />
                                        <p>写真を追加</p>
                                    </label>
                                    <input type="file" id="file" className="file-input" onChange={changeImage} />
                                </>
                                :
                                null}

                            {previews.map((data, index) => {
                                return (
                                    <img className="app-img" key={index} src={data} alt="" />
                                )
                            })}
                            <div className="clear-left"></div>



                        </div>
                        <button className="app-btn">投稿</button>
                    </form>
                </div>
            }


        </div>
    )
})
export default Appload