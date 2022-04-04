import React,{ useState,useEffect,useContext } from 'react';
import Navbar from "./Navbar";

import {auth} from "../FireBase";
import { useHistory } from "react-router-dom"
import { ChatEngine } from "react-chat-engine";
import { AuthContext} from "../context/AuthContextProvider";

import styles from "./Chats.module.css"
import axios from "axios";

const Chats = () => {

    const [loading ,setLoading] = useState(true)
    const user = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler= async()=>{
        await auth.signOut()
        history.push("/")
    }

    useEffect(()=>{
        if (!user){
            history.push("/")
            return
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers:{
                "project-id":"6b758459-b7f9-40f4-9df0-f1a81d236e40",
                "user-name":user.email,
                "user-secret":user.uid
            }
        })
            .then(()=>{
                setLoading(false)
            })
            .catch(()=>{
                let formData = new FormData()
                formData.append("email",user.email);
                formData.append("username",user.email);
                formData.append("secret",user.uid);
                getFile(user.photoURL)
                    .then(avatar=>{
                        formData.append("avatar",avatar,avatar.name)
                        axios.post("https://api.chatengine.io/users/",formData,{
                            headers:{
                                "private-key":"0101fb56-ccd5-4f1d-a848-bbd6f3d479a6"
                            }
                        })
                            .then(()=>setLoading(false))
                            .catch((error)=>console.log(error))
                    })
            })
    },[user,history])

    const getFile = async (url)=>{
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
    }

    if (!user || loading) return "loading..."

    return (
        <div className={styles.container}>
            <Navbar logout={logoutHandler}/>
            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="6b758459-b7f9-40f4-9df0-f1a81d236e40"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;