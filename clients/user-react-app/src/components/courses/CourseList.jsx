import { useEffect, useState } from 'react';

import CourseItem from './CourseItem';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, [])

    const loadCourses = async () => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/list`;
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

export default CourseList;