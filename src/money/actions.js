export const UPDATE_CURRENT_BALANCE = "UPDATE_CURRENT_BALANCE";

export function updateCurrentBalance(amount){
    return {
        type: UPDATE_CURRENT_BALANCE,
        amount: amount
    };
}
