import React from 'react'
import Header from '../../components/header/header'
import postStyle from './post.module.scss'
import Buttons from '../../lib/buttons'
import categories from '../../categories.json'

const Post = () => {

    return (
        <div>
            <Header />

            <main className={postStyle.main}>
                <h1 className="heading">find something</h1>

                <div className={postStyle.form}>
                    <select name="category" id="search-category" className={`mt mb dropdown ${postStyle.dropdown}`}>
                        <option value="category">category</option>
                        {
                            categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                        }
                    </select>
                    <input type="text" placeholder="what would you like to find?" id="search-title" className={`mb ${postStyle.element}`} />
                    <textarea placeholder="want to say more about this?" id="search-description" className={`mb ${postStyle.element}`}></textarea>

                    <Buttons btnText="Post" isDoubleBtn={true} />
                </div>
            </main>
        </div>
    )
}

export default Post
