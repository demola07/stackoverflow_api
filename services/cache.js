const mongoose = require('mongoose')
const util = require('util')
const redis = require('redis')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get)

// override original mongoose exec function, with ours to use caching
const exec = mongoose.Query.prototype.exec;

// conditionally use caching
mongoose.Query.prototype.cache = function () {
    this.useCache = true
    return this;
}

// create custom exec function to utilize caching
mongoose.Query.prototype.exec = async function () {
    if (this.useCache === false) {
        console.log('cache reached')
        return exec.apply(this, arguments)
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cacheValue = await client.get(key)

    if (cacheValue) {
        console.log('Using Redis Cache')
        const doc = JSON.parse(cacheValue)

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    } else {
        console.log("using mongodb database")
        const result = await exec.apply(this, arguments)
        client.set(key, JSON.stringify(result), 'EX', 10)

        return result
    }
}
