import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubjectItem from './SubjectItem';

function SubjectList() {
    const navigate = useNavigate();

    const onAddNewClickHandler = () => {
        navigate('/subjects/add');
    }

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadSubjects();
    }, [])

    const loadSubjects = async () => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects/list`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Hittade inga kategorier eller så gick nått tokigt')
        } else {
            setSubjects(await response.json())
        }
    }

    const deleteSubject = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Kategorin borttagen');
            loadSubjects();
          } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
          }
    }

    return (
        <>
            <div className="buttons">
                <button type="submit" className='btn' onClick={onAddNewClickHandler}>Lägg till ny kategori</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Kategori</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <SubjectItem
                            subject={subject}
                            key={subject.subjectId}
                            handleDeleteSubject={deleteSubject}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default SubjectList;