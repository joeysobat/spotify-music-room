import CreateRoomPage from './CreateRoomPage'
import JoinRoomPage from './JoinRoomPage'
import Room from './Room'
import Info from './Info'
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

export default function HomePage(props)
{

    const [roomCode, setRoom] = useState(null)
    const [animate, setAnim] = useState(true)

    var h1s = document.getElementsByTagName("h1");
    for (var i = 0; i < h1s.length; i++) {
        var h1 = h1s[i];
        h1.className = animate ? "fade-in" : ""
    }

    useEffect(() => {
        loadData()
        if(window.sessionStorage.getItem("firstLoadDone") === null)
        {
            setAnim(true)
            window.sessionStorage.setItem("firstLoadDone", 1)
        }
        else
        {
            setAnim(false)
        }
    }, [])

    const loadData = async () => {
        const response = await fetch('/api/user-in-room')
        const data = await response.json()
        setRoom(data.code)
    }

    function clearRoomCode()
    {
        setRoom(null)
    }

    function renderHomePage()
    {
        return(
            <div className="grid-container">
                <div className="grid-item">
                    <a href="/info">
                        <button className="second-button">Info</button>
                    </a>
                </div>
                <div className="flex-container">
                    <div>
                        <a href="/join">
                            <button className="main-button">Join a Room</button>
                        </a>
                    </div>
                    <div>
                        <a href="/create">
                            <button className="main-button">Create a Room</button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <Router>
            <Switch>
                <Route exact path="/" render={() => {
                    return roomCode ? (<Redirect to={`/room/${roomCode}`} />) : (renderHomePage())
                }} />
                <Route path="/join" component={JoinRoomPage} />
                <Route path="/info" component={Info} />
                <Route path="/create" component={CreateRoomPage} />
                <Route path="/room/:roomCode" render={(props) => {
                    return <Room {...props} leaveRoomCallback={clearRoomCode} />
                }
                } />
            </Switch>
        </Router>
    )
}