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
                    <div className="buttons">
                        <button className="btn">Se kurser</button>
                    </div>
                </span>
            </td>
        </tr>
    )
}

export default SubjectListItem;