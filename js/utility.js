const getDateInFormat = (startDate) => {
    let date = new Date(startDate);
    const options = {
        year: 'numeric', month: 'short', day: 'numeric'
    };
    const empDate = date == undefined ? "undefined" : date.toLocaleDateString("en-IN", options);
    return empDate;
};