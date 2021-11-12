import { request, gql } from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            name
                            photo {
                                url
                            }
                        }
                        category {
                            name
                            slug
                        }
                        createdAt
                        slug
                        title
                        id
                        shortdescription
                        photo {
                            url
                        }
                    }
                    }
                }
            }
    `
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query getPostDetails($slug: String!) {
            post(where: { slug: $slug}){
                author {
                    bio
                    name
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                shortdescription
                category {
                    name
                    slug
                }
                photo {
                    url
                }
                ingredients{
                    raw
                }
                instructions{
                    raw
                }
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug});
    return result.post;
}

export const getSimilarPosts = async (category, slug) => {
    const query = gql`
        query getPostDetail($slug: String!, $category: String!){
            posts(
                where: {slug_not: $slug, AND: { category: {name: $category} }}
                last: 5
            ){
                title
                photo{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {category, slug});
    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query getCategories{
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
}

export const submitComment = async (obj) => {
    const result = await fetch(`/api/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json();
}

export const getComments = async (slug) => {
    const query = gql`
        query getComments($slug: String!){
            comments(where: {post : {slug: $slug}}){
                name
                createdAt
                comment
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug});
    return result.comments;
}


export const getFeaturedPosts = async () => {
    const query = gql`
      query GetFeaturedPost() {
        posts(where: {featured: true}) {
          author {
            name
            photo {
              url
            }
          }
          category {
              name
          }
          photo {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.posts;
};

  
export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {category: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              shortdescription
              photo {
                url
              }
              category {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
};