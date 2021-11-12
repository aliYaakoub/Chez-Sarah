// import React, { useEffect, useState } from 'react'
import { PostDetail, Author, SimilarPosts, CommentsForm, Comments, Loader } from '../../components'
import { getPosts, getPostDetails } from '../../services'
import {useRouter} from 'next/router'

const PostDetails = ({post}) => {
    const router = useRouter()

    // const [post, setPost] = useState([]);

    // useEffect(async ()=>{
    //     const slug = router.query.slug;
    //     const data = await getPostDetails(slug);
    //     setPost(data)
    // },[]);

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className='container mx-auto px-3 lg:px-10 mb-10 grid grid-col-1 lg:grid-cols-12 lg:gap-10'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post} />
                <div className='contents lg:hidden'>
                    <Author post={post} />
                </div>
                <CommentsForm slug={post.slug} />
                <Comments slug={post.slug} />
            </div>
            <div className='col-span-1 lg:col-span-4'>
                    <div className='lg:sticky top-8'>
                        <SimilarPosts slug={post.slug} category={post.category.name}  />
                        <div class='hidden lg:contents'>
                            <Author post={post} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps ({params}) {
    const data = (await getPostDetails(params.slug)) || [];
    return {
      props: { post: data },
      
    }
}
  
export async function getStaticPaths () {
    const posts = await getPosts();
    return{
        paths: posts.map(({node:{slug}})=>({params : {slug}})),
        fallback: true
    }
}