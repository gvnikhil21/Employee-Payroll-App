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
    isUpdate = employeePayRollJson ? true : false;
    if (!isUpdate) return;
    employeePayRollObj = JSON.parse(employeePayRollJson);
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
    setValue('#day', date.getDate());
    setValue('#month', date.getMonth() + 1);
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

const save = (event) => {
   event.preventDefault();
   event.stopPropagation();
    try {
        setEmployeePayRollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("../pages/home.html");
    } catch (error) {
        return;
    }
};

const setEmployeePayRollObject = () => {
    employeePayRollObj._name = getInputValueById('#name');
    employeePayRollObj._image = getSelectedValues('[name=profile]').pop();
    employeePayRollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayRollObj._department = getSelectedValues('.checkbox');
    employeePayRollObj._salary = getInputValueById('#salary');
    employeePayRollObj._notes = getInputValueById('#notes');
    let day = getInputValueById('#day');
    let month = getInputValueById('#month');
    let year = getInputValueById('#year');
    employeePayRollObj._startDate = new Date(year, month - 1, day);
};

const createAndUpdateStorage = () => {
    let employeePayRollList = JSON.parse(localStorage.getItem("EmployeePayRollList"));
    if (employeePayRollList) {
        let employeePayRollData = employeePayRollList.find(empData => empData._id == employeePayRollObj._id);
        if (!employeePayRollData)
            employeePayRollList.push(createEmployeePayRollData());
        else {
            const index = employeePayRollList.map(empData => empData._id).indexOf(employeePayRollData._id);
            employeePayRollList.splice(index, 1, createEmployeePayRollData(employeePayRollData._id));
        }
    }
    else
        employeePayRollList = [createEmployeePayRollData()];
    localStorage.setItem("EmployeePayRollList", JSON.stringify(employeePayRollList));
};

const createEmployeePayRollData = (id) => {
    let employeePayRollData = new EmployeePayRollData();
    if (!id) employeePayRollData.id = createNewEmployeeId();
    else employeePayRollData.id = id;
    setEmployeePayRollData(employeePayRollData);
    return employeePayRollData;
};

const setEmployeePayRollData = (employeePayRollData) => {
    try {
        employeePayRollData.name = employeePayRollObj._name;
    } catch (error) {
        setTextValue('.text-error', error);
        throw error;
    }
    employeePayRollData.image = employeePayRollObj._image;
    employeePayRollData.gender = employeePayRollObj._gender;
    employeePayRollData.department = employeePayRollObj._department;
    employeePayRollData.salary = employeePayRollObj._salary;
    employeePayRollData.notes = employeePayRollObj._notes;
    try {
        employeePayRollData.startDate = new Date(employeePayRollObj._startDate);
    } catch (error) {
        setTextValue('.date-error', error);
        throw error;
    }
    alert(employeePayRollData.toString());
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