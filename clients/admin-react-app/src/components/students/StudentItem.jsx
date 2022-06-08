import { useNavigate } from 'react-router-dom';

function StudentItem({ student, handleDeleteStudent }) {
    const navigate = useNavigate();

    const onEditClickHandler = () => {
        navigate(`/students/edit/${student.studentId}`)
    }

    const onDeleteClickHandler = () => {    
        handleDeleteStudent(student.studentId);
      };

    return (
        <tr>
            <td>
                <span onClick={onEditClickHandler}>
                    <i className='fa-solid fa-pencil edit'></i>
                </span>
            </td>
            <td>{student.studentId}</td>
            <td>{student.studentName}</td>
            <td>{student.email}</td>
            <td>{student.phoneNr}</td>
            <td>{student.address}</td>
            <td>
                <span onClick={onDeleteClickHandler}>
                    <i className='fa-solid fa-trash-can delete'></i>
                </span>
            </td>
        </tr>
    );
}

export default StudentItem;