import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {

    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl= useRef();
    const nameEl= useRef();
    const emailEl= useRef();
    const storeDataEl= useRef();

    useEffect(()=>{
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    },[])

    const handleCommentSubmissin = () =>{
        setError(false)

        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { value: comment } = commentEl.current;
        const { checked: storeData } = storeDataEl.current;

        if(!comment || !name || !email){
            setError(true);
            return;
        }

        const commentObj = {
            name, email, comment, slug
        }

        if(storeData){
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        }
        else {
            window.localStorage.removeItem('name', name)
            window.localStorage.removeItem('email', email)
        }

        submitComment(commentObj).then(res => {
            setShowSuccessMessage(true);
            setTimeout(()=>{
                setShowSuccessMessage(false);
            },3000)
        })
    }

    return (
        <div className='bg-black bg-opacity-70 text-white shadow-lg rounded-lg p-8 pb-12 mb-16'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comment form</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea 
                    ref={commentEl} 
                    name='comment'
                    placeholder='Comment'
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input 
                    type='text'
                    name='name'
                    placeholder='Name'
                    ref={nameEl}
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
                <input 
                    type='text'
                    name='email'
                    placeholder='Email'
                    ref={emailEl}
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input 
                        ref={storeDataEl}
                        type='checkbox'
                        id='storeData'
                        name='storeData'
                        value='true'
                    />
                    <label className='text-white cursor-pointer ml-2' htmlFor="storeData">store my email and name for the next time i comment</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>all field are required</p>}
            <div className='mt-8'>
                <button type="button" onClick={handleCommentSubmissin} className='transition duration-500 ease hover:bg-pink-500 inline-block bg-blue-300 text-lg rounded-full text-black px-8 py-3 cursor-pointer'>
                    Submit
                </button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment Submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
