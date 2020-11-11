import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHTTP } from '../hooks/useHTTP'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { Review } from '../components/Review'


const link = 'http://smktesting.herokuapp.com/'

export const ProductPage = ({match}) => {
    const id = match.params.id
    const { request, loading, error, clearError } = useHTTP()
    const [reviews, setReviews] = useState([])
    const { catalog, updateCatalog, token } = useContext(AuthContext)
    const [commenting, setCommenting] = useState(false)


    const updateReviews = useCallback(async () => {
        try {
            let data = await request(`${link}api/reviews/${id}`)
            setReviews(data) 
        } catch(e) {}
    }, [id, request])

    const setCatalog = useCallback(async () => {
        try {   
            let data = await request(link+'api/products/')
            updateCatalog(data)
        } catch(e) {}
    }, [request, updateCatalog])

    useEffect(() => {
        updateReviews()
        if (!catalog.length) setCatalog()

        return () => {
            if (error) clearError()
        }
    }, [updateReviews, setCatalog, catalog.length])

    if (loading || !reviews.length) {
        return <Loader />
    }

    if (!loading && error) {
        return (
            <h1>Lost connection</h1>
        )
    }


    return (
        <div className="row">
            <div className="col s6 product">
                <Link to="/catalog"><i class="material-icons back_arrow">arrow_back</i></Link>
                <h2 className="center-align">{catalog[id-1].title}</h2>
                <img className="center-block section" src={`${link}static/${catalog[id-1].img}`} alt=""/>
                <div className="description__divider"><div></div></div>
                <h4 className="center-align">Description</h4>
                <div className="description__text">{catalog[id-1].text}</div>
            </div>
            <div className="col s6">
            <ul className="collection with-header" style={{border: "none", margin: "0"}}>
                <li className="collection-header"><h4 className="section">Reviews</h4></li>

                {token && 
                <div className="center-align">
                    {!commenting ?
                        <>
                        <h4>Leave a comment</h4>
                        <a 
                        className="btn-floating btn-large waves-effect waves-light red"
                        onClick={() => setCommenting(true)}><i className="material-icons">add</i></a>
                        <div className="section"></div>
                        </>
                        :
                        <p>Commenting...</p>
                    }
                </div>
                } 
                <Review {...{reviews}}/>
            </ul>  
            </div> 
        </div>
    )
}