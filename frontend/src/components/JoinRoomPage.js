import React, { useState, useEffect } from 'react'

export default function JoinRoomPage(props)
{
    const [roomCode, setCode] = useState("")
    const [error, setError] = useState("")

    function _handleTextFieldChange(e)
    {
        setCode(e.target.value)
    }

    function _roomButtonPressed()
    {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode
            })
        }
        fetch('/api/join-room', requestOptions)
        .then(response => {
            if(response.ok)
            {
                props.history.push(`/room/${roomCode}`)
            }
            else
            {
                setError("Room not found.")
            }
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="grid-container">
            <div className="grid-item">
                <h2>
                    Join A Room
                </h2>
            </div>
            <div className="grid-item">
                <div className="checkboxgroup">
                    <label for="code">Code</label>
                    <input type="text" id="code" value={roomCode} placeholder="Enter a Room Code" onChange={_handleTextFieldChange}></input>
                </div>
            </div>
            <div className="grid-item">
                <button className="main-button" onClick={_roomButtonPressed}>Enter Room</button>
            </div>
            <div className="grid-item">
                <a href="/">
                    <button className="second-button">Back</button>
                </a>
            </div>
        </div>
    )
}