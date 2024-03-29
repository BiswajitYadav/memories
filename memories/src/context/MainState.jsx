import React from 'react'
import MainContext from './MainContext'
import { useState } from 'react'
import { SERVER_URL } from '../services/helper'

const MainState = (props) => {

    const authToken = localStorage.getItem("auth-token")

    const [post, setPost] = useState([]);

    const handleStaticPostRemove = (id) => {
        const updatedItems = post.filter((item) => item._id !== id);
        setPost(updatedItems);
    }

    const [notification, setNotification] = useState({})

    const [temporaryAuthToken, setTemporaryAuthToken] = useState("")

    const generateOTP = async () => {
        const response = await fetch(`${SERVER_URL}otp/create`, {
            method: 'POST',
            headers: {
                'auth-token': temporaryAuthToken,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setNotification({ status: "true", message: "OTP Sent", type: "success" })
        }

    }

    const [userProfileData, setUserProfileData] = useState({})

    const fetchSessionUserProfile = async () => {
        const response = await fetch(`${SERVER_URL}user/get-user-profile`, {
            method: 'POST',
            headers: {
                "auth-token": authToken,
                "Content-Type": "application/json"
            }
        })

        const json = await response.json().then(data => setUserProfileData(data))

    }

    const [fetchedPost, setFetchedPost] = useState([])

    const fetchAllPostHomePage = async () => {

        const response = await fetch(`${SERVER_URL}post/fetch-all-post-user`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()
        if (json) {
            setFetchedPost(json)
        }

    }

    const [otherUserProfile, setOtherUserProfile] = useState({})

    const fetchAnotherUserProfile = async (userID) => {

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setOtherUserProfile(json.userProfile)
        } else {
            setNotification({ status: "true", message: "OTP Sent", type: "success" })
        }

    }


    const [myPost, setMyPost] = useState([])

    const fetchMyAllPost = async () => {
        const response = await fetch(`${SERVER_URL}post/fetch-my-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const json = await response.json()

        if (json) {
            setMyPost(json)
        }

    }


    // Comment Api

    // 

    const [commentingStatus, setCommentingStatus] = useState(Boolean)

    const createNewComment = async (postID, comment) => {

        setCommentingStatus(true)

        const response = await fetch(`${SERVER_URL}comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "commentText": comment, "postID": postID })
        })



    }

    return (
        <MainContext.Provider value={{ temporaryAuthToken, setTemporaryAuthToken, notification, setNotification, generateOTP, userProfileData, fetchSessionUserProfile, fetchedPost, fetchAllPostHomePage, otherUserProfile, fetchAnotherUserProfile, myPost, fetchMyAllPost, post, setPost, handleStaticPostRemove }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState