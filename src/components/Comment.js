import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/useHTTP'
import { useMessage } from '../hooks/useMessage'
import { Vote } from '../components/Vote'


export const Comment = (props) => {
    const { id, updateReviews } = props

    const [commenting, setCommenting] = useState(false)
    const [text, setText] = useState('')
    const [mark, setMark] = useState(-1)

    const { request } = useHTTP()
    const message = useMessage()
    const { token, link } = useContext(AuthContext)

    const reviewSubmit = async() => {
        try {
            let body = {rate: mark, text}
            setMark(-1)
            setText('')
            let headers = {Authorization: `Token ${token}`}
            await request(`${link}api/reviews/${id}`, 'POST', body, headers)
            updateReviews()
        } catch(e) {
            message(e)
        }

    }


    useEffect(() => {
        return () => {
            setText('')
            setMark(-1)
        }
    }, [commenting])

        
    if (!commenting) {
        return (
            <div className="center-align">
                <h4>Leave a comment</h4>
                <a 
                className="btn-floating btn-large red"
                onClick={() => setCommenting(true)}><i className="material-icons">add</i></a>
                <div className="section"></div>
            </div>
        )
    }

    return (
        <>
        <div className="card comment">
            <div className="card-content">
                <div className="center-align">
                    <Vote mark={mark} setMark={setMark}/>
                </div>
            </div>
            <div className="card-action">

                <textarea 
                onChange={e => setText(e.target.value)} 
                defaultValue={text} 
                className="comment__text" 
                name="comment" 
                id="comment" 
                cols="30" 
                rows="10"></textarea>

                <div className="center section">
                    <button onClick={reviewSubmit} disabled={!text.length && mark<0} className="btn">Ok</button>
                    <button onClick={() => setCommenting(false)} className="btn">Cancel</button>
                </div>
            </div>
        </div>  

        <div onClick={() => setCommenting(false)} className="blackout"></div>
        </>
    )
}