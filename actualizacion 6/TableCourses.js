import TableMembers from './TableMembers.js';

export default class TableCourses {
    constructor(tableCourses, tableMembers, IDCourseToShowItsMembers) {
        this._table = tableCourses;
        this._courses = new Array();
        this._tableMembers = new TableMembers(tableMembers, this);
        this._update(IDCourseToShowItsMembers);

        document.querySelector('#btnRegister').addEventListener('click', () => {
            this.addMember();
        })
    }

    _update(IDCourseToShowItsMembers) {

        for (let i = this._table.rows.length - 1; i > 1; i--) {
            this._table.deleteRow(i);
        }

        this._updateArrayCourses();

        this._courses.forEach((objCourse) => {
            this.addCourse(objCourse);
        });
        if (localStorage.getItem('courses') != null && this._courses.length > 0) {

            if (IDCourseToShowItsMembers === null) {

                this._tableMembers._update(this._courses[0].ID);
            } else {

                this._tableMembers._update(IDCourseToShowItsMembers);
            }
        }
    }

    _updateArrayCourses() {
        if (localStorage.getItem('courses') != null) {
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }
    }

    addCourse(objCourse) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objCourse.ID;
        cell = row.insertCell(1);
        cell.innerHTML = objCourse.name;
        cell = row.insertCell(2);
        cell.innerHTML = objCourse.stringStartDate;
        cell = row.insertCell(3);
        cell.innerHTML = objCourse.stringFinishDate;
        cell = row.insertCell(4);
        cell.innerHTML = objCourse.spaceAvailable;
        cell = row.insertCell(5);
        cell.innerHTML = objCourse.registeredMembers;
        cell = row.insertCell(6);
        cell.innerHTML = objCourse.duration;
        this._addBtnAddMemberAndBtnViewMembers(row, objCourse);
    }

    _addBtnAddMemberAndBtnViewMembers(row, course) {
        //buttons
        let btnAddMember = document.createElement("input");
        btnAddMember.type = "button";
        btnAddMember.value = 'Añadir Participante';
        btnAddMember.className = 'btn btn-success';
        btnAddMember.setAttribute('data-toggle', 'modal');
        btnAddMember.setAttribute('data-target', '#dialogo1');

        let btnViewMembers = document.createElement("input");
        btnViewMembers.type = "button";
        btnViewMembers.value = 'Ver participantes';
        btnViewMembers.className = 'btn btn-primary';

        let btnDeleteCourse = document.createElement("input");
        btnDeleteCourse.type = "button";
        btnDeleteCourse.value = 'Eliminar';
        btnDeleteCourse.className = 'btn btn-danger';


        btnAddMember.addEventListener('click', () => {
            localStorage.setItem('courseActive', course.ID);
        });

        btnViewMembers.addEventListener('click', () => {
            this._tableMembers._update(course.ID);
        });

        btnDeleteCourse.addEventListener('click', () => {
            this._deleteCourse(course.ID);
        });

        //Add to HTML
        row.insertCell(7);
        row.cells[7].appendChild(btnAddMember);
        row.insertCell(8);
        row.cells[8].appendChild(btnViewMembers);
        row.insertCell(9);
        row.cells[9].appendChild(btnDeleteCourse);


        this._tableMembers._update(course.ID);
    }

    _deleteCourse(ID) {
        this._updateArrayCourses();

        this._courses.forEach((objCourse, indexCourse) => {
            if (objCourse.ID === ID) {

                if (objCourse.registeredMembers === 0) {

                    this._courses.splice(indexCourse, 1);
                    localStorage.setItem('courses', JSON.stringify(this._courses));
                    this._update(null);
                    swal.fire({
                        type: 'success',
                        title: 'Taller eliminado',
                    })
                } else {
                    swal.fire({
                        type: 'warning',
                        title: 'Advertencia',
                        text: 'No es posible eliminar el taller debido ha que hay participantes incritos'
                    })
                }
                return;
            }
        });
    }

    addMember() {
        if (document.querySelector('#formMember').checkValidity()) {

            this._updateArrayCourses();

            let ID = Number(localStorage.getItem('courseActive'));

            if (this._isUniqueEmail(ID, document.querySelector('#email').value)) {

                if (this._isSpaceAvailable(ID)) {

                    let objMember = {
                        name: document.querySelector('#name').value,
                        email: document.querySelector('#email').value,
                        birthday: document.querySelector('#birthday').value
                    };


                    let course;
                    this._courses.forEach((objCourse) => {
                        if (objCourse.ID === ID) {
                            course = objCourse;
                        }
                    });


                    let arrayMembers = new Array();
                    arrayMembers = course.members;
                    arrayMembers.push(objMember);
                    course.members = arrayMembers;


                    course.registeredMembers++;


                    this._courses.forEach((objCourse) => {
                        if (objCourse.ID === course.ID) {
                            objCourse = course;
                            return;
                        }
                    });

                    localStorage.setItem('courses', JSON.stringify(this._courses));

                    //Alerts
                    this._update(null);
                    this._tableMembers._update(ID);
                } else {
                    swal.fire({
                        type: 'warning',
                        title: 'Advertencia!',
                        text: 'No existe suficiente espacio en este curso para registrar a una nueva persona'
                    })
                }
            } else {
                swal.fire({
                    type: 'warning',
                    title: 'Advertencia!',
                    text: 'Este email ya ha sido usado anteriormente en este curso, por favor elija otro'
                })
            }
        } else {
            swal.fire({
                type: 'warning',
                title: 'Advertencia!',
                text: 'Datos incompletos'
            })
        }
    }

    _isSpaceAvailable(IDcourse) {
        let isSpaceAvailable = false;
        this._courses.forEach((objCourse) => {
            if (Number(objCourse.ID) == IDcourse && objCourse.spaceAvailable > objCourse.registeredMembers) {
                isSpaceAvailable = true;
                return;
            }
        });
        return isSpaceAvailable;
    }

    _isUniqueEmail(IDcourse, email) {
        let isUniqueEmail = true;

        this._courses.forEach((objCourse) => {
            if (Number(objCourse.ID) == IDcourse) {

                objCourse.members.forEach((objMember) => {
                    if (objMember.email === email) {
                        isUniqueEmail = false;
                        return;
                    }
                });
                return;
            }
        });
        return isUniqueEmail;
    }
}