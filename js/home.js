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
    if (employeePayRollList.length == 0)
        return;
    let innerHtml = `${headerHtml}`;
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
                    <img id="${employeePayRollData._id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img id="${employeePayRollData._id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
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

const getDateInFormat = (startDate) => {
    let date = new Date(startDate);
    const options = {
        year: 'numeric', month: 'short', day: 'numeric'
    };
    const empDate = date == undefined ? "undefined" : date.toLocaleDateString("en-IN", options);
    return empDate;
};