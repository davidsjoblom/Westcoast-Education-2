import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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