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

function save() {
    let empName = document.querySelector('#name').value;
    let imageArray = document.querySelectorAll('input[name="profile"]');
    let empImage;
    for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].checked) {
            empImage = imageArray[i].value;
            break;
        }
    }
    let genderArray = document.querySelectorAll('input[name="gender"]');
    let empGender;
    for (let i = 0; i < genderArray.length; i++) {
        if (genderArray[i].checked) {
            empGender = genderArray[i].value;
            break;
        }
    }
    empDepartmentArray = document.querySelectorAll('.checkbox:checked');
    let empDepartment = new Array();
    for (let i = 0; i < empDepartmentArray.length; i++) {
        if (empDepartmentArray[i].checked)
            empDepartment.push(empDepartmentArray[i].value);
    }
    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    let empStartDate = new Date(year, month, day);
    let empSalary = document.querySelector('#salary').value;
    let empNotes = document.querySelector('#notes').value;
    try {
        employeePayRollData = new EmployeePayRollData();
        employeePayRollData.name = empName;
        employeePayRollData.gender = empGender;
        employeePayRollData.salary = empSalary;
        employeePayRollData.department = empDepartment;
        employeePayRollData.image = empImage;
        employeePayRollData.startDate = empStartDate;
        employeePayRollData.notes = empNotes;
    }
    catch (error) {
        console.error(error);
    }
    console.log(employeePayRollData.toString());
}