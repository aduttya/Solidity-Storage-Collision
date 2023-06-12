const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('Soldity slots',() =>{

    let lock,signer;

    it("deployments",async ()=>{

        const Lock = await ethers.getContractFactory('Lock');
        lock = await Lock.deploy();
        await lock.deployed();

        signer = await ethers.getSigner();

        console.log("Contract : ",lock.address)
        console.log("Signer : ", await signer.getAddress())
    })

    // it('Storing data and getting slot',async()=>{

    //     await lock.set("ajay yadav darshan nagar ayodhya up");
    //     // console.log(await lock._owners(5));
    //     let value = await lock.getDataFromSlotDirectlyUintType(1);
    //     console.log(value)

    //     /**get the value of the slot by hashing the slot in the solidity */
    //     let slot = ethers.utils.keccak256(ethers.utils.hexZeroPad(1,32))
    //     value = await lock.getDataFromSlotDirectly(slot)
    //     console.log("slot : ",value)
    //     console.log(ethers.utils.toUtf8String(value));

    //     let nextslot = ethers.BigNumber.from(slot);

    //     nextslot = nextslot.add(1)
    //     nextslot = nextslot.toHexString()
    //     console.log(nextslot)
    //     value = await lock.getDataFromSlotDirectly(nextslot)
    //     console.log(value)
    //     console.log(ethers.utils.toUtf8String(value));




    //     // slot = ethers.utils
    //     // console.log(await lock.getValue(
    //     //     await signer.getAddress(),0,
    //     //     {
    //     //         gasLimit : 50000
    //     //     }
    //     // ))


    // })

    it('storing data and getting slots [mapping]', async () =>{

        const blockNum = await ethers.provider.getBlockNumber();

        // get the block
        const block = await ethers.provider.getBlock(blockNum);

        // get timestamp of the block
        const timestamp = block.timestamp;
        
        /**address => string */
        await lock.set(
            await signer.getAddress(),
            12,
            timestamp,
            "ajay","client","India","IST"
        )

        /**get the slot */
        let slot = await lock.getslotForMapping(
            await signer.getAddress(),
            0
        )

        // slot = await lock.getDataFromSlotDirectlyUintType(1)

        console.log("slot : ",slot)
        console.log(await lock.getDataFromSlotDirectly(slot))
        slot = await lock.getNextSlot(slot)
        console.log(await lock.getDataFromSlotDirectly(slot))

        slot = await lock.getNextSlot(slot)
        console.log(ethers.utils.toUtf8String(await lock.getDataFromSlotDirectly(slot)))
        slot = await lock.getNextSlot(slot)
        console.log(ethers.utils.toUtf8String(await lock.getDataFromSlotDirectly(slot)))
        slot = await lock.getNextSlot(slot)
        console.log(ethers.utils.toUtf8String(await lock.getDataFromSlotDirectly(slot)))
        slot = await lock.getNextSlot(slot)
        console.log(ethers.utils.toUtf8String(await lock.getDataFromSlotDirectly(slot)))
        


        // for(let i = 0; i < 4; ++i){
        //     let value = await lock.getDataFromSlotDirectly(slot)
        //     console.log(value)
        //     console.log(ethers.utils.toUtf8String(value));
    
        //     slot = await lock.getNextSlot(slot)
        // }
        // // let realSlot = ethers.utils.keccak256(slot)
        // let value = await lock.getDataFromSlotDirectly(slot)
        // console.log(value)
        // console.log(ethers.utils.toUtf8String(value));

        // let nextslot = ethers.BigNumber.from(slot);

        // nextslot = nextslot.add(1)
        // nextslot = nextslot.toHexString()
        // console.log("Slot : ",nextslot)
        // console.log("slot calculated by smart contract : ",await lock.getNextSlot(slot));
        // value = await lock.getDataFromSlotDirectly(nextslot)
        // console.log(value)
        // console.log(ethers.utils.toUtf8String(value));



        /**query the value from the slot */
    })

})