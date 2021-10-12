const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0
    }

    // Calculate hash
    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Mine block with difficulty
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log('Block mined '+this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2
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
        newBlock.mineBlock(this.difficulty)
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
console.log('Mining block 1....');
simpleBlock.addBlock(new Block(1, '2021/10/09', { amount: 1}));
console.log('Mining block 2....');
simpleBlock.addBlock(new Block(2, '2021/10/10', { amount: 2}));

// console.log(JSON.stringify(simpleBlock, null, 4));
// console.log('Is blockchain valid: '+simpleBlock.isChainValid());

// Tampered with block
// simpleBlock.chain[1].data = {amount: 100}
// simpleBlock.chain[1].hash = simpleBlock.chain[1].calculateHash()

// console.log(JSON.stringify(simpleBlock, null, 4));
// console.log('Is blockchain valid: '+simpleBlock.isChainValid());