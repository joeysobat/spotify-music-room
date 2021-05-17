import React, { useState, useEffect } from 'react'

export default function MusicPlayer(props)
{

    function pauseSong()
    {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/spotify/pause', requestOptions)
    }

    function playSong()
    {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/spotify/play', requestOptions)
    }

    function skipSong()
    {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/spotify/skip', requestOptions)
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const progress = (props.time / props.duration) * 100
    const spanStyle = {
        width: progress.toString() + "%",
    }

    return(
        <div className="music-container">
            <img className="item1" src={props.image_url}></img>
            <p className="item2">{props.title}</p>
            <span className="item3">{props.artist}</span>
            <button className="play item4" onClick={() => {
                        props.is_playing ? pauseSong() : playSong()
                    }}>{props.is_playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>
            <button className="skip item4" onClick={() => skipSong()}>{props.votes} / {props.votes_required} <i className="fa fa-step-forward"></i></button>
            <div className="item6">
                {millisToMinutesAndSeconds(props.time)}
                <div className="progress">
                    <span style={spanStyle}></span>
                </div>
                {millisToMinutesAndSeconds(props.duration)}
            </div>
        </div>
    )
}