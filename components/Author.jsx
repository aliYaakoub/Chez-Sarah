import React from 'react'
import Image from 'next/image'

const Author = ({post}) => {
    return (
        <div className='w-full bg-black bg-opacity-70 rounded-xl text-white py-12 text-center flex flex-col relative justify-center items-center mb-8'>
            <div className='absolute left-0 right-0 -top-10'>
                <Image unoptimized alt='' src={post.author.photo.url} height='80px' width='80px' className='align-middle rounded-full' />
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='text-3xl'>{post.author.name}</h1>
                <p className='text-xl pt-8' >{post.author.bio}</p>
            </div>
        </div>
    )
}

export default Author
