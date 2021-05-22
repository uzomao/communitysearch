import React, { useContext, useRef, useState } from 'react'
import Header from '../../components/header/header'
import postStyle from './post.module.scss'
import Buttons from '../../lib/buttons'
import categories from '../../categories.json'
import { supabase } from '../../App'
import Context from '../../context'
import { useHistory } from 'react-router-dom'

const Post = () => {

    const { currentUser } = useContext(Context).value;

    const [ errorText, setErrorText ] = useState(null)
    const [ searchInCommunity, setSearchInCommunity ] = useState(true)

    const categoryRef = useRef(null)
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    let history = useHistory()

    const postSearch = async () => {
        const { data: search, error } = await supabase
            .from('searches')
            .insert([
                { 
                    'category': categoryRef.current.value,
                    'title': titleRef.current.value,
                    'description': descriptionRef.current.value,
                    'isFound': false,
                    'isInCommunity': searchInCommunity,
                    'personId': currentUser.id
                },
            ])
            if(error) setErrorText(error.message)
            else {
                categoryRef.current.value=""
                titleRef.current.value=""
                descriptionRef.current.value=""
                let newSearch = search[0]
                history.push(`/search/${newSearch.id}`, { search: newSearch, successMsg: 'Search created successfully' })
            }
        }

    return (
        <div>
            <Header />

            <main className={postStyle.main}>
                <h1 className="heading">find something</h1>

                {
                    errorText && <p className="error">{errorText}</p>
                }
                
                <div className={postStyle.form}>
                    <select name="category" defaultValue={""} id="search-category" ref={categoryRef} className={`mt mb dropdown ${postStyle.dropdown}`}>
                        <option value="" disabled style={{color: '#9c9c9c'}}>category</option>
                        {
                            categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                        }
                    </select>
                    <input type="text" placeholder="what would you like to find?" ref={titleRef} className={`mb ${postStyle.element}`} />
                    <textarea placeholder="want to say more about this?" ref={descriptionRef} className={`mb ${postStyle.element}`}></textarea>
                    <div className={`mb ${postStyle.radiobtns}`}>
                        <h3>ask:</h3>

                        <div>
                            <input type="radio" id="my-community" name="search-scope" value={true}
                                    defaultChecked onChange={() => setSearchInCommunity(true)} />
                            <label htmlFor="my-community">only my community</label>
                        </div>

                        <div>
                            <input type="radio" id="larger-network" name="search-scope" value={false} onChange={() => setSearchInCommunity(false)} />
                            <label htmlFor="larger-network">the larger network</label>
                        </div>
                    </div>

                    <Buttons btnText="Post" isDoubleBtn={true} onClick={() => postSearch()} />
                </div>
            </main>
        </div>
    )
}

export default Post
