const getDateInFormat = (startDate) => {
    let date = new Date(startDate);
    const options = {
        year: 'numeric', month: 'short', day: 'numeric'
    };
    const empDate = date == undefined ? "undefined" : date.toLocaleDateString("en-IN", options);
    return empDate;
};

const checkName = (name) => {
    let regexName = RegExp('^[A-Z][A-Za-z ]{2,}$');
    if (!regexName.test(name)) throw 'Name is Invalid!';
};

const checkStartDate = (startDate) => {
    let now = new Date();
    let date = new Date(startDate);
    if (date > new Date())
        throw 'Start Date is a Future Date!';
    var diff = Math.abs(now.getTime() - date.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
        throw 'Start Date is beyond 30 Days of current Date!';
};