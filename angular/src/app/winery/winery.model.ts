
interface Wine {
	id: string,
	name: string,
	wineryId: string,
	color: Type,
	vintage: string,
	price: number,
	issueDate: string,
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