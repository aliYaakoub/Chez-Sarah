import React,{ useState, useEffect } from 'react'
import { getCategories } from '../services'
import Link from 'next/link'

const Header = () => {

    const [categories, setCategories] = useState([]);
    
    useEffect(()=>{
        getCategories().then(newCategories => setCategories(newCategories))
    },[])

    return (
        <div id='header' className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-black py-8'>
                <div className='md:float-left block text-center'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-black'>
                            Chez Sarah 
                        </span>
                    </Link>
                </div>
                <div className='md:float-left flex flex-col text-center mt-5 md:contents'>
                    {categories.map(category => (
                        <Link key={category.slug} href={`/category/${category.slug}`} >
                            <span className='md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header;