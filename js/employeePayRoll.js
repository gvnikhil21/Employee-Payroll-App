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
        createEmployeePayRoll();
    } catch (error) {
        return;
    }
};

const createEmployeePayRoll = () => {
    let employeePayRollData = new EmployeePayRollData();
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
    employeePayRollData.startDate = new Date(year, month, day);
    alert(employeePayRollData.toString());
};

const getInputValueById = (id) => {
    return document.querySelector(id).value;
};

const setTextValue = (property, message) => {
    let textError = document.querySelector(property);
    textError.textContent = message;
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


