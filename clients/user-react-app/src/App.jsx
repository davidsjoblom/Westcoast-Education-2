import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import CourseList from './components/courses/CourseList';
import SubjectList from './components/subjects/Subjectlist';
import AddStudent from './components/students/AddStudent';
import CoursesBySubject from './components/courses/CoursesBySubject';
import CourseDetails from './components/courses/CourseDetails';

import './styles.css';
import './utilities.css';

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/courses' element={<CourseList />} />
                    <Route path='/courses/details/:id' element={<CourseDetails />} />
                    <Route path='/courses/:subjectName' element={<CoursesBySubject />} />
                    <Route path='/subjects' element={<SubjectList />} />
                    <Route path='/register' element={<AddStudent />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App;