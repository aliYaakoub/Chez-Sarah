import React, { useEffect, useState } from 'react'
import { getSimilarPosts } from '../services'
import moment from 'moment';
import Link from 'next/link';

const SimilarPosts = ({slug, category}) => {

    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(()=>{
        getSimilarPosts(category, slug).then((result) => setRelatedPosts(result))
    },[slug])

    return (
        <div className='bg-black bg-opacity-70 text-white shadow-lg rounded-lg p-8 mb-16'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                You might also like
            </h3>
            {relatedPosts.map(post => (
                <div key={post.title} className='flex items-center w-full mb-4'>
                    <div className='w-16 flex-none'>
                        <img src={post.photo.url} width='60px' height='60px' alt={post.title} className='align-middle rounded-full' />
                    </div>
                    <div className='flex-grow ml-4'>
                        <p className='text-blue-300 font-xs'>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`}>
                            <span>{post.title}</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SimilarPosts
