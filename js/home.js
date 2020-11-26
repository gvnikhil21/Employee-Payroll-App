let employeePayRollList;
window.addEventListener('DOMContentLoaded', () => {
    employeePayRollList = getEmployeePayRollDataFromStorage();
    document.querySelector('.emp-count').textContent = employeePayRollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayRollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayRollList') ?
        JSON.parse(localStorage.getItem('EmployeePayRollList')) : [];
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
                <td class="profile-image"><img class="profile" src="${employeePayRollData._image}" alt=""></td>
                <td>${employeePayRollData._name}</td>
                <td>${employeePayRollData._gender}</td>
                <td>${getDeptHtml(employeePayRollData._department)}</td>
                <td>${employeePayRollData._salary}</td>
                <td>${getDateInFormat(employeePayRollData._startDate)}</td>
                <td>
                    <img id="${employeePayRollData.id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img id="${employeePayRollData.id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
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
    let employeePayRollData = employeePayRollList.find(empData => empData.id == node.id);
    if (!employeePayRollData) return;
    const index = employeePayRollList.map(empData => empData.id).indexOf(employeePayRollData.id);
    employeePayRollList.splice(index, 1);
    localStorage.setItem("EmployeePayRollList", JSON.stringify(employeePayRollList));
    document.querySelector(".emp-count").textContent = employeePayRollList.length;
    createInnerHtml();
};

const update = (node) => {
    let employeePayRollData = employeePayRollList.find(empData => empData.id == node.id);
    if (!employeePayRollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayRollData));
    window.location.replace("../pages/employeePayRoll.html");
};