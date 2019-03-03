let currentDate = new Date();

function getMonthString(date){
    return date.toLocaleString('en-us', {month: "long"});
}

module.exports = {
    getMonthString: (date) => getMonthString(date),
    getFirstSunday: (date) => {
        // Copy with first day of the year
        let clone = new Date(date.getFullYear(), date.getMonth(), 1);

        // Get the Sunday of the week (Sunday is the number 0)
        while(clone.getDay() !== 0){
            clone.setDate(clone.getDate() - 1);
        }

        return clone;
    },
    /**
     * Checks if the two dates are equal in terms of year, month, and date.
     * @param date1 First date to compare.
     * @param date2 Second date to compare.
     * @returns {boolean} True if two dates are equal, false otherwise
     */
    equalDates: (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    },
    betweenDates: (dateBetween, dateStart, dateEnd) => {
        return dateStart.getTime() < dateBetween.getTime() < dateEnd.getTime();
    },
    onlyDateAspect: (date) => {
        // only want to compare the date, month, and year aspect of the Date object
        date.setHours(0, 0,0, 0);
    },
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    stringRepresentation: (date) => `${getMonthString(date)} ${date.getDate()}, ${date.getFullYear()}`
};


