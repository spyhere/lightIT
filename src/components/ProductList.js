import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'



export const ProductList = ({catalog}) => {
    const { link } = useContext(AuthContext)

    return (
        <div className="row">
            {catalog.length && catalog.map(item => 
                <div className="col s3" key={item.id}>
                    <div className="card">

                        {/* IMAGE */}
                        <Link to={`/product/${item.id}`}>
                            <div className="card-image">
                                <img className="product__img" src={`${link}static/${item.img}`} alt={item.img}/>
                            </div>
                        </Link>

                        {/* TITLE */}
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{item.title}<i className="material-icons right">more</i></span>
                            <Link to={`/product/${item.id}`}>
                                <p className="center-align">Choose</p>
                            </Link>
                        </div>
                        
                        {/* DESCRIPTION */}
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{item.title}<i className="material-icons right">close</i></span>
                            <p>{item.text}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}