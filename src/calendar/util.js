let currentDate = new Date();

function getMonthString(date){
    return date.toLocaleString('en-us', {month: "long"});
}

function getSunday(date){
    let clone = new Date(date);
    // Get the Sunday of the week (Sunday is the number 0)
    while(clone.getDay() !== 0){
        clone.setDate(clone.getDate() - 1);
    }
    return clone;
}

function equalDates(date1, date2){
    return (
        date1 !== undefined &&
        date2 !== undefined &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function getDateMonthYearAspect(date){
    // only want to compare the date, month, and year aspect of the Date object
    let copy = new Date(date);
    copy.setHours(0, 0,0, 0);
    return copy;
};

module.exports = {
    getMonthString: (date) => getMonthString(date),
    getFirstSunday: (date) => {
        // Copy with first day of the year
        let clone = new Date(date.getFullYear(), date.getMonth(), 1);
        return getSunday(clone);
    },
    getSunday: getSunday,
    /**
     * Checks if the two dates are equal in terms of year, month, and date.
     * @param date1 First date to compare.
     * @param date2 Second date to compare.
     * @returns {boolean} True if two dates are equal, false otherwise
     */
    equalDates: equalDates,
    /**
     * Checks if the date given is equal to the user's current date. Compares the year, month, and day of the month only.
     * @param date Date to be checked
     */
    isCurrentDate: (date) => {
        return equalDates(currentDate, date);
    },
    betweenDates: (dateBetween, dateStart, dateEnd) => {
        return dateStart.getTime() < dateBetween.getTime() < dateEnd.getTime();
    },
    getDateMonthYearAspect: getDateMonthYearAspect,
    daysUntil: (start, end) => {
        let copyStart = getDateMonthYearAspect(new Date(start));
        let copyEnd = getDateMonthYearAspect(new Date(end));
        if(copyStart.getTime() > copyEnd){
            throw new Error("start cannot be after the end");
        }
        let length = 0;
        while(!equalDates(copyStart, copyEnd)){
            length++;
            copyStart.setDate(copyStart.getDate() + 1);
        }
        return length;
    },
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    stringRepresentation: (date) => `${getMonthString(date)} ${date.getDate()}, ${date.getFullYear()}`
};


