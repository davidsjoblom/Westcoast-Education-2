import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditCourse() {
    const navigate = useNavigate();

    const params = useParams();
    const [courseId, setCourseId] = useState('');
    const [courseNr, setCourseNr] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [teacherName, setTeacherName] = useState('');

    const onHandleCourseNrChanged = (e) => {
        setCourseNr(e.target.value);
    };
    const onHandleTitleChanged = (e) => {
        setTitle(e.target.value);
    };
    const onHandleDurationChanged = (e) => {
        setDuration(e.target.value);
    };
    const onHandleDescriptionChanged = (e) => {
        setDescription(e.target.value);
    };
    const onHandleDetailsChanged = (e) => {
        setDetails(e.target.value);
    };
    const onHandleSubjectNameChanged = (e) => {
        setSubjectName(e.target.value);
    };
    const onHandleTeacherNameChanged = (e) => {
        setTeacherName(e.target.value);
    };

    useEffect(() => {
        fetchCourse(params.id)
    }, [params.id]);

    const fetchCourse = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/${id}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log('Lyckades inte hämta kursen');
        }

        const course = await response.json();
        setCourseId(course.courseId);
        setCourseNr(course.courseNr);
        setDescription(course.description);
        setDetails(course.details);
        setDuration(course.duration);
        setSubjectName(course.subject.name);
        setTeacherName(course.teacher.teacherName)
        setTitle(course.title);
    }

    const handleUpdateCourse = (e) => {
        e.preventDefault();
        const course = {
            courseNr,
            title,
            duration,
            description,
            details,
            subjectName,
            teacherName,
        }
        updateCourse(course);
    }

    const updateCourse = async (course) => {
        const url = `${process.env.REACT_APP_BASEURL}/courses/${courseId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Kursen är uppdaterad');
            navigate('/courses');
        } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
        }
    };

    return (
        <>
            <h1 className="page-title">Uppdatera kurs</h1>
            <section className="form-container">
                <h4>Kursinfo</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleUpdateCourse}>
                        <div className="form-control">
                            <label htmlFor="courseNr">Kursnummer</label>
                            <input
                                onChange={onHandleCourseNrChanged}
                                value={courseNr}
                                type='number'
                                id='courseNr'
                                name='courseNr'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="title">Kurstitel</label>
                            <input
                                onChange={onHandleTitleChanged}
                                value={title}
                                type='text'
                                id='title'
                                name='title'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="duration">Längd</label>
                            <input
                                onChange={onHandleDurationChanged}
                                value={duration}
                                type='number'
                                id='duration'
                                name='duration'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Beskrivning</label>
                            <input
                                onChange={onHandleDescriptionChanged}
                                value={description}
                                type='text'
                                id='description'
                                name='description'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="details">Detaljer</label>
                            <input
                                onChange={onHandleDetailsChanged}
                                value={details}
                                type='text'
                                id='details'
                                name='details'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="subjectName">Ämne</label>
                            <input
                                onChange={onHandleSubjectNameChanged}
                                value={subjectName}
                                type='text'
                                id='subjectName'
                                name='subjectName'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="teacherName">Lärare</label>
                            <input
                                onChange={onHandleTeacherNameChanged}
                                value={teacherName}
                                type='text'
                                id='teacherName'
                                name='teacherName'
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn">
                                Spara
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}

export default EditCourse;