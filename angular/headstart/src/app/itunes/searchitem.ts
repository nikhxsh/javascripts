class SearchItem {
    constructor(
        public trackId: string, 
        public trackName: string,        
        public artistId: string,
        public artworkUrl100: string,
        public artistName: string,
        public collectionId: string,
        public collectionName: string,
        public collectionViewUrl: string,
        public country: string) {
    }
}

class Artist {
    constructor(       
        public artistId: string,
        public artistLinkUrl: string,
        public artistName: string,
        public primaryGenreName: string) {
    }
}

class Track {
    constructor(       
        public artistId: string,
        public trackId: string, 
        public trackName: string, 
        public artworkUrl60: string,
        public trackViewUrl: string,
        public releaseDate: string) {
    }
}

class Album {
    constructor(      
        public artistId: string,
        public artworkUrl60: string,
        public collectionName: string,
        public collectionViewUrl: string,
        public releaseDate: string) {
    }
}

export { SearchItem, Artist, Album, Track }