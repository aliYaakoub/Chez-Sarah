import React from 'react'
import moment from 'moment';

const PostDetail = ({post}) => {
    
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
            }

            if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
            }

            if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
            }
        }

        switch (type) {
            case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'image':
            return (
                <img
                    key={index}
                    alt={obj.title}
                    height={obj.height}
                    width={obj.width}
                    src={obj.src}
                />
            );
            default:
            return modifiedText;
        }
    };

    return (
        <div className='w-full text-white bg-black bg-opacity-70 rounded-xl overflow-hidden mb-16'>
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img src={post.photo.url} alt={post.title} className='object-top h-full w-full rounded-t-lg' />
            </div>
            <div className='w-full h-auto pb-8 px-10'>
                <h2 className='text-center text-3xl font-semibold'>{post.title}</h2>
                <div className='p-5 flex flex-row justify-center items-center border-b border-blue-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                </div>
                <div className='h-auto text-xl text-center border-b border-blue-300'>
                    <h2 className='text-3xl text-blue-300 p-10'>Ingredients : </h2>
                    {post.ingredients.raw.children.map((typeObj, index)=>{
                        const children = typeObj.children.map((item,itmIndex)=> getContentFragment(itmIndex, item.text, item))
                        return getContentFragment(index, children, typeObj, typeObj.type);
                    })}
                </div>
                <div className='h-auto text-xl text-justify'>
                    <h2 className='text-3xl text-blue-300 p-10 text-center'>Instructions : </h2>
                    {post.instructions.raw.children.map((typeObj, index)=>{
                        const children = typeObj.children.map((item,itmIndex)=> getContentFragment(itmIndex, item.text, item))
                        return getContentFragment(index, children, typeObj, typeObj.type);
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostDetail
