import React  from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/userPromise';

const NewsListBlock = styled.div`
    box-sizing : boreder-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width:768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

    const NewsList = ({category}) => {
        const [loading, response, error] = usePromise(() => {
            const query = category === 'all' ? '' : `&category=${category}`;
            return axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=b3c1e3e7e9bd4167827e39d04af1f626`,);
            
        }, [category]);
        // const [articles, setArticles] = useState(null);

        // 대기 중일 때
        if(loading) {
            return <NewsListBlock>대기중...</NewsListBlock>;
        }

        // 아직 articles 값이 설정되지 않았을 때
        if(!response) {
            return null;
        }

        if (error) {
            return <NewsListBlock>에러 발생!</NewsListBlock>;
        }
        
        // response 값이 유요할 때
        const { articles } = response.data;
        return (
            <NewsListBlock>
                {articles.map(article => (
                    <NewsItem key={article.url} article={article} />
                ))}
            </NewsListBlock>
        );
    };

export default NewsList;