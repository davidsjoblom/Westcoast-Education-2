import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseItem from './CourseItem';

function CourseList() {
    const navigate = useNavigate();

    const onAddNewClickHandler = () => {
        navigate('/courses/add');
    }

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

    const deleteVehicle = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Kursen borttagen');
            loadCourses();
          } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
          }
    }

    return (
        <>
            <div className="buttons" onClick={onAddNewClickHandler}>
                <button type="submit" className='btn'>Lägg till ny kurs</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Kursnummer</th>
                        <th>Kurstitel</th>
                        <th>Längd</th>
                        <th>Kategori</th>
                        <th>Lärare</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <CourseItem
                            course={course}
                            key={course.courseId}
                            handleDeleteCourse={deleteVehicle}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default CourseList;