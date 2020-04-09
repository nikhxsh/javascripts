
interface Wine {
	id: number,
	name: string,
	wineryId: string,
	color: string,
	vintage: string,
	score: number,
	price: number,
	issueDate: string,
	rank: number,
	rankYear: number,
	note: string
}


interface WineInfo {
	result: Wine[]
	total: number
}

export { WineInfo, Wine };