import { handleResponse, handleError } from '../utils/apiHelpers';

const baseurl = "http://localhost:3000";

async function ApiFetchMovies(filters, search) {
    try {
        const headers = {
            method: "GET"
        };

        let params = "";

        
        let filterQuery = [];

        filters.forEach(filter => {            
            filterQuery.push(`${filter.key}:${filter.value}`);
        });

        if(filterQuery.length > 0) {
            params = `?filter=${filterQuery.join(',')}`
        }
        
        if(search && search.value) {   
            if(params.length > 0) {
                params += `&search=${search.value}`
            }   
            else {
                params += `?search=${search.value}`
            }     
        }

        const response = await fetch(`${baseurl}/movies${params}`, headers);
        return handleResponse(response);

    } catch (error) {
        return handleError(error);
    }
}

async function ApiFetchGenre() {
    try {
        const headers = {
            method: "GET"
        };
        
        const response = await fetch(`${baseurl}/genre`, headers);
        return handleResponse(response);

    } catch (error) {
        return handleError(error);
    }
}

export { ApiFetchMovies, ApiFetchGenre }