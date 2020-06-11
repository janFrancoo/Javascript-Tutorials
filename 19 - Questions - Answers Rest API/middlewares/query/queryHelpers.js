const searchHelper = (searchKey, query, req) => {
    if (req.query.search) {
        const searchObj = {};
        const regex = new RegExp(req.query.search, "i");
        searchObj[searchKey] = regex;
        
        return query.where(searchObj);
    }

    return query;
}

const populateHelper = (query, population) => {
    return query.populate(population);
}

const sortHelper = (query, req) => {
    const sortKey = req.query.sortBy;
    if (sortKey === "most-answered") {
        return query.sort("-answerCount -createdAt");
    } else if (sortKey === "most-liked") {
        return query.sort("-likeCount -createdAt");
    } else {
        return query.sort("-createdAt");
    }
}

const paginationHelper = async (total, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    
    const pagination = {};
    if (startIdx > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIdx < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    
    return {
        query: query === undefined ? undefined : query.skip(startIdx).limit(limit),
        pagination: pagination,
        startIdx,
        limit
    }
}

module.exports = {
    searchHelper,
    populateHelper,
    sortHelper,
    paginationHelper
}