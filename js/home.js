let employeePayRollList;
window.addEventListener('DOMContentLoaded', () => {
    if (site_properties.local_storage.match("true")) {
        getEmployeePayRollDataFromStorage();
    }
    else
        getEmployeePayRollDataFromServer();
});

const processEmployeePayRollDataResponse = () => {
    document.querySelector('.emp-count').textContent = employeePayRollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
};

const getEmployeePayRollDataFromStorage = () => {
    employeePayRollList = localStorage.getItem('EmployeePayRollList') ?
        JSON.parse(localStorage.getItem('EmployeePayRollList')) : [];
    processEmployeePayRollDataResponse();
};

const getEmployeePayRollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayRollListJSON = JSON.parse(responseText);
            employeePayRollList = employeePayRollListJSON.data;
            processEmployeePayRollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
        });
};

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    if (employeePayRollList.length == 0) {
        document.querySelector('#table-display').innerHTML = innerHtml;
        return;
    }
    for (const employeePayRollData of employeePayRollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td class="profile-image"><img class="profile" src="${employeePayRollData.profilePic}" alt=""></td>
                <td>${employeePayRollData.name}</td>
                <td>${employeePayRollData.gender}</td>
                <td>${getDeptHtml(employeePayRollData.departments)}</td>
                <td>${employeePayRollData.salary}</td>
                <td>${getDateInFormat(employeePayRollData.startDate)}</td>
                <td>
                    <img id="${employeePayRollData.employeeId}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img id="${employeePayRollData.employeeId}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
                </td>
            </tr>
            `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList)
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    return deptHtml;
};

const remove = (node) => {
    let employeePayRollData = employeePayRollList.find(empData => empData.employeeId == node.id);
    if (!employeePayRollData) return;
    const index = employeePayRollList.map(empData => empData.employeeId).indexOf(employeePayRollData.employeeId);
    employeePayRollList.splice(index, 1);
    if (site_properties.local_storage.match("true")) {
        localStorage.setItem("EmployeePayRollList", JSON.stringify(employeePayRollList));
        createInnerHtml();
    }
    else {
        const deleteURL = site_properties.server_url + "delete/" + employeePayRollData.employeeId.toString();
        makeServiceCall("DELETE", deleteURL, true)
            .then(responseText => createInnerHtml())
            .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));
    }
    document.querySelector(".emp-count").textContent = employeePayRollList.length;

};

const update = (node) => {
    let employeePayRollData = employeePayRollList.find(empData => empData.employeeId == node.id);
    if (!employeePayRollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayRollData));
    window.location.replace(site_properties.payroll_page);
};