import { createClient } from 'contentful'
import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: 'blog'
	})

	const paths = res.items.map((i) => ({
		params: { slug: i.fields.slug }
	}))

	return { 
		paths, 
		fallback: true
	}
}

export async function getStaticProps ({ params }){
	const { items } = await client.getEntries({
		content_type: 'blog',
		'fields.slug': params.slug
	})

	if(!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			article: items[0]
		}, 
		revalidate: 1
	}
}

export default function ArticleDetails ({ article }){

	if (!article) return <Skeleton />

	const { title, featuredImage, category, text } = article.fields

	console.log(article)
	return (
		<div>
			<div className='banner'>
				<Image
					src={'https:' + featuredImage.fields.file.url}
					alt={title}
					width={featuredImage.fields.file.details.image.width}
					height={featuredImage.fields.file.details.image.height}
				/>
				<h2>{title}</h2>
			</div>
			<div className='info'>
				{category.map((cat) => <span key={cat}>{cat} </span>)}

				<div className='text'>
          {documentToReactComponents(text)}
        </div>
			</div>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
			<style jsx>{`
				h2,
				h3 {
					text-transform: uppercase;
				}
				.banner h2 {
					margin: 0;
					background: #fff;
					display: inline-block;
					padding: 20px;
					position: relative;
					top: -60px;
					left: -10px;
					transform: rotateZ(-1deg);
					box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
				}
        .info {
          border-radius: 10px;
          padding: 20px;
          box-shadow: inset 1px 3px 5px rgba(0, 0, 0, 1);
          background: #d06bf8;
        }
				.info p {
					margin: 0;
				}
				.info span::before {
					content: "#";
				}
				.info span:last-child::after {
					content: ".";
				}
			`}</style>
		</div>
	)
}
