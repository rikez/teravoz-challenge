const { writeFile, readFile, mkdir, createWriteStream } = require('fs');

exports.writeFileAsync = function(path, data) {
    return new Promise((resolve, reject) => {
        writeFile(path, data, {encoding: 'utf8'}, (error) => {
            if(error) return reject(error);

            return resolve("ok");
        })
    })
}

exports.readFileAsync = function(path) {
    return new Promise((resolve, reject) => {
        readFile(path, {encoding: 'utf8'}, (error, data) => {
            if(error) return reject(error);
            return resolve(data);
        })
    })
}

exports.mkdirAsync = function(path) {
    return new Promise((resolve, reject) => {
        mkdir(path, (error) => {
            if(error) return reject(error);

            return resolve("ok");
        })
    })
}

exports.createWriteStreamAsync = async function(path) {
    await createWriteStream(path)
}