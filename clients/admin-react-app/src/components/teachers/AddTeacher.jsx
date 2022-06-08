import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTeacher() {
    const navigate = useNavigate();

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

    const handleSaveTeacher = (e) => {
        e.preventDefault();
        const teacher = {
            firstName,
            lastName,
            email,
            phoneNr,
            address,
            expertise
        }
        saveTeacher(teacher);
    }

    const saveTeacher = async (teacher) => {
        const url = `${process.env.REACT_APP_BASEURL}/teachers`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacher),
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Läraren är sparad');
            navigate('/teachers');
        } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
        }
    };

    return (
        <>
            <h1 className="page-title">Lägg till ny lärare</h1>
            <section className="form-container">
                <h4>Lärarinfo</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleSaveTeacher}>
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

export default AddTeacher;