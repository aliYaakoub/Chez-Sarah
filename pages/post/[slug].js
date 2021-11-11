import React from 'react'
import { PostDetail, Author, SimilarPosts, CommentsForm, Comments } from '../../components'
import { getPosts, getPostDetails } from '../../services'

const PostDetails = ({post}) => {
    return (
        <div className='container mx-auto px-3 lg:px-10 mb-10 grid grid-col-1 lg:grid-cols-12 lg:gap-10'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post} />
                <Author post={post} />
                <CommentsForm slug={post.slug} />
                <Comments slug={post.slug} />
            </div>
            <div className='col-span-1 lg:col-span-4'>
                    <div className='lg:sticky top-8'>
                        <SimilarPosts slug={post.slug} category={post.category.name}  />
                    </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps ({params}) {
    const data = (await getPostDetails(params.slug)) || [];
    return {
      props: { post: data }
    }
  }
  
  export async function getStaticPaths () {
      const posts = await getPosts();
      return{
          paths: posts.map(({node:{slug}})=>({params : {slug}})),
          fallback: true
      }
  }