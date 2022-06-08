import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditSubject () {
    const navigate = useNavigate();

    const params = useParams();
    const [subjectId, setSubjectId] = useState('');
    const [name, setName] = useState('');

    const onHandleNameChanged = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        fetchSubject(params.id);
    }, [params.id]);

    const fetchSubject = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects/${id}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log('Lyckades inte hämta kategorin');
        }

        const subject = await response.json();
        setSubjectId(subject.subjectId);
        setName(subject.name);
    }

    const handleUpdateSubject = (e) => {
        e.preventDefault();
        const subject = {
            name,
        }
        updateSubject(subject);
    }

    const updateSubject = async (subject) => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects/${subjectId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subject),
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Kategorin är sparad');
            navigate('/subjects');
        } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
        }
    }

    return (
        <>
            <h1 className="page-title">Uppdatera kategori</h1>
            <section className="form-container">
                <h4>Info</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleUpdateSubject}>
                        <div className="form-control">
                            <label htmlFor="name">Kategori</label>
                            <input
                                onChange={onHandleNameChanged}
                                value={name}
                                type='text'
                                id='name'
                                name='name'
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

export default EditSubject;