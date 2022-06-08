import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TeacherItem from './TeacherItem';

function TeacherList() {
    const navigate = useNavigate();

    const onAddNewClickHandler = () => {
        navigate('/teachers/add');
    }

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        loadTeachers();
    }, [])

    const loadTeachers = async () => {
        const url = `${process.env.REACT_APP_BASEURL}/teachers/list`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Hittade inga lärare eller så gick nått tokigt')
        } else {
            setTeachers(await response.json())
        }
    }

    const deleteTeacher = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/teachers/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Läraren borttagen');
            loadTeachers();
          } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
          }
    }

    return (
        <>
            <div className="buttons">
                <button type="submit" className='btn' onClick={onAddNewClickHandler}>Lägg till ny lärare</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>LärarID</th>
                        <th>Namn</th>
                        <th>Email</th>
                        <th>Telefonnummer</th>
                        <th>Adress</th>
                        <th>Kompetenser</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <TeacherItem
                            teacher={teacher}
                            key={teacher.teacherId}
                            handleDeleteTeacher={deleteTeacher}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default TeacherList;