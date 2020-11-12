import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHTTP } from '../hooks/useHTTP'
import { Loader } from '../components/Loader'
import { Comment } from '../components/Comment'
import { AuthContext } from '../context/AuthContext'
import { Reviews } from '../components/Reviews'



export const ProductPage = ({match}) => {
    const id = match.params.id
    const { request, loading, error, clearError } = useHTTP()
    const [reviews, setReviews] = useState(null)
    const { catalog, updateCatalog, token, link } = useContext(AuthContext)

    // Getting reviews from the server
    const updateReviews = useCallback(async () => {
        try {
            let data = await request(`${link}api/reviews/${id}`)
            setReviews(data) 
        } catch(e) {}
    }, [id, request, link])

    // If entering the website with a direct link on the product and catalog list is empty
    const setCatalog = useCallback(async () => {
        try {   
            let data = await request(link+'api/products/')
            updateCatalog(data)
        } catch(e) {}
    }, [request, updateCatalog, link])


    useEffect(() => {
        updateReviews()
        if (!catalog.length) setCatalog()

        // Clearing error from HTTP request on rerender
        return () => {
            if (error) clearError()
        }
    }, [updateReviews, setCatalog, catalog.length, error, clearError])


    // If we still waiting for response from the server
    if (loading || !reviews) {
        return <Loader />
    }

    // If we lost connection during checking the product or leaving the comment
    if (!loading && error) {
        return (
            <h2 className="center-align">Lost connection</h2>
        )
    }

    
    return (
        <div className="row">

            {/* PRODUCT */}
            <div className="col s6 product">
                <Link to="/catalog"><i className="material-icons back_arrow">arrow_back</i></Link>
                <h2 className="center-align">{catalog[id-1].title}</h2>
                <img className="center-block section" src={`${link}static/${catalog[id-1].img}`} alt=""/>
                <div className="description__divider"><div></div></div>
                <h4 className="center-align">Description</h4>
                <div className="description__text">{catalog[id-1].text}</div>
            </div>

            {/* REVIEWS */}
            <div className="col s6">
            <ul className="collection with-header" style={{border: "none", margin: "0"}}>
                <li className="collection-header"><h4 className="section">Reviews</h4></li>

                {/* CHECKING AUTHORIZATION */}
                {token ? <Comment id={id} updateReviews={updateReviews}/> :
                <div className="card cyan darken-3 white-text">
                    <Link to="/auth/log"><p className="card-content white-text">Authorize to leave a comment and rate the product</p></Link>
                </div>
                } 

                {/* LIST OF REVIEWS */}
                <Reviews {...{reviews}}/>
            </ul>  
            </div> 
        </div>
    )
}