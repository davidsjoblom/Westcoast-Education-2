import { useNavigate } from 'react-router-dom';

function SubjectListItem ({subject}) {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/courses/${subject.name}`);
    };
    
    return (
        <tr>
            <td>{subject.name}</td>
            <td>
                <span onClick={onClickHandler}>
                    <i className='fa-solid fa-graduation-cap'></i>
                </span>
            </td>
        </tr>
    )
}

export default SubjectListItem;