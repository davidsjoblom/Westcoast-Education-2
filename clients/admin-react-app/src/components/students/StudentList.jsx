import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StudentItem from './StudentItem';

function StudentList() {
    const navigate = useNavigate();

    const onAddNewClickHandler = () => {
        navigate('/students/add');
    }

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, [])

    const loadStudents = async () => {
        const url = `${process.env.REACT_APP_BASEURL}/students/list`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Hittade inga studenter eller så gick nått tokigt')
        } else {
            setStudents(await response.json())
        }
    }

    const deleteStudent = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/students/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Studenten borttagen');
            loadStudents();
          } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
          }
    }

    return (
        <>
            <div className="buttons">
                <button type="submit" className='btn' onClick={onAddNewClickHandler}>Lägg till ny student</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>StudentID</th>
                        <th>Namn</th>
                        <th>Email</th>
                        <th>Telefonnummer</th>
                        <th>Adress</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <StudentItem
                            student={student}
                            key={student.studentId}
                            handleDeleteStudent={deleteStudent}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default StudentList;