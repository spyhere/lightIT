import React, { useCallback, useEffect, useState } from 'react'

// Initial array of 'empty' stars
let starsArr = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border']

export const Vote = (props) => {
    const { rate, mark, setMark } = props
    const [stars, setStars] = useState(starsArr)

    const starClickHandler = event => {
        let value = event.target.getAttribute('value')
        setMark(Number(value))
        updateStars(value)
    }

    // Updating the stars on input to the function or input to the component (rate)
    const updateStars = useCallback((input) => {
        if (isNaN(input)) input = rate
        let temp = [...starsArr]
        for (const n in starsArr) {
            if (n < input) temp[n] = 'star'
        }
        setStars(temp) 
    }, [rate])


    useEffect(() => {
        updateStars()
    }, [updateStars])

    return (
        <div className="vote">
            {stars.map((item, index) => 
                <i onClick={starClickHandler} value={index+1} className="material-icons" key={index+item}>{item}</i>
            )}
            <br />

            {/* SHOW THIS BUTTON IF WE HAVE NO 'RATE' INPUT TO THE COMPONENT */}
            {isNaN(rate) &&
                <i disabled={!mark} className="btn-small waves-effect" value="0" onClick={starClickHandler}>No Stars!</i>    
            }
        </div>
        )
}
