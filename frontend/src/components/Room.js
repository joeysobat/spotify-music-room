import React, { useState, useEffect } from 'react'
import CreateRoomPage from './CreateRoomPage'
import MusicPlayer from './MusicPlayer'

export default function Room(props)
{
    const [votesToSkip, setVotes] = useState(2)
    const [guestCanPause, setGuest] = useState(false)
    const [isHost, setHost] = useState(false)
    const [showSettings, setSetting] = useState(false)
    const [spotifyAuthenticated, setSpotify] = useState(false)
    const [song, setSong] = useState({})

    const roomCode = props.match.params.roomCode
    getRoomDetails()

    useEffect(() => {
        const interval = setInterval(getCurrentSong, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    function getRoomDetails()
    {
        return fetch('/api/get-room?code=' + roomCode)
        .then(response => {
            if(!response.ok)
            {
                props.leaveRoomCallback()
                props.history.push('/')
            }
            return response.json()
        })
        .then(data => {
            setVotes(data.votes_to_skip)
            setGuest(data.guest_can_pause)
            setHost(data.is_host)
            if(isHost)
            {
                authenticateSpotify()
            }
        })
    }

    function authenticateSpotify()
    {
        fetch('/spotify/is-authenticated')
        .then(response => response.json())
        .then(data => {
            setSpotify(data.status)
            if(!data.status)
            {
                fetch('/spotify/get-auth-url')
                .then(response => response.json())
                .then(data => {
                    window.location.replace(data.url)
                })
            }
        })
    }

    function getCurrentSong()
    {
        fetch('/spotify/current-song')
        .then(response => {
            if(!response.ok)
            {
                return {}
            }
            else
            {
                return response.json()
            }
        })
        .then(data => {
            setSong(data)
        })
    }

    function leaveButtonPressed()
    {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/api/leave-room', requestOptions)
        .then(response => {
            props.leaveRoomCallback()
            props.history.push('/')
        })
    }

    function updateShowSettings(value)
    {
        setSetting(value)
    }

    function renderSettings()
    {
        return(
            <div className="grid-container">
                <div className="grid-item">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}
                    />
                </div>
                <div className="grid-item">
                    <button className="second-button" onClick={() => updateShowSettings(false)}>
                        Close
                    </button>
                </div>
            </div>
        )
    }

    function renderSettingsButton()
    {
        return(
            <div className="grid-container">
                <button className="second-button" onClick={() => updateShowSettings(true)}>
                    Settings
                </button>
            </div>
        )
    }

    if(showSettings)
    {
        return renderSettings()
    }
    return(
        <div className="grid-container">
            <div className="grid-item">
                <h2>
                    Code: {roomCode}
                </h2>
            </div>
            {<MusicPlayer {...song} />}
            {isHost ? renderSettingsButton() : null}
            <div className="grid-item">
                <button className="delete-button" onClick={leaveButtonPressed}>Leave Room</button>
            </div>
        </div>
    )

}