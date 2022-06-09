import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetails() {
    const params = useParams();
    const [courseNr, setCourseNr] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        loadCourse(params.id);
    }, [params.id])

    const loadCourse = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/${id}`;
        const response = await fetch(url, {
            method: 'GET'
        })
        if (!response.ok) {
            console.log('Hittade inga kurser eller så gick nått tokigt')
        } else {
            const course = await response.json()
            setCourseNr(course.courseNr);
            setTitle(course.title);
            setDuration(course.duration);
            setDescription(course.description);
            setDetails(course.details);
            setSubjectName(course.subject.name);
            setTeacherName(course.teacher.teacherName);
        }
    }

    return (
        <>
            <ul>
                <li>Kursnummer: {courseNr}</li>
                <li>Titel: {title}</li>
                <li>Längd: {duration}</li>
                <li>Kategori: {subjectName}</li>
                <li>Lärare: {teacherName}</li>
            </ul>
            <h4>Beskrivning</h4>
            <p>{description}</p>
            <h4>Detaljer</h4>
            <p>{details}</p>
        </>
    )
}

export default CourseDetails;