import { useNavigate } from 'react-router-dom';

function CourseItem({ course, handleDeleteCourse }) {
    const navigate = useNavigate();

    const onEditClickHandler = () => {
        navigate(`/courses/edit/${course.courseId}`)
    }

    const onDeleteClickHandler = () => {    
        handleDeleteCourse(course.courseId);
      };

    return (
        <tr>
            <td>
                <span onClick={onEditClickHandler}>
                    <i className='fa-solid fa-pencil edit'></i>
                </span>
            </td>
            <td>{course.courseNr}</td>
            <td>{course.title}</td>
            <td>{course.duration}</td>
            <td>{course.subject.name}</td>
            <td>{course.teacher.teacherName}</td>
            <td>
                <span onClick={onDeleteClickHandler}>
                    <i className='fa-solid fa-trash-can delete'></i>
                </span>
            </td>
        </tr>
    );
}