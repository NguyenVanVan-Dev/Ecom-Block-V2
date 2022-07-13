const ManagerOgani = artifacts.require("ManagerOgani");

contract("ManagerOgani", (accounts)=>{
    let [owner, bob, alice] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await ManagerOgani.new();
    });
    // it("user payment a order", async () => {
    //     const result = await contractInstance.userPaymentOrder('sijdkasdgjasgdjashg32463245', {from: alice});
    //     console.log(result);
    //     assert.equal(result.receipt.status, true);
    // });
    // it("admin tranfer money to supplier for them products", async () => {
    //     const result = await contractInstance.transferToSupplier('sijdkasdgjasgdjashg32463245',bob, {from: alice});
    //     console.log(result);
    //     assert.equal(result.receipt.status, true);
    //     // assert.equal(result.logs[0].args.name,zombieNames[0]);
    // });
    // it("owner withdraw all from contract to bob ", async () => {
    //     const result = await contractInstance.withdrawAll(bob, {from: owner});
    //     console.log(result);
    //     assert.equal(result.receipt.status, true);
    // });
    // it("don't owner withdraw all from contract to bob ", async () => {
    //     const result = await contractInstance.withdrawAll(bob, {from: alice});
    //     console.log(result);
    //     assert.equal(result.receipt.status, true);
    //     // assert.equal(result.logs[0].args.name,zombieNames[0]);
    // });
    it("user get history payment order ", async () => {
        const result = await contractInstance.getAllOrderUser(bob, {from: owner});
        console.log(result);
        assert.equal(result.receipt.status, true);
    });
})