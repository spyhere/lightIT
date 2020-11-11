import React, { useEffect, useState } from 'react'

let starsArr = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border']

export const Vote = ({rate}) => {
    const [stars, setStars] = useState(starsArr)
    
    const updateStars = () => {
        let temp = [...stars]
        for (const n in stars) {
            if (n < rate) temp[n] = 'stars'
        }
        setStars(temp) 
    }



    useEffect(() => {
        updateStars()
    }, [])

    return (
        <div className="vote">
            {stars.map((item, index) => 
                <i className="material-icons" key={index+item}>{item}</i>
                )}
        </div>
        )
}