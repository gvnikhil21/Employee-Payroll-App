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
            checkName(name.value);
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
        let startDate = null;
        if (getInputValueById("#year") == "" || getInputValueById("#month") == "" || getInputValueById("#day") == "")
            startDate = new Date(startDate);
        else
            startDate = getDateInFormat(new Date(getInputValueById('#year'), getInputValueById('#month') - 1, getInputValueById('#day')));
        try {
            checkStartDate(startDate);
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
    setValue('#name', employeePayRollObj.name);
    setSelectedValues('[name=profile]', employeePayRollObj.profilePic);
    setSelectedValues('[name=gender]', employeePayRollObj.gender);
    setSelectedValues('.checkbox', employeePayRollObj.departments)
    setValue('#salary', employeePayRollObj.salary);
    setTextValue('#salaryOutput', employeePayRollObj.salary);
    setValue('#notes', employeePayRollObj.note);
    let date = new Date(employeePayRollObj.startDate);
    if (date.getDate() < 10)
        setValue('#day', "0" + date.getDate());
    else
        setValue('#day', date.getDate());
    if (date.getMonth() + 1 < 10)
        setValue('#month', "0" + date.getMonth());
    else
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
        if (site_properties.local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }
        else
            createOrUpdateEmployeePayRoll();
    } catch (error) {
        return;
    }
};

const createOrUpdateEmployeePayRoll = () => {
    let postURL = site_properties.server_url + "add";
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postURL = site_properties.server_url + "update/" + employeePayRollObj.employeeId.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayRollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
};

const setEmployeePayRollObject = () => {
    employeePayRollObj.name = getInputValueById('#name');
    employeePayRollObj.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayRollObj.gender = getSelectedValues('[name=gender]').pop();
    employeePayRollObj.department = getSelectedValues('.checkbox');
    employeePayRollObj.salary = getInputValueById('#salary');
    employeePayRollObj.note = getInputValueById('#notes');
    let day = getInputValueById('#day');
    let month = getInputValueById('#month');
    let year = getInputValueById('#year');
    if (day == "" || month == "" || year == "")
        employeePayRollObj.startDate = null;
    else
        employeePayRollObj.startDate = day + " " + month + " " + year;
};

const createAndUpdateStorage = () => {
    let employeePayRollList = JSON.parse(localStorage.getItem("EmployeePayRollList"));
    if (employeePayRollList) {
        let employeePayRollData = employeePayRollList.find(empData => empData.id == employeePayRollObj.id);
        if (!employeePayRollData)
            employeePayRollList.push(employeePayRollObj);
        else {
            const index = employeePayRollList.map(empData => empData.id).indexOf(employeePayRollData.id);
            employeePayRollList.splice(index, 1, employeePayRollObj);
        }
    }
    else
        employeePayRollList = [employeePayRollObj];
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

function demo() {
    let day = getInputValueById('#day');
    let month = getInputValueById('#month');
    let year = getInputValueById('#year');
    let dateStart;
    if (day == "" || month == "" || year == "")
        dateStart = null;
    else
        dateStart = day + " " + month + " " + year;
    let empData = {
        "name": getInputValueById('#name'),
        "salary": getInputValueById('#salary'),
        "gender": getSelectedValues('[name=gender]').pop(),
        "startDate": dateStart,
        "note": getInputValueById('#notes'),
        "profilePic": getSelectedValues('[name=profile]').pop(),
        "department": getSelectedValues('.checkbox')
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/employeepayrollservice/add",
        data: JSON.stringify(empData),
        datatype: "json",
        success: function (response) {
            console.log("response: ", response);
        }
    });
}