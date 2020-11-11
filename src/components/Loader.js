import React from 'react'

export const Loader = () => {
    return (
        <div className="container loader">
            <h5>Loading...</h5><br/>
            <div className="progress">
                <div className="indeterminate blue darken-4"></div>
            </div>
        </div>
    )
}