import React from 'react'
import Header from '../../components/header/header'
import postStyle from './post.module.scss'
import PostSearch from '../../components/post/post'

const Post = () => {

    return (
        <div>
            <Header />

            <div className={postStyle.main}>
                <h1 className="page-heading">find something</h1>
                
                <PostSearch redirectOnPost={true} />
            </div>
        </div>
    )
}

export default Post
