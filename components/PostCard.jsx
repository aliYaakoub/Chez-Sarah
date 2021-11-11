import moment from 'moment';
import React from 'react'
import Link from 'next/link';

const PostCard = ({post}) => {
    console.log(post);
    return (
        <div className='w-full rounded-xl overflow-hidden relative h-96 '>
            <img src={post.photo.url} alt={post.title} className='w-full h-full absolute object-cover object-center' />
            <div className='w-full h-full top-0 left-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center text-white'>
                <h1 className='text-2xl py-4 font-semibold'>{post.title}</h1>
                <p className='text-xl px-2 py-4 text-center'>{post.shortdescription}</p>
                <div className='justify-self-end py-4 text-white justify-center w-full flex flex-col items-center md:flex-row'>
                    <div className='px-5 pb-5 md:pb-0 flex flex-row items-center'>
                        <img src={post.author.photo.url} height='30px' width='30px' alt='' className='rounded-full' />
                        <h1 className='px-2'>{post.author.name}</h1>
                    </div>
                    <div className='px-5 flex flex-row items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                </div>
                <Link href={`/post/${post.slug}`}>
                    <span className='cursor-pointer px-5 py-2 my-4 bg-blue-300 text-black rounded-xl'>Continue Reading</span>
                </Link>
            </div>
        </div>
    )
}

export default PostCard
