window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td><img class="profile" src="../assets/profile-images/Ellipse -2.png" alt=""></td>
                <td>Edogawa Conan</td>
                <td>Male</td>
                <td>
                    <div class="dept-label">HR</div>
                    <div class="dept-label">Finance</div>
                </td>
                <td>3000000</td>
                <td>1 Nov 2020</td>
                <td>
                    <img id="1" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img id="1" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
                </td>
            </tr>
            `;
    document.querySelector('#table-display').innerHTML = innerHtml;
};