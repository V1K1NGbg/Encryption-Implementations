const hillcipher = require("./cipher.js")
const {Matrix} = require("ml-matrix");
const prompt = require("prompt-sync")();
const numofchar = 95

key = "3,3,2,5";

key = key.split(",").map(Number);

key = new Matrix([
    [key[0], key[1]],
    [key[2], key[3]],
]);

text = prompt("msg: ");

enctext = hillcipher.encrypt(text, 2, key, numofchar);

console.log("enc: "+enctext);