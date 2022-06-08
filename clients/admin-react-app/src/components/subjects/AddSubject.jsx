import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSubject () {
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const onHandleNameChanged = (e) => {
        setName(e.target.value);
    };

    const handleSaveSubject = (e) => {
        e.preventDefault();
        const subject = {
            name,
        }
        saveSubject(subject);
    }

    const saveSubject = async (subject) => {
        const url = `${process.env.REACT_APP_BASEURL}/subjects`;
        const response = await fetch(url, {
            method: 'POST',
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
            <h1 className="page-title">Lägg till ny kategori</h1>
            <section className="form-container">
                <h4>Info</h4>
                <section className="form-wrapper">
                    <form className="form" onSubmit={handleSaveSubject}>
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

export default AddSubject;