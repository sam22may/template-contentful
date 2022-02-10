import { createClient } from 'contentful'
import ArticleCard from '../components/ArticleCard'

export async function getStaticProps (){
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
	})

	const res = await client.getEntries({
		content_type: 'blog'
	})

	return {
		props: {
			articles: res.items
		},
		revalidate: 1
	}
}

export default function Recipes ({ articles }){
	console.log(articles)
	return (
		<div className='article-list'>
			{articles.map((article) => (
        <ArticleCard key={article.sys.id} article={article} />
			))}


      <style jsx>{`
        .article-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-gap: 20px;
        }
      `}</style>

		</div>
	)
}
