const prompt = require('prompt-sync')();

function splitstring(str, num) {
    let result = []
    if (str.length%2 != 0) {
        str.append(" ")
    }
    for (let i = 0; i < str.length; i = i + num) {
        result.push(str.substr(i, num))
    }
    return result
}


// let key = prompt("Encrypted key (a,b,c,d): ")

key = "2,3,5,7"

key = key.split(",")

// let enct = prompt("Encrypted message: ")

enct = "Hello There"

enct = splitstring(enct, 2)

console.log(enct);