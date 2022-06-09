import { useNavigate } from 'react-router-dom';

function CourseItem({ course }) {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/courses/details/${course.courseId}`);
    };

    return (
        <tr>
            <td>{course.title}</td>
            <td>
                <div className="buttons">
                    <button className="btn" onClick={onClickHandler}>Se detaljer</button>
                </div>
            </td>
        </tr>
    )
}

export default CourseItem;