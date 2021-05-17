import React, { useState, useEffect } from 'react'


export default function CreateRoomPage(props)
{

    const [guestCanPause, setGuest] = useState(props.guestCanPause)
    const [votesToSkip, setVotes] = useState(props.votesToSkip)
    const [update, setUpdate] = useState(props.update)
    const [roomCode, setCode] = useState(props.roomCode)

    useEffect(() => {
        const elemVt = document.getElementById('votes')
        elemVt.defaultValue = votesToSkip
    }, [])

    function handleVotesChange(e)
    {
        setVotes(e.target.value)
    }

    function handleGuestCanPauseChange(e)
    {
        e.target.value === 'true' ? setGuest(true) : setGuest(false)
    }

    function handleRoomButtonPressed()
    {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            })
        }
        fetch('/api/create-room', requestOptions)
        .then(response => response.json())
        .then(data => {
            props.history.push('/room/' + data.code)
        })
    }

    function handleUpdateButtonPressed()
    {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: roomCode
            })
        }
        fetch('/api/update-room', requestOptions)
        .then(response => {
            if(response.ok)
            {
                alert("Room updated successfully!")
            }
            else
            {
                alert("Error updating room...")
            }
            props.updateCallback()
        })
    }

    function renderCreateButtons()
    {
        return(
            <div id="grid-container">
                <div className="grid-item">
                    <button className="main-button" onClick={handleRoomButtonPressed}>Create A Room</button>
                </div>
                <div className="grid-item">
                    <a href="/">
                        <button className="second-button">Back</button>
                    </a>
                </div>
            </div>
        )
    }

    function renderUpdateButtons()
    {
        return(
            <div className="grid-item">
                <button className="main-button" onClick={handleUpdateButtonPressed}>Update Room</button>
            </div>
        )
    }

    const title = update ? "Update Room" : "Create a Room"

    return(
        <div className="grid-container">
            <div className="grid-item">
                <h2>
                    {title}
                </h2>
            </div>
            <div className="grid-item">
                <form>
                    <label>Guest Control of Playback State</label><br/>
                    <div className="checkboxgroup">
                        <input type="radio" name="play" id="playpause" value="true" onChange={handleGuestCanPauseChange} checked={guestCanPause ? 'checked' : ''}></input>
                        <label htmlFor="playpause">Play/Pause</label>
                        <input type="radio" name="play" id="nocontrol" value="false" onChange={handleGuestCanPauseChange} checked={guestCanPause ? '' : 'checked'}></input>
                        <label htmlFor="nocontrol">No Control</label>
                    </div>
                </form>
            </div>
            <div className="grid-item">
                <form>
                    <div className="textgroup">
                        <input type="number" id="votes" min="1" onChange={handleVotesChange} required></input>
                        <label htmlFor="votes" style={{paddingTop: '15px'}}>Votes required to skip a song</label>
                    </div>
                </form>
            </div>
            {update ? renderUpdateButtons() : renderCreateButtons()}
        </div>
    )
}

CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true
}