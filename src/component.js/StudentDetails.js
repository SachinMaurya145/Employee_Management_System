import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function StudentDetails() {
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students'));
    return savedStudents || [
      { id: 1, name: 'Ram', email: 'ram@gmail.com', age: '24', address: 'Noida' },
      { id: 2, name: 'Jack', email: 'jack@gmail.com', age: '25', address: 'Delhi' },
    ];
  });
  const [newStudent, setNewStudent] = useState({ name: '', email: '', age: '', address: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const handleShow = () => setShow(true);

  const handleAddNewStudent = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    setNewStudent({ name: '', email: '', age: '', address: '' });
    handleShow();
  };

  const handleAddStudent = () => {
    const { name, email, age, address } = newStudent;
  
    if (name.trim() === '' && email.trim() === '' && age.trim() === '' && address.trim() === '') {
    } else {
      let updatedStudents;
      if (isEditing) {
        updatedStudents = students.map((student) =>
          student.id === selectedStudent.id ? { ...newStudent, id: selectedStudent.id } : student
        );
      } else {
        const newStudentWithId = { ...newStudent, id: Date.now() };
        updatedStudents = [...students, newStudentWithId];
      }
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setNewStudent({ name: '', email: '', age: '', address: '' });
      handleClose();
    }
  };
  
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setNewStudent(student);
    setIsEditing(true);
    handleShow();
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="container">
      <h2 className="mt-4"> Employee Management System </h2>
      <div className="col-sm-3 mt-3 mb-4 text-gred">
        <Button variant="primary" onClick={handleAddNewStudent}>
          Add New Student
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>R.NO</th>
              <th>Student Name</th>
              <th>Email ID</th>
              <th>Age</th>
              <th>Address</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.address}</td>
                <td>
                  <a href="#" className="edit" title="Edit" data-toggle="tooltip" style={{ marginRight: '10px' }} onClick={() => handleEditStudent(student)}>
                    Edit
                  </a>
                  <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }} onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="model_box">
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Student" : "Add Student"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Age"
                  value={newStudent.age}
                  onChange={(e) => {
                    const age = parseInt(e.target.value);
                    if (!isNaN(age) && age >= 0) {
                      setNewStudent({ ...newStudent, age: age.toString() });
                    }
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                />
              </div>
              <button type="button" className="btn btn-success mt-4" onClick={handleAddStudent}>
                {isEditing ? "Save Changes" : "Add"}
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default StudentDetails;
