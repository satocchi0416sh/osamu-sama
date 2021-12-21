import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import "./Profile.css"
import Thread from "../../ui/Thread"
import areaData from "../signup/AreaData"
import { Autocomplete, Avatar, Button, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemText, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { themeOption } from "../../ui/ThemeOptions"
import { Box } from "@mui/system"
import { AccountCircle, Edit } from "@mui/icons-material"

import manImage from "../../images/115946.jpg"

function Profile(props) {
    const { id, name, category } = props
    const [threList, setThreList] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [newArea, setNewArea] = useState("")
    const [newComment, setNewComment] = useState("")
    const { userId } = useParams()

    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getUserThread/${userId}`)
            .then((response) => {
                setThreList(response.data)
            })
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/getUserInfo", {
            userId: userId
        })
            .then((response) => {
                setNewName(response.data.name)
                setNewAge(response.data.age)
                setNewCategory(response.data.category)
                setNewArea(response.data.area)
                if (response.data.comment === null) {
                    setNewComment("")
                } else {
                    setNewComment(response.data.comment)
                }

            })

    }, [userId])

    const editInfo = () => {
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/editUserInfo", {
            userId: id,
            name: newName,
            age: newAge,
            category: newCategory,
            area: newArea,
            comment: newComment
        })
        setEditMode(false)
    }

    const theme = themeOption;
    return (
        <div className="profile-page">
            {editMode ?
                <ThemeProvider theme={theme}>
                    < Container elevation={8} component="main" maxWidth="xs" >
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
                                <Edit />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                編集
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
                                            value={newName}
                                            onChange={(e) => { setNewName(e.target.value) }}
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
                                            value={newAge}
                                            onChange={(e) => { setNewAge(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            disablePortal
                                            fullWidth
                                            id="category"
                                            options={["純男", "純女", "ニューハーフ", "女装", "首下女装"]}
                                            value={newCategory}
                                            renderInput={(params) => <TextField {...params} label="カテゴリ" />}
                                            onChange={(event, value) => setNewCategory(value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            disablePortal
                                            fullWidth
                                            id="area"
                                            options={areaData}
                                            value={newArea}
                                            renderInput={(params) => <TextField {...params} label="都道府県" />}
                                            onChange={(event, value) => setNewArea(value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            fullWidth
                                            label="ひとこと"
                                            multiline
                                            rows={4}
                                            value={newComment}
                                            onChange={(e) => { setNewComment(e.target.value) }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    onClick={editInfo}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    決定
                                </Button>
                            </Box>
                        </Box>
                    </Container >
                </ThemeProvider >

                :
                <ThemeProvider theme={theme}>
                    < Container elevation={8} component="main" maxWidth="sm" >
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
                                <AccountCircle />
                            </Avatar>
                            <Typography variant="h5" component="h1">
                                {newName}
                            </Typography>
                            <Box container sx={{ boxShadow: 3, width: "100%", p: 4, my: 4 }}>
                                <List>
                                    <ListItem disablePadding sx={{ py: 3 }}>
                                        <ListItemText primary="年齢" />
                                        <ListItemText primary={newAge} sx={{ maxWidth: 300, textAlign: "right" }} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem disablePadding sx={{ py: 3 }}>
                                        <ListItemText primary="カテゴリ" />
                                        <ListItemText primary={newCategory} sx={{ maxWidth: 300, textAlign: "right" }} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem disablePadding sx={{ py: 3 }}>
                                        <ListItemText primary="地域" />
                                        <ListItemText primary={newArea} sx={{ maxWidth: 300, textAlign: "right" }} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem disablePadding sx={{ py: 3 }}>
                                        <ListItemText primary="ひとこと" />
                                        <ListItemText primary={newComment} sx={{ maxWidth: 300, textAlign: "right" }} />
                                    </ListItem>
                                    {Number(userId) === id ?
                                        <>
                                            <Divider />
                                            <Button
                                                onClick={() => { setEditMode(true) }}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                プロフィールを編集する
                                            </Button>
                                        </>
                                        : null
                                    }
                                </List>
                            </Box>

                        </Box>
                    </Container>
                </ThemeProvider>

            }
            <ThemeProvider theme={theme}>
                < Container elevation={8} component="main" maxWidth="sm" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5" component="h1">
                            {newName}の投稿
                        </Typography>
                        {threList.map((data, index) => {
                            return (
                                <Thread key={index} threId={data.threId} userId={data.userId}
                                    title={data.title} text={data.text} date={data.date}
                                    time={data.time} id={id} username={name} userCategory={category} />
                            )
                        })}
                    </Box>
                </Container>
            </ThemeProvider>
        </div>

    )
}
export default Profile