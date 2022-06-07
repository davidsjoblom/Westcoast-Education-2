import { useState } from 'react';

function AddStudent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNr, setPhoneNr] = useState('');
    const [address, setAddress] = useState('');

    const onHandleFirstNameTextChanged = (e) => {
        setFirstName(e.target.value);
    };
    const onHandleLastNameTextChanged = (e) => {
        setLastName(e.target.value);
    };
    const onHandleEmailChanged = (e) => {
        setEmail(e.target.value);
    };
    const onHandlePhoneNrNumberChanged = (e) => {
        setPhoneNr(e.target.value);
    };
    const onHandleAddressTextChanged = (e) => {
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
        console.log(student);
        console.log(JSON.stringify(student));
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
        })

        if (response.status >= 200 && response.status <= 299) {
            console.log('Studenten är sparad');
        } else {
            console.log('Nått gick fel');
            console.log(`Status code: ${response.status}`);
            console.log(await response.text());
        }
    }

    return (
        <>
            <h1 className="page-title">Registrera ny student</h1>
            <section className="form-container">
                <h4>Student info</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleSaveStudent}>
                        <div className="form-control">
                            <label htmlFor="">Förnamn</label>
                            <input
                                onChange={onHandleFirstNameTextChanged}
                                value={firstName}
                                type="text"
                                id='firstName'
                                name='firstname'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Efternamn</label>
                            <input
                                onChange={onHandleLastNameTextChanged}
                                value={lastName}
                                type="text"
                                id='lastName'
                                name='lastName'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Email</label>
                            <input
                                onChange={onHandleEmailChanged}
                                value={email}
                                type="email"
                                id='email'
                                name='email'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Telefonnummer</label>
                            <input
                                onChange={onHandlePhoneNrNumberChanged}
                                value={phoneNr}
                                type="number"
                                id='phoneNr'
                                name='phoneNr'
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Adress</label>
                            <input
                                onChange={onHandleAddressTextChanged}
                                value={address}
                                type="text"
                                id='address'
                                name='address'
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn">
                                Registrera
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}

export default AddStudent;