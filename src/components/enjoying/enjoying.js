import React, { useRef, useContext, useState, useEffect, useCallback } from 'react'
import categories from '../../categories.json'
import postStyles from './post.module.scss'
import { supabase } from '../../App'
import Context from '../../context'
import { MdClose } from 'react-icons/md'


const Post = ({ profileId }) => {

    const titleRef = useRef(null)
    const urlRef = useRef(null)
    const categoryRef = useRef(null)

    const { currentUser } = useContext(Context).value

    const [enjoying, setEnjoying] = useState(null)
    const [warnings, setWarnings] = useState(null)
    const [openForm, setOpenForm] = useState(false)

    const getEnjoying = useCallback(async(profileId) => {
        
        const { data: enjoying, error } = await supabase
            .from('enjoying')
            .select('*')
            .eq('personId', profileId)
            if(error) console.log(error)
            else {
                const lastIndex = enjoying.length - 1
                setEnjoying(enjoying[lastIndex])
            }
    }, [])

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
                setEnjoying(enjoying[0])
                setWarnings(null)
            }   
    }

    useEffect(() => {
        getEnjoying(profileId).catch(console.error)
    }, [getEnjoying, profileId])

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
                !openForm ?
                    <>
                        { enjoying ? showEnjoying(enjoying) : <span>...</span>}
                        <button className="text-btn-regular" onClick={() => setOpenForm(true)} style={{padding: 0, marginTop: '.5rem'}}>
                            Edit
                        </button>
                    </>
                    :
                    <div className={postStyles.form}>
                        <div>
                            <span>
                                <input type="text" placeholder="title" ref={titleRef}></input>
                                {warnings && warnings.title && <p className="subtext" style={{color: 'red'}}>{warnings.title}</p>}
                            </span>

                            <span style={{marginLeft: '1rem'}}>
                                <input type="text" placeholder="url" ref={urlRef}></input>
                                {warnings && warnings.url && <p className="subtext" style={{color: 'red'}}>{warnings.url}</p>}
                            </span>
                        </div>
                        <div>
                            <select name="category" defaultValue={""} id="search-category" ref={categoryRef} className={`dropdown`}>
                                <option value="" disabled style={{color: '#9c9c9c'}}>category</option>
                                {
                                    categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                                }
                            </select>
                        </div>
                        <div className={postStyles.footer}>
                            <button style={{padding: 0}} className="text-btn-regular" aria-label="submit button" onClick={() => checkSubmission()}>
                                Submit
                            </button>
                            <button className="text-btn-regular" onClick={() => setOpenForm(false)}>
                                <MdClose className='close-btn' />
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Post
