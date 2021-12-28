import { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom';
import Axios from "axios"
import "./signup.css"
import areaData from "./AreaData"
import { Autocomplete, Avatar, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { themeOption } from "../../ui/ThemeOptions";
import { Box } from "@mui/system";
import { Check, LockOutlined } from "@mui/icons-material";
function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passCheck, setPassCheck] = useState("")
    const [age, setAge] = useState("")
    const [area, setArea] = useState("")
    const [category, setCategory] = useState("")
    const [passErr, setPassErr] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const history = useHistory();

    useEffect(() => {
        console.log(area)
    }, [area]);

    useEffect(() => {
        console.log(category)
    }, [category])


    /*登録ボタンが押されたとき */
    const register = (e) => {
        e.preventDefault()
        if(name === "" || email === "" || password === "" || passCheck === "" || area === "" || category === ""){
            alert("入力に不備があります。")
        }else{
            setPassErr(false)
            if (password === passCheck) {
                Axios.post("https://dark-tanushimaru-0706.lolipop.io/signup", {
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    area: area,
                    category: category
                }).then((response) => {
                    console.log(response.data)
                    if(response.data.result){
                        setIsRegistered(true)
                    }else{
                        alert("このメールアドレスは既に登録されています")
                    }
                })
            } else {
                setPassErr(true)
            }
        }
        
        
        

    }


    /*ログインページに行く */
    const goLogin = () => {
        history.push("/login")
    }
    const backpage = () => {
        history.goBack()
    }

    const theme = themeOption

    return (
        <>
            {
                !isRegistered ?
                    <ThemeProvider theme={theme}>
                        < Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlined />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="Name"
                                                label="ユーザーネーム"
                                                autoFocus
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="メールアドレス"
                                                name="email"
                                                autoComplete="email"
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="age"
                                                label="年齢"
                                                name="age"
                                                type="number"
                                                autoComplete="age"
                                                onChange={(e) => { setAge(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                disablePortal
                                                fullWidth
                                                id="category"
                                                options={["純男", "純女", "ニューハーフ", "女装", "首下女装"]}
                                                renderInput={(params) => <TextField {...params} label="カテゴリ" />}
                                                onChange={(event, value) => setCategory(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                fullWidth
                                                id="area"
                                                options={areaData}
                                                renderInput={(params) => <TextField {...params} label="都道府県" />}
                                                onChange={(event, value) => setArea(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="パスワード"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassword(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                error={passErr}
                                                helperText={passErr ? "パスワードが一致しません" : null}
                                                name="password"
                                                label="パスワード(確認)"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassCheck(e.target.value) }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        onClick={register}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        新規登録
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link onClick={backpage} variant="body2">
                                                戻る
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                アカウント既に持っている場合はログイン
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container >
                    </ThemeProvider >
                    :
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <Check />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録が完了しました。
                                </Typography>
                                <Typography component="h1" variant="body1" sx={{ mt: 2 }}>
                                    ログインしてサービスをお楽しみください。
                                </Typography>
                                <Button
                                    onClick={goLogin}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ログインする
                                </Button>
                            </Box>
                        </Container>
                    </ThemeProvider>
            }
        </>
        /*
        <>
            {isRegistered ?
            <div className="form">
                <div className="container">   
                    <p>新規登録が完了しました
                    <br/>ログインしてサービスをお楽しみください</p>
                    <button onClick={goLogin}>ログインする</button>
                </div>
            </div>          
            :
            <div className="form">
                <div className="container">
                    <form onSubmit = {register}>
                        <label>ユーザー名</label>
                        <br/>
                        <input type="text" placeholder="username" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <br/>
                        <label>メールアドレス</label>
                        <br/>
                        <input type="text" placeholder="e-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <br/>
                        <label>年齢(歳)</label>
                        <br/>
                        <input type="text" placeholder="age" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                        <br/>
                        <label>カテゴリ</label>
                        <br/>
                        <select className="cp_sl06" required onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="" hidden disabled selected></option>
                            <option value="純男">純男</option>
                            <option value="純女">純女</option>
                            <option value="ニューハーフ">ニューハーフ</option>
                            <option value="女装">女装</option>
                            <option value="首下女装">首下女装</option>
                        </select>
                        <br/>
                        <label>都道府県</label>
                        <br/>
                        <select className="cp_sl06" required onChange={(e) => { setArea(e.target.value) }}>
                            <option value="" hidden disabled selected></option>
                            {areaData.map((data,index) => {
                                return(
                                    <option key={index} value={data}>{data}</option>
                                )
                            })}
                        </select>
                        <br/>
                        <label>パスワード</label>
                        <br/>
                        <input type="text" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <br/>
                        <label>パスワード（確認）</label>
                        {passErr
                        ?
                        <p>パスワードが一致しません</p>
                        :null}
                        <br/>
                        <input type="text" placeholder="password(確認)" value={passCheck} onChange={(e)=>{setPassCheck(e.target.value)}}/>
                        <br/>
                        <button type="submit">登録する</button>
                    </form>
                    <br/>
                    <br/>
                    <button onClick={backpage}>戻る</button>
                    <br/>
                    <Link to="/login">すでにアカウントをお持ちの方はこちら</Link>
                </div>        
            </div>
            }
        </>*/
    )
}
export default SignUp