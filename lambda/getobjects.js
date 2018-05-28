"use strict";

/**
 * gets instance of the cosmicjs api
 * @private
 * @return {object} cosmicApi
 */
const _cosmic  = require("cosmicjs")(); //

/**
 * gets bucket from cosmicjs
 * @private
 * @param {string} name - name of bucket slug
 * @return {object} bucket
 */
const _bucket  = (name) => {
    return _cosmic.bucket({slug: name});
};
/**
 * creates the response and calls back
 * @private
 * @constructor
 * @param {list} objects - A list of objects
 * @return {object} res = http response
 */
const _fmt = (objects) => {
    return {
        statusCode: 200,
        body: objects
    };
};


/**
 * creates the response and calls back
 * @private
 * @constructor
 * @return {object} fmt - http resp
 */
const _process = function() {
    _bucket("duas-americas-backend-content")
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
module.exports.handler = (evt,ctx,cb) => {
    _bucket
        .getObjects()
        .then(cb(_process))
        .catch(console.log)
};