import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CourseItem from './CourseItem';

function CoursesBySubject() {
    const params = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses(params.subjectName);
    }, [params.subjectName])

    const loadCourses = async (subjectName) => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/bysubject/${subjectName}`;
        const response = await fetch(url, {
            method: 'GET'
        })
        if (!response.ok) {
            console.log('Hittade inga kurser eller så gick nått tokigt')
        } else {
            setCourses(await response.json())
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Kurstitel</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <CourseItem
                        course={course}
                        key={course.courseId}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default CoursesBySubject;