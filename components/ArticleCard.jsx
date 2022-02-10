import Link from 'next/link'
import Image from 'next/image'

const ArticleCard = ({ article }) => {
	const { title, slug, thumbnail, category } = article.fields

	return (
		<div className='card'>
			<div className='card-image'>
				<Image
					src={'https:' + thumbnail.fields.file.url}
					alt={title}
					width={thumbnail.fields.file.details.image.width}
					height={thumbnail.fields.file.details.image.height}
				/>
			</div>
			<div className='card-content'>
				<h4>{title}</h4>
				<ul>{category.map((cat) => <li>{cat}</li>)}</ul>
				<div className='actions'>
					<Link href={'/article/' + slug}>
						<a>Read me!</a>
					</Link>
				</div>
			</div>

			<style jsx>{`
				.card {
					transform: rotateZ(-1deg);
				}
                .card-image {
                    max-width: 100%;
                }
				.card-content {
                    border-radius: 10px;
                    padding: 1rem;
					background: #fff;
					box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
					margin: 0;
					position: relative;
					top: -40px;
					left: -10px;
				}
				.info {
					padding: 16px;
				}
				.card-content h4 {
					margin: 4px 0;
					text-transform: uppercase;
				}
				.info p {
					margin: 0;
					color: #777;
				}
				.actions {
					margin-top: 20px;
					display: flex;
					justify-content: flex-end;
				}
				.actions a {
                    border-radius: 10px;
					color: #fff;
					background: #f01b29;
					padding: 16px 24px;
					text-decoration: none;
				}
			`}</style>
		</div>
	)
}

export default ArticleCard
