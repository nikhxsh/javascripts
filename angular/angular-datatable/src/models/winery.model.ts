
interface Wine {
	id: number
	winery_full: string
	wine_full: string
	vintage: number
	note: string
	taster_initials: string
	color: string
	country: string
	region: string
	score: number
	price: number
	issue_date: Date
	top100_year: number
	top100_rank: number
}


interface WineInfo {
	wines: Wine[]
	total: number
}

export { WineInfo, Wine };