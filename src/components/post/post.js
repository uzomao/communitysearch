import React, { useRef, useState, useContext } from 'react'
import Buttons from '../../lib/buttons'
import categories from '../../categories.json'
import postStyle from '../../pages/post/post.module.scss'
import { postSearch } from '../../models/search'
import Context from '../../context'
import { useHistory } from 'react-router-dom'

const Post = ({ redirectOnPost }) => {

    const { currentUser } = useContext(Context).value;

    const categoryRef = useRef(null)
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const [ errorText, setErrorText ] = useState(null)
    const [ isSearchInCommunity, setIsSearchInCommunity ] = useState(true)

    let history = useHistory()

    const submitSearch = async () => {

        const title = titleRef.current.value
        if(!title || title.length === 0) {
            setErrorText('Please enter a search title')
        } else {
            const currentUserResolved = await currentUser
            postSearch(categoryRef.current.value, title, descriptionRef.current.value, isSearchInCommunity, currentUserResolved.id)
                .then(res => {
                    res ? redirectOnPost && history.push(`/search/${res.id}`, { search: res, successMsg: 'Search created successfully' })
                        : setErrorText('This search could not be posted, please try again')
                })
        }
    }

    return (
        <>
        { errorText && <p className="error">{errorText}</p> }
            <div className="form">
                <select name="category" defaultValue={""} id="search-category" ref={categoryRef} className={`mt mb dropdown ${postStyle.dropdown}`}>
                    <option value="" disabled style={{color: '#9c9c9c'}}>category</option>
                    {
                        categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                    }
                </select>
                <input type="text" placeholder="what would you like to find?" ref={titleRef} className={`${postStyle.element}`} />
                <textarea placeholder="want to say more about this?" ref={descriptionRef} className={`${postStyle.element}`}></textarea>
                <div className={`mb ${postStyle.radiobtns}`}>
                    <h3>ask:</h3>

                    <div>
                        <input type="radio" id="my-community" name="search-scope" value={true}
                                defaultChecked onChange={() => setIsSearchInCommunity(true)} />
                        <label htmlFor="my-community">only my community</label>
                    </div>

                    <div>
                        <input type="radio" id="larger-network" name="search-scope" value={false} onChange={() => setIsSearchInCommunity(false)} />
                        <label htmlFor="larger-network">the larger network</label>
                    </div>
                </div>

                <Buttons btnText="Post" isDoubleBtn={true} onClick={() => submitSearch()} />
            </div>
        </>
    )
}

export default Post
