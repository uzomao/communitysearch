import React, { useRef, useContext, useState } from 'react'
import categories from '../../categories.json'
import postStyles from './post.module.scss'
import { supabase } from '../../App'
import Context from '../../context'

const Post = () => {

    const titleRef = useRef(null)
    const urlRef = useRef(null)
    const categoryRef = useRef(null)

    const { currentUser } = useContext(Context).value

    const [enjoying, setEnjoying] = useState(null)
    const [warnings, setWarnings] = useState(null)

    const addEnjoying = async() => {
        
        const { data: enjoying, error } = await supabase
            .from('enjoying')
            .insert({
                'title': titleRef.current.value,
                'url': urlRef.current.value,
                'category': categoryRef.current.value,
                'personId': currentUser.id
            })
            if(error) console.log(error)
            else {
                console.log(enjoying[0])
                setEnjoying(enjoying[0])
                setWarnings(null)
            }   
    }

    const checkSubmission = () => {
        const warnings = {}

        if(!titleRef.current.value) {warnings.title = 'Please add a title'}
        if(!urlRef.current.value.includes('http'))(warnings.url = 'Please add a valid url')
        
        Object.keys(warnings).length === 0 ? addEnjoying() : setWarnings(warnings)
    }

    const showEnjoying = (enjoying) => {
        const { title, url, category } = enjoying
        return url ? <p className="subtext">
                        <a href={url}>{title}</a>
                        <span> {category && `(${category})`}</span>
                    </p>
                    : <p className="subtext">{title}<span> {category && `(${category})`}</span></p>
    }

    return (
        <>
            {
                enjoying ?
                    showEnjoying(enjoying)
                    :
                    <div className={postStyles.form}>
                        <div>
                            <input type="text" placeholder="title" ref={titleRef}></input>
                            {warnings && warnings.title && <p className="subtext" style={{color: 'red'}}>{warnings.title}</p>}

                            <input type="text" placeholder="url" ref={urlRef} style={{marginLeft: '1rem'}}></input>
                            {warnings && warnings.url && <p className="subtext" style={{color: 'red'}}>{warnings.url}</p>}
                        </div>
                        <div>
                            <select name="category" defaultValue={""} id="search-category" ref={categoryRef} className={`mt mb dropdown`}>
                                <option value="" disabled style={{color: '#9c9c9c'}}>category</option>
                                {
                                    categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                                }
                            </select>
                            <button className="text-btn" onClick={() => checkSubmission()}>
                                Submit
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Post
