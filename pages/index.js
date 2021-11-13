import Head from 'next/head'
import React, { useState,useEffect } from 'react'
import { getPosts } from '../services'
import {PostCard, Loader} from '../components';
import FeaturedPosts from '../sections/FeaturedPosts';
import Contacts from '../sections/Contacts';
import { paginate } from './../utils/paginate';
import Pagination from '../components/pagination'

export default function Home() {
  
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const paginatedItems = paginate(posts, currentPage, pageSize);

  useEffect(async ()=>{
    const posts = await getPosts();
    setPosts(posts);
    setisLoading(false);
  },[]);

  return (
    <div className="px-10 container mx-auto">
      <Head>
        <title>Chez Sarah</title>                          {/* change the title here */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? 
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
        :
        <div className=''>
          {posts.length === 0 ? 
            <div className='h-screen'>
              <h2 className='text-center w-full'>no Recipes to show yet</h2>
            </div>
            :
            <div className='min-h-screen flex flex-col'>
              <FeaturedPosts />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10'>
                {paginatedItems.map(post=>(
                  <PostCard key={post.node.title} post={post.node} />
                ))}
              </div>
              <Pagination
                    itemsCount={posts.length}
                    currPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={(page)=>setCurrentPage(page)}
                />
            </div>
            }
        </div>
      }
      <Contacts />
    </div>
  )
}

// export async function getStaticProps(){
//   const posts = (await getPosts()) || [];
//   return {
//     props: {posts}
//   }
// }