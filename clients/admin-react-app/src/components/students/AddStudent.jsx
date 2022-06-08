import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNr, setPhoneNr] = useState('');
    const [address, setAddress] = useState('');

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

    const handleSaveStudent = (e) => {
        e.preventDefault();
        const student = {
            firstName,
            lastName,
            email,
            phoneNr,
            address,
        }
        saveStudent(student);
    }

    const saveStudent = async (student) => {
        const url = `${process.env.REACT_APP_BASEURL}/students`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        if (response.status >= 200 && response.status <= 299) {
            console.log('Studenten är sparad');
            navigate('/students');
        } else {
            console.log('Det gick fel någonstans');
            console.log(response.status);
            console.log(await response.text());
        }
    };

    return (
        <>
            <h1 className="page-title">Lägg till ny student</h1>
            <section className="form-container">
                <h4>StudentInfo</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleSaveStudent}>
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

export default AddStudent;