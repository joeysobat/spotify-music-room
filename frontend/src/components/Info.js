import React, { useState, useEffect } from 'react'


const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create',
    INFO: 'pages.info'
}

export default function Info(props)
{

    const [page, setPage] = useState(pages.INFO)

    function joinInfo()
    {
        return "By joining a room, you can listen to the spotify music of the room's host. Enter the room's code, and you are good to go!"
    }

    function createInfo()
    {
        return (<div><p>When creating a room, you are able to connect your own spotify account and let others listen to your music!</p><br></br><p>You select the number of votes necessary to skip a song, and choose if the guests can play or pause the song. By being the host, you can perform all of this at will.</p></div>)
    }

    function fullInfo()
    {
        return (<div>
            <p>
                Hi! House Party app lets you share a music environment with friends and colleagues.
            </p>
            <p>
                By using spotify, you can listen to other's music, and viceversa. A perfect tool for community focus and study sessions!!
            </p>
        </div>)
    }

    let renderInfo = "";

    if(page === pages.INFO) {
        renderInfo = fullInfo()
    } else if(page === pages.JOIN) {
        renderInfo = joinInfo()
    } else {
        renderInfo = createInfo()
    }

    function renderButtons(page)
    {
        switch(page)
        {
            case pages.INFO:
                return (
                    <div className="grid-item">
                        <button className="second-button" onClick={() => setPage(pages.JOIN)}>Join</button>
                        <button className="second-button" onClick={() => setPage(pages.CREATE)}>Create</button>
                    </div>
                )
                break
            case pages.CREATE:
                return (
                    <div className="grid-item">
                        <button className="second-button" onClick={() => setPage(pages.INFO)}>General info</button>
                        <button className="second-button" onClick={() => setPage(pages.JOIN)}>Join</button>
                    </div>
                    
                )
                break
            case pages.JOIN:
                return (
                    <div className="grid-item">
                        <button className="second-button" onClick={() => setPage(pages.INFO)}>General info</button>
                        <button className="second-button" onClick={() => setPage(pages.CREATE)}>Create</button>
                    </div>
                )
                break
        }
    }

    return(
        <div className="grid-container">
            <div className="grid-item">
                <h2>
                    What is House Party?
                </h2>
            </div>
            <div className="grid-item">
                <h3>
                    {renderInfo}
                </h3>
            </div>
            {renderButtons(page)}
            <div className="grid-item">
                <a href="/">
                    <button className="second-button">Back</button>
                </a>
            </div>
        </div>
    )
}