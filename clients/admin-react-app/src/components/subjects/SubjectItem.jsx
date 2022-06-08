import { useNavigate } from 'react-router-dom';

function SubjectItem({ subject, handleDeleteSubject }) {
    const navigate = useNavigate();

    const onEditClickHandler = () => {
        navigate(`/subjects/edit/${subject.subjectId}`)
    }

    const onDeleteClickHandler = () => {    
        handleDeleteSubject(subject.subjectId);
      };

    return (
        <tr>
            <td>
                <span onClick={onEditClickHandler}>
                    <i className='fa-solid fa-pencil edit'></i>
                </span>
            </td>
            <td>{subject.subjectId}</td>
            <td>{subject.name}</td>
            <td>
                <span onClick={onDeleteClickHandler}>
                    <i className='fa-solid fa-trash-can delete'></i>
                </span>
            </td>
        </tr>
    );
}

export default SubjectItem;