window.addEventListener('DOMContentLoaded', () => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    let employeePayRollList = createEmployeePayRollJSON();
    for (const employeePayRollData of employeePayRollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td class="profile-image"><img class="profile" src="${employeePayRollData.image}" alt=""></td>
                <td>${employeePayRollData.name}</td>
                <td>${employeePayRollData.gender}</td>
                <td>${getDeptHtml(employeePayRollData.department)}</td>
                <td>${employeePayRollData.salary}</td>
                <td>${employeePayRollData.startDate}</td>
                <td>
                    <img name="${employeePayRollData.id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img name="${employeePayRollData.id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
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

const createEmployeePayRollJSON = () => {
    let employeePayRollListLocal = [
        {
            name: 'Edogava Conan',
            gender: 'Male',
            department: [
                'Engineering',
                'Sales'
            ],
            salary: '500000',
            startDate: '29 Oct 2019',
            note: '',
            id: 'new Date().getTime()',
            image: '../assets/profile-images/Ellipse -2.png'
        },
        {
            name: 'Light Yagami',
            gender: 'Male',
            department: [
                'HR',
                'Sales'
            ],
            salary: '450000',
            startDate: '29 May 2017',
            note: '',
            id: new Date().getTime() + 1,
            image: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return employeePayRollListLocal;
};