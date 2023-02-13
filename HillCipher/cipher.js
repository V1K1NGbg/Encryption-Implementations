const { Matrix, inverse } = require("ml-matrix");

const prompt = require("prompt-sync")();

function convln(letter) {
    if (letter.charCodeAt(0) > 96) {
        return letter.charCodeAt(0) - 70;
    } else if (letter.charCodeAt(0) > 64) {
        return letter.charCodeAt(0) - 64;
    } else {
        return 0;
    }

}

function convnl(num) {
    if (num > 26) {
        return String.fromCharCode(num + 70);
    } else if (num > 0) {
        return String.fromCharCode(num + 64);
    } else {
        return " ";
    }
}

function splitfromstring(str, num) {
    let result = [];
    if (str.length % 2 != 0) {
        str = str + " ";
    }
    for (let i = 0; i < str.length; i = i + num) {
        let val = str.substr(i, num).split("");
        val = new Matrix([[convln(val[0])], [convln(val[1])]]);
        result.push(val);
    }
    return result;
}

function encrypt(e, splitamount, k) {
    e = splitfromstring(e, splitamount);
    let result = [];
    for (let i = 0; i < e.length; i++) {
        e[i] = Matrix.mod(k.mmul(e[i]), numofc);
        result.push(convnl(e[i].get(0, 0)));
        result.push(convnl(e[i].get(1, 0)));
    }
    result = result.join("");
    return result;
}

function modinverse(a, m)
{
    if (a <= 0) {
        console.error("error when calculating the inverse");
    }
    for(let x = 1; true; x++)
        if ((a*x)%m == 1) {
            return x
        }
}

const numofc = 26


let key = prompt("Encrypted key (a,b,c,d): ")

key = key.split(",").map(Number);

key = new Matrix([
    [key[0], key[1]],
    [key[2], key[3]],
]);

inversekey = new Matrix([
    [key.get(1,1), -key.get(0,1)],
    [-key.get(1,0), key.get(0,0)],
]);

inversekey = Matrix.mul(inversekey, modinverse(((inversekey.get(0,0)*inversekey.get(1,1)) - (inversekey.get(0,1)*inversekey.get(1,0))),numofc))


for (let i = 0; i < inversekey.rows; i++) {
    for (let j = 0; j < inversekey.columns; j++) {
        if (inversekey.get(i, j) < 0) {
            inversekey.set(i, j, inversekey.get(i, j)+numofc)
        }
    }
}
let text = prompt("Encrypted message: ")

enctext = encrypt(text, 2, key);

console.log(enctext);

dectext = encrypt(enctext, 2, inversekey);

console.log(dectext);