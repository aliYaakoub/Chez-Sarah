import Head from 'next/head'
import { getPosts } from '../services'
import {PostCard, Loader} from '../components';

export default function Home({ posts }) {
  console.log(posts);

  return (
    <div className="px-10 container mx-auto">
      <Head>
        <title>Chez Sarah</title>                          {/* change the title here */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10'>
        {posts.map(post=>(
          <PostCard key={post.node.title} post={post.node} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];
  return {
    props: {posts}
  }
}