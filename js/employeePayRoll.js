{
    let salary = document.querySelector('#salary');
    let salaryOutput = document.querySelector('#salaryOutput');
    salary.addEventListener('input', function () {
        salaryOutput.textContent = salary.value;
    });
}

let regexName = RegExp('^[A-Z][a-z]{3,}$');
class EmployeePayRollData {
    // constructor
    constructor(...params) {
        this.name = params[0];
        this.image = params[1];
        this.gender = params[2];
        this.salary = params[3];
        this.department = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }
    get name() { return this._name; }
    set name(name) {
        if (regexName.test(name))
            this._name = name;
        else
            throw 'Name is Invalid!'
    }

    get image() { return this._image; }
    set image(image) { this._image = image; }

    get salary() { return this._salary; }
    set salary(salary) {
        if (salary > 0)
            this._salary = salary;
        else
            throw 'Salary is Invalid!'
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }

    get department() { return this._department; }
    set department(department) { this._department = department; }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        if (startDate <= new Date())
            this._startDate = startDate;
        else
            throw 'StartDate is Invalid!'
    }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }
    //methods
    toString() {
        const options = {
            year: 'numeric', month: 'long', day: 'numeric'
        };
        const empDate = this._startDate == undefined ? "undefined" : this.startDate.toLocaleDateString("en-IN", options);
        return "name = " + this.name + ", image = " + this.image + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", start-date = " + empDate + ", notes= " + this.notes;
    }
}

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
        employeePayRollData = new EmployeePayRollData(empName, empImage, empGender, empSalary, empDepartment, empStartDate, empNotes);
    }
    catch (error) {
        console.error(error);
    }
    console.log(employeePayRollData.toString());
}