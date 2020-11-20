let isUpdate = false;
let employeePayRollObj = {};
window.addEventListener("DOMContentLoaded", () => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error', '');
            return;
        }
        try {
            (new EmployeePayRollData()).name = name.value;
            setTextValue('.text-error', '');
        } catch (error) {
            setTextValue('.text-error', error);
        }
    });

    const salary = document.querySelector('#salary');
    salary.addEventListener('input', function () {
        setTextValue('#salaryOutput', salary.value);
    });

    const date = document.querySelector('.date-setter');
    date.addEventListener('input', function () {
        const startDate = new Date(getInputValueById('#year'), getInputValueById('#month') - 1, getInputValueById('#day'));
        try {
            (new EmployeePayRollData()).startDate = startDate;
            setTextValue('.date-error', "");
        } catch (error) {
            setTextValue('.date-error', error);
        }
    });

    checkForUpdate();
});

const checkForUpdate = () => {
    const employeePayRollJson = localStorage.getItem('editEmp');
    console.log(employeePayRollJson);
    isUpdate = employeePayRollJson ? true : false;
    console.log(isUpdate);
    if (!isUpdate) return;
    employeePayRollObj = JSON.parse(employeePayRollJson);
    console.log(employeePayRollObj);
    setForm();
};

const setForm = () => {
    setValue('#name', employeePayRollObj._name);
    setSelectedValues('[name=profile]', employeePayRollObj._image);
    setSelectedValues('[name=gender]', employeePayRollObj._gender);
    setSelectedValues('.checkbox', employeePayRollObj._department)
    setValue('#salary', employeePayRollObj._salary);
    setTextValue('#salaryOutput', employeePayRollObj._salary);
    setValue('#notes', employeePayRollObj._notes);
    let date = new Date(employeePayRollObj._startDate);
    console.log(new Date(employeePayRollObj._startDate));
    console.log(date.getDate());
    setValue('#day', date.getDate());
    setValue('#month', date.getMonth()+1);
    console.log(date.getMonth());
    setValue('#year', date.getFullYear());
};

const setSelectedValues = (property, value) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value))
                item.checked = true;
        }
        else if (item.value === value)
            item.checked = true;
    });
};

const save = () => {
    try {
        let employeePayRollData = createEmployeePayRoll();
        createAndUpdateStorage(employeePayRollData);
    } catch (error) {
        return;
    }
};

const createEmployeePayRoll = () => {
    let employeePayRollData = new EmployeePayRollData();
    employeePayRollData.id = createNewEmployeeId();
    try {
        employeePayRollData.name = getInputValueById('#name');
    } catch (error) {
        setTextValue('.text-error', error);
        throw error;
    }
    employeePayRollData.image = getSelectedValues('[name=profile]').pop();
    employeePayRollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayRollData.department = getSelectedValues('.checkbox');
    employeePayRollData.salary = getInputValueById('#salary');
    employeePayRollData.notes = getInputValueById('#notes');
    let day = getInputValueById('#day');
    let month = getInputValueById('#month');
    let year = getInputValueById('#year');
    employeePayRollData.startDate = new Date(year, month - 1, day);
    alert(employeePayRollData.toString());
    return employeePayRollData;
};

const createAndUpdateStorage = (employeePayRollData) => {
    let employeePayRollList = JSON.parse(localStorage.getItem("EmployeePayRollList"));
    if (employeePayRollList != undefined)
        employeePayRollList.push(employeePayRollData);
    else
        employeePayRollList = [employeePayRollData];
    alert(employeePayRollList.toString());
    localStorage.setItem("EmployeePayRollList", JSON.stringify(employeePayRollList));
};

const getInputValueById = (id) => {
    return document.querySelector(id).value;
};

const getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    let setItems = new Array();
    allItems.forEach(item => {
        if (item.checked)
            setItems.push(item.value);
    });
    return setItems;
};

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('.checkbox');
    setValue('#salary', '');
    setTextValue('#salaryOutput', getInputValueById('#salary'));
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
}

const unsetSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => item.checked = false);
};

const setTextValue = (property, message) => {
    document.querySelector(property).textContent = message;
};

const setValue = (property, value) => {
    document.querySelector(property).value = value;
};

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
};