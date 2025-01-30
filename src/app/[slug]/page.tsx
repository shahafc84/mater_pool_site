import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeaderLine from '@/components/HeaderLine'

interface PageData {
	Slug: string
	Title: string
	Content: { children: { text: string }[] }[]
}

interface ApiResponse {
	data: PageData[]
}

export async function generateStaticParams() {
	const res = await fetch('https://admin.master-pool.co.il/api/pages-p')
	const data: ApiResponse = await res.json()
	return data.data.map(page => ({
		slug: page.Slug
	}))
}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const res = await fetch(
		`https://admin.master-pool.co.il/api/pages-p?filters[Slug][$eq]=${slug}`
	)
	const data: ApiResponse = await res.json()
	const page = data.data[0]

	if (!page) {
		return (
			<div className="flex flex-col min-h-screen">
				<Header />
				<HeaderLine />
				<main className="flex-grow bg-white p-6">
					<h1 className="text-3xl font-bold text-center text-red-500">
						⚠️ עמוד לא נמצא
					</h1>
				</main>
				<Footer />
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<HeaderLine />

			<main className="flex-grow bg-white">
				<div className="container mx-auto px-4 py-6 max-w-screen-md">
					<h1 className="text-3xl font-bold text-center">{page.Title}</h1>
					<div className="prose max-w-none text-lg text-gray-700 mt-4">
						{page.Content.map((block, index) => (
							<p key={index}>
								{block.children.map((child, childIndex) => (
									<span key={childIndex}>{child.text}</span>
								))}
							</p>
						))}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}
