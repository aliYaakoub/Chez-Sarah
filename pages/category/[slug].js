import React,{useState} from 'react'
import Head from 'next/head';
import { getCategoryPost, getCategories } from '../../services';
import { PostCard } from '../../components'
import { paginate } from '../../utils/paginate';
import Pagination from '../../components/pagination'

const CategoriesPosts = ({posts}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    const paginatedItems = paginate(posts, currentPage, pageSize);

    return (
        <div className="px-10 container mx-auto">
        <Head>
            <title>Chez Sarah</title>                          {/* change the title here */}
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {posts.length === 0 ? 
            <div className='text-center font-medium text-2xl'>
                <h1>No Recipes In this category yet</h1>
            </div>  
            :
            <div>
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
    )
}

export default CategoriesPosts

export async function getStaticProps({params}){
    const posts = await getCategoryPost(params.slug);
    return {
        props: {posts}
    }
}

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
      paths: categories.map(({ slug }) => ({ params: { slug } })),
      fallback: true,
    };
  }