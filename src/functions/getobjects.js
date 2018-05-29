"use strict";

/**
 * gets instance of the cosmicjs api
 * @private
 * @return {object} cosmicApi
 */
const cosmic  = require("cosmicjs")(); //

// TO DO : MOVE TO CONFIG
const _slug = { name : "duas-americas-backend-content"};

/**
 * gets bucket from cosmicjs
 * @private
 * @return {object} bucket
 */
const _bucket  = () => {
    return cosmic.bucket({slug: _slug.name});
};
/**
 * creates the response and calls back
 * @private
 * @constructor
 * @param {list} apiResponse - A list of objects
 * @return {object} res = http response
 */
const _fmt = (apiResponse) => {
    console.log(apiResponse.objects[3]);
    // TO DO: create formatters for each object
    return {
        statusCode: 200,
        body: apiResponse.objects[3]
    };
};


/**
 * creates the response and calls back
 * @private
 * @constructor
 * @return {object} fmt - http resp
 */
const _process = function() {
    _bucket()
        .getObjects()
        .then(_fmt)
        .catch(console.log);
};

/*
 * parses the api response and gives the user a reply.
 * @public
 * @constructor
 * @param {object} evt - an aws event
 * @param {object} ctx aws event context
 * @param {function} cb
 * @returns {Promise}
 */
exports.handler = (evt,ctx,cb) => {
    cb(null,_process());
};

_process();