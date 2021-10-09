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
        this.chain.push(newBlock);
    }

    // Validate block
    // If current block hash not equal to calculate hash
    // If curreent block previous hash not equla to previous hash block
    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i-1]

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if(currentBlock.prevHash !== prevBlock.hash) {
                return false
            }
        }

        return true
    }
}

let simpleBlock = new Blockchain();
simpleBlock.addBlock(new Block(1, '2021/10/09', { amount: 1}));
simpleBlock.addBlock(new Block(2, '2021/10/10', { amount: 2}));

console.log('Is blockchain valid: '+simpleBlock.isChainValid());

// Tampered with block
simpleBlock.chain[1].data = {amount: 100}
simpleBlock.chain[1].hash = simpleBlock.chain[1].calculateHash()

console.log('Is blockchain valid: '+simpleBlock.isChainValid());

// console.log(JSON.stringify(simpleBlock, null, 4));