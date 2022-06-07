import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home';

import CourseList from './components/courses/CourseList';
import AddCourse from './components/courses/AddCourse';
import EditCourse from './components/courses/EditCourse';

import StudentList from './components/students/StudentList';
import AddStudent from './components/students/AddStudent';
import EditStudent from './components/students/EditStudent';

import SubjectList from './components/subjects/SubjectList';
import AddSubject from './components/subjects/AddSubject';
import EditSubject from './components/subjects/EditSubject';

import TeacherList from './components/teachers/TeacherList';
import AddTeacher from './components/teachers/AddTeacher';
import EditTeacher from './components/teachers/EditTeacher';


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
                    <Route path='/courses/add' element={<AddCourse />} />
                    <Route path='/courses/edit/:id' element={<EditCourse />} />

                    <Route path='/subjects' element={<SubjectList />} />
                    <Route path='/subjects/add' element={<AddSubject />} />
                    <Route path='/subjects/edit(:id' element={<EditSubject />} />

                    <Route path='/students' element={<StudentList />} />
                    <Route path='/students/add' element={<AddStudent />} />
                    <Route path='/students/edit/:id' element={<EditStudent />} />

                    <Route path='/teachers' element={<TeacherList />} />
                    <Route path='/teachers/add' element={<AddTeacher />} />
                    <Route path='/teachers/edit/:id' element={<EditTeacher />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App;