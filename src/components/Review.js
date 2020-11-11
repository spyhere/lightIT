import React from 'react'
import { Vote } from './Vote'

export const Review = ({reviews}) => {
        return (
            <>
            {reviews.map(item =>{ 
                let time = item['created_at'].split("T")
                time[1] = time[1].slice(0, 8)

                return (
                <li className="collection-item review-info" key={item.id}>
                        <h6><strong>{item['created_by'].username}</strong></h6>
                        <div className="right-align">
                            <p>{time[0]}<br />
                            {time[1]}
                            </p>
                        </div>
                        
                        <span className="colection__stars"><Vote rate={item.rate}/></span>
                        <p>{item.text}</p>
                </li>
                )}
            )}
            </>
        )
}