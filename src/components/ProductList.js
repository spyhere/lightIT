import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const link = 'http://smktesting.herokuapp.com/static/'

export const ProductList = ({catalog}) => {

    return (
        <div className="row">
            {catalog.length && catalog.map(item => 
                <div className="col s3" key={item.id}>
                    <div className="card">
                        <Link to={`/product/${item.id}`}>
                            <div className="card-image">
                                <img className="product__img" src={link + item.img} alt={item.img}/>
                            </div>
                        </Link>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{item.title}<i className="material-icons right">more</i></span>
                            <Link to={`/product/${item.id}`}>
                                <p className="center-align">Choose</p>
                            </Link>
                        </div>
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