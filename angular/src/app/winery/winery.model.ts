
interface Wine {
	id: number,
	name: string,
	wineryId: string,
	color: Type,
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
	total: number,
	filteredTotal: number
}

enum Type {
	Blush,
	Champagne,
	Dessert,
	Red,
	Rose,
	Sparkling,
	White
}

export { WineInfo, Wine, Type };