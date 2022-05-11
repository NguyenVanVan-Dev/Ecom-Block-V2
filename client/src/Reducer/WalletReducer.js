const initWallet = {
    wallet: ''
};


const SET_WALLET = "SET_WALLET";

const WalletReducer = (state, action) => {
    switch (action.type) {
        case SET_WALLET:
            
            return {
                ...state,
                wallet: action.payload
            }
    
        default:
            throw new Error('Invalid action');
    }

}
export { initWallet };
export default WalletReducer; 
