import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditTeacher() {
    const navigate = useNavigate();

    const params = useParams();
    const [teacherId, setTeacherId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNr, setPhoneNr] = useState('');
    const [address, setAddress] = useState('');
    const [expertise, setExpertise] = useState('');

    const onHandleFirstNameChanged = (e) => {
        setFirstName(e.target.value);
    };
    const onHandleLastNameChanged = (e) => {
        setLastName(e.target.value);
    };
    const onHandleEmailChanged = (e) => {
        setEmail(e.target.value);
    };
    const onHandlePhoneNrChanged = (e) => {
        setPhoneNr(e.target.value);
    };
    const onHandleAddressChanged = (e) => {
        setAddress(e.target.value);
    };
    const onHandleExpertiseChanged = (e) => {
        setExpertise(e.target.value);
    };

    useEffect(() => {
        fetchTeacher(params.id)
    }, [params.id]);

    const fetchTeacher = async (id) => {
        const url = `${process.env.REACT_APP_BASEURL}/teachers/${id}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log('Lyckades inte hämta studenten');
        }

        const teacher = await response.json();
        setTeacherId(teacher.teacherId);
        setFirstName(teacher.teacherName.split(' ')[0]);
        setLastName(teacher.teacherName.split(' ')[1]);
        setEmail(teacher.email);
        setPhoneNr(teacher.phoneNr);
        setAddress(teacher.address);

        var subjectConcat = '';
        teacher.subjects.map((subject) => (
            subjectConcat = subjectConcat.concat(subject.name, ' ')
        ))
        setExpertise(subjectConcat);
    }

    const handleUpdateTeacher = (e) => {
        e.preventDefault();
        const teacher = {
            firstName,
            lastName,
            email,
            phoneNr,
            address,
            expertise
        }
        updateTeacher(teacher);
    }

    const updateTeacher = async (teacher) => {
        const url = `${process.env.REACT_APP_BASEURL}/teachers/${teacherId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacher),
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Läraren är uppdaterad');
            navigate('/teachers');
        } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
        }
    };

    return (
        <>
            <h1 className="page-title">Uppdatera lärare</h1>
            <section className="form-container">
                <h4>Lärarinfo</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleUpdateTeacher}>
                        <div className="form-control">
                            <label htmlFor="courseNr">Förnamn</label>
                            <input
                                onChange={onHandleFirstNameChanged}
                                value={firstName}
                                type='text'
                                id='firstName'
                                name='firstName'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="lastName">Efternamn</label>
                            <input
                                onChange={onHandleLastNameChanged}
                                value={lastName}
                                type='text'
                                id='lastName'
                                name='lastName'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={onHandleEmailChanged}
                                value={email}
                                type='text'
                                id='email'
                                name='email'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="phoneNr">Telefonnummer</label>
                            <input
                                onChange={onHandlePhoneNrChanged}
                                value={phoneNr}
                                type='number'
                                id='phoneNr'
                                name='phoneNr'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="address">Adress</label>
                            <input
                                onChange={onHandleAddressChanged}
                                value={address}
                                type='text'
                                id='address'
                                name='address'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="address">Kompetenser</label>
                            <input
                                onChange={onHandleExpertiseChanged}
                                value={expertise}
                                type='text'
                                id='expertise'
                                name='expertise'
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

export default EditTeacher;