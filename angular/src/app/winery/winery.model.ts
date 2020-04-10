
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
	total: number
}

enum Type {
	Red,
	White,
	Rose,
	Champagne,
	Dessert,
	Sparkling,
	Blush
}

export { WineInfo, Wine, Type };