/**
 * All money should be stored as integer cents
 */
export default class Money{
    static formatCurrency(cents){
        let stringRep = cents.toString();
        // must have 2 figures after decimal (comma in this case since euro is formatted like that)
        if(stringRep.length < 3){
            stringRep = "0".repeat(3 - stringRep.length) + stringRep;
        }

        let output = "";
        // dollars and cents.
        // Do not divide by 100 or you will get floating point errors
        output += stringRep.substring(0, stringRep.length - 2) + "." + stringRep.substring(stringRep.length - 2);

        return "$" + output;
    }
}

module.exports = {
    formatCurrency: Money.formatCurrency,
};