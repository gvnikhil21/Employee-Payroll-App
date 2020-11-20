window.addEventListener("DOMContentLoaded", () => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayRollData()).name = name.value;
            textError.textContent = "";
        } catch (error) {
            textError.textContent = error;
        }
    });

    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('#salaryOutput');
    salary.addEventListener('input', function () {
        salaryOutput.textContent = salary.value;
    });
});

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