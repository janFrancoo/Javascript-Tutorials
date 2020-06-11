const asyncHandler = require("express-async-handler");
const { searchHelper, populateHelper, sortHelper, paginationHelper } = require("./queryHelpers");

const questionQueryHelper = function(model, options) {
    return asyncHandler(async function(req, res, next) {
        let query = model.find();
        query = searchHelper("title", query, req);

        if (options && options.population) {
            query = populateHelper(query, options.population);
        }

        query = sortHelper(query, req);
        const total = await model.countDocuments();
        const paginationRes = await paginationHelper(total, query, req);
        query = paginationRes.query;
        const pagination = paginationRes.pagination;
        const queryRes = await query;
        res.queryResult = {
            success: true,
            count: queryRes.length,
            pagination: pagination,
            data: queryRes
            }
        next();
    })
}

const userQueryHelper = function(model, options) {
    return asyncHandler(async function (req, res, next) {
        let query = model.find();
        query = searchHelper("name", query, req);
        const paginationRes = await paginationHelper(model, query, req);
        query = paginationRes.query;
        const pagination = paginationRes.pagination;
        const queryRes = await query;
        res.queryResult = {
            success: true,
            count: queryRes.length,
            pagination: pagination,
            data: queryRes
            }

        next();
    })
}

const answerQueryHelper = function(model, options) {
    return asyncHandler(async function (req, res, next) {
        const { id } = req.params;
        const arrayName = "answers";
        const total = (await model.findById(id))["answerCount"];
        const paginationResult = await paginationHelper(total, undefined, req);
        const startIdx = paginationResult.startIdx;
        const limit = paginationResult.limit;

        let queryObject = {};
        queryObject[arrayName] = {$slice: [startIdx, limit]};

        let query = model.find({
            _id: id,
        }, queryObject);

        query = populateHelper(query, options.population);

        const queryResult = await query;
        res.queryResult = {
            success: true,
            pagination: paginationResult.pagination,
            data: queryResult
        };

        next();
    })
}

module.exports = {
    questionQueryHelper,
    userQueryHelper,
    answerQueryHelper
}