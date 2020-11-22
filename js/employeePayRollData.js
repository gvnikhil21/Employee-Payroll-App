let regexName = RegExp('^[A-Z][A-Za-z ]{2,}$');
class EmployeePayRollData {

    get id() { return this._id; }
    set id(id) { this._id = id; }

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
            throw 'StartDate is Invalid!';
    }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }
    //methods
    toString() {
        const empDate = getDateInFormat(this._startDate);
        return "id = " + this.id + ", name = " + this.name + ", image = " + this.image + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", start-date = " + empDate + ", notes= " + this.notes;
    }
}