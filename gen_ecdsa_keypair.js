const ECDSA = require('ecdsa-secp256r1');

const genAnother = (str) => {
    let o = JSON.parse(str);
    console.log(ECDSA.fromJWK(o).asPublic().toJWK())
}

const genPair = () => {
    const privateKey = ECDSA.generateKey()

    console.log(' ==== Private Key ====')
    console.log(privateKey.toJWK())
    console.log(' ==== Public Key ====')
    console.log(privateKey.asPublic().toJWK())
}


genPair();
