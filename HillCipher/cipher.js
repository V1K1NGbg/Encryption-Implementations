const { Matrix } = require("ml-matrix");

// const prompt = require("prompt-sync")();

function convln(letter) {
    return letter.charCodeAt(0) - 32;
}

function convnl(num) {
    return String.fromCharCode(num + 32);
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

function encrypt(e, splitamount, k, numofc) {
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

function modinverse(a, prime) {
    for (let x = 1; x < prime; x++) if ((a * x) % prime == 1) return x;

    return -1;
}

function inversek(k, numofc) {
    inversekey = new Matrix([
        [k.get(1, 1), -k.get(0, 1)],
        [-k.get(1, 0), k.get(0, 0)],
    ]);
    
    inversekey = Matrix.mul(
        inversekey,
        modinverse(
            inversekey.get(0, 0) * inversekey.get(1, 1) -
                inversekey.get(0, 1) * inversekey.get(1, 0),
            numofc
        )
    );
    
    inversekey = Matrix.mod(inversekey, numofc);
    
    for (let i = 0; i < inversekey.rows; i++) {
        for (let j = 0; j < inversekey.columns; j++) {
            if (inversekey.get(i, j) < 0) {
                inversekey.set(i, j, inversekey.get(i, j) + numofc);
            }
        }
    }
    return inversekey
}

module.exports = {encrypt, inversek}

// const numofc = 95;

// let key = prompt("Encrypted key (a,b,c,d): ");

// key = "3,3,2,5";

// key = key.split(",").map(Number);

// key = new Matrix([
//     [key[0], key[1]],
//     [key[2], key[3]],
// ]);

// inversekey = inversek(key)

// // let text = prompt("msg: ");

// // enctext = encrypt(text, 2, key);

// // console.log("enc: "+enctext);

// text = "sQkxP@nd9N"

// dectext = encrypt(text, 2, inversekey);

// console.log("dec: "+dectext);