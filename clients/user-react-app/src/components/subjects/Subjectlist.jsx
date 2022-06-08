import { useEffect, useState } from 'react';

import SubjectListItem from './SubjectListItem';

function SubjectList() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects/list`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            console.log('Nått gick fel när kategorierna skulle hämtas');
        } else {
            setSubjects(await response.json());
        }
    }

    return (
        <>
            <h1 className="page-titel">Välj en kategori</h1>
            <table>
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <SubjectListItem
                            subject={subject}
                            key={subject.subjectId}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SubjectList;