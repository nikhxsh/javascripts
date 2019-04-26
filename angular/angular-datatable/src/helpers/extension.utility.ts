import { PagingRequest, SortOrder } from "../models/common.model";
import { WineInfo, Wine } from "../models/winery.model";

export function ProcessList(wines: Wine[], request: PagingRequest): WineInfo {
    let wineInfo = <WineInfo>{};

    if (request.token) {
        wines = wines.filter(x =>
            x.id.toString().includes(request.token) ||
            x.wine_full.includes(request.token) ||
            x.color.includes(request.token) ||
            x.region.includes(request.token) ||
            x.country.includes(request.token) ||
            x.vintage.toString().includes(request.token) ||
            `${x.top100_year.toString()}/${x.top100_rank.toString}`.includes(request.token) ||
            x.issue_date.toString().includes(request.token)
        )
    }

    if (request.filters.length > 0) {
        request.filters.forEach(f => {
            switch (f.column.toLowerCase()) {
                case 'id':
                    wines = wines.filter(x => x.id.toString().includes(f.token));
                    break;

                case 'name':
                    wines = wines.filter(x => x.wine_full.includes(f.token));
                    break;
            }
        });
    }

    if (request.sort.column !== '' && request.sort.order !== SortOrder.None) {
        if (request.sort.order === SortOrder.Asc) {
            switch (request.sort.column.toLowerCase()) {
                case 'id':
                    wines = wines.sort(function (left, right) {
                        if(left.id < right.id) return -1;
                        if(left.id > right.id) return 1;
                        return 0;
                    });
                    break;

                case 'name':
                    wines = wines.sort(function (left, right) {
                        if(left.wine_full < right.wine_full) return -1;
                        if(left.wine_full > right.wine_full) return 1;
                        return 0;
                    });
                    break;
            }
        }
        else if (request.sort.order === SortOrder.Desc) {
            switch (request.sort.column.toLowerCase()) {
                case 'id':
                    wines = wines.sort(function (left, right) {
                        if(left.id < right.id) return 1;
                        if(left.id > right.id) return -1;
                        return 0;
                    });
                    break;

                case 'name':
                    wines = wines.sort(function (left, right) {
                        if(left.wine_full < right.wine_full) return 1;
                        if(left.wine_full > right.wine_full) return -1;
                        return 0;
                    });
                    break;
            }
        }
    }

    wineInfo.total = wines.length;
    wineInfo.wines = wines.slice(request.skip, request.skip + request.take);
    return wineInfo;
}
