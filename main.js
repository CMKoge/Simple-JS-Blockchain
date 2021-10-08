const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    // Calculate hash
    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // Create genesis(first) block manually
    createGenesisBlock() {
        return new Block(0, '2021/10/08', 'Genesis block of simple js blockchain', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push[newBlock];
    }
}

let simpleBlock = new Blockchain();
simpleBlock.addBlock(new Block(1, '2021/10/09', { amount: 1}));
simpleBlock.addBlock(new Block(2, '2021/10/10', { amount: 2}));

console.log(JSON.stringify(simpleBlock, null, 4));