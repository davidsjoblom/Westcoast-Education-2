using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Courses_API.Data;
using Courses_API.Interfaces;
using Courses_API.Models;
using Courses_API.ViewModels.Course;
using AutoMapper.QueryableExtensions;

namespace Courses_API.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public CourseRepository(ApplicationContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddCourseAsync(PostCourseViewModel model)
        {
            //Kolla att kursnummret är unikt
            var response = await _context.Courses
                .Where(c => c.CourseNr == model.CourseNr)
                .SingleOrDefaultAsync();
            if (response is not null)
            {
                throw new Exception($"En kurs med kursnummret: {model.CourseNr} finns redan i systemet");
            }
            
            //Kolla att ämnet finns
            var subject = await _context.Subjects
                .Where(s => s.Name!.ToLower() == model.SubjectName!.ToLower())
                .SingleOrDefaultAsync();
            if (subject is null)
            {
                throw new Exception($"Ämnet {model.SubjectName} hittades inte i systemet");
            }

            //Kolla att läraren finns
            //OBS! denna funktion stödjer inte flera lärare med samma namn
            var teacher = await _context.Teachers
                .Where(t => string.Concat(t.FirstName, " ", t.LastName).ToLower() == model.TeacherName!.ToLower().Trim())
                .FirstOrDefaultAsync();
            if (teacher is null)
            {
                throw new Exception($"Läraren {model.TeacherName} hittades inte i systemet");
            }

            var course = _mapper.Map<Course>(model);
            course.Subject = subject;
            course.Teacher = teacher;

            await _context.Courses.AddAsync(course);
        }

        public async Task AddStudentToCourseAsync(int studentId, int courseId)
        {
            var student = await _context.Students.FindAsync(studentId);
            if (student is null)
            {
                throw new Exception($"Ingen student med id: {studentId} hittades");
            }
            var course = await _context.Courses.FindAsync(courseId);
            if (course is null)
            {
                throw new Exception($"Ingen kurs med id: {courseId} hittades");
            }
            course.Students.Add(student);
        }

        public async Task DeleteCourseAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course is null)
            {
                throw new Exception($"Ingen kurs med id: {id} hittades");
            }
            _context.Courses.Remove(course);
        }

        public async Task DeleteStudentFromCourseAsync(int studentId, int courseId)
        {
            var student = await _context.Students.FindAsync(studentId);
            if (student is null)
            {
                throw new Exception($"Ingen student med id: {studentId} hittades");
            }
            var course = await _context.Courses
                .Include(x => x.Students)
                .Where(c => c.Id == courseId)
                .SingleOrDefaultAsync();
            if (course is null)
            {
                throw new Exception($"Ingen kurs med id: {courseId} hittades");
            }
            var success = course.Students.Remove(student);
            if (!success)
            {
                throw new Exception("Kunde inte ta bort studenten eller så var den inte registrerad på kursen från början");
            }
        }

        public async Task<CourseViewModel?> GetCourseByCourseNrAsync(int courseNr)
        {
            return await _context.Courses
                .Where(c => c.CourseNr == courseNr)
                .ProjectTo<CourseViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<CourseViewModel?> GetCourseByIdAsync(int id)
        {
            return await _context.Courses
                .Where(c => c.Id == id)
                .ProjectTo<CourseViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<CourseViewModel>> GetCoursesBySubjectAsync(string subject)
        {
            return await _context.Courses
                //.Include(t => t.Subject) dis rly neccessary?? dont think so...
                .Where(x => x.Subject.Name!.ToLower() == subject.ToLower())
                .ProjectTo<CourseViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<CourseWithStudentsViewModel?> GetCourseWithStudentsAsync(int id)
        {
            return await _context.Courses
                .Where(t => t.Id == id)
                .ProjectTo<CourseWithStudentsViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<CourseViewModel>> ListAllCoursesAsync()
        {
            return await _context.Courses
                .ProjectTo<CourseViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateCourseAsync(int id, PostCourseViewModel model)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course is null) 
            {
                throw new Exception($"Ingen kurs med id: {id} hittades");
            }

            var subject = await _context.Subjects
                .Where(s => s.Name!.ToLower() == model.SubjectName!.ToLower())
                .SingleOrDefaultAsync();
            if (subject is null)
            {
                throw new Exception($"Ämnet {model.SubjectName} hittades inte i systemet");
            }

            var teacher = await _context.Teachers
                .Where(t => string.Concat(t.FirstName, " ", t.LastName).ToLower() == model.TeacherName!.ToLower())
                .SingleOrDefaultAsync();
            if (teacher is null)
            {
                throw new Exception($"Läraren {model.TeacherName} hittades inte i systemet");
            }

            //Kolla att kursnummret förblir unikt
            if (course.CourseNr != model.CourseNr)
            {
                var response = await _context.Courses
                    .Where(c => c.CourseNr == model.CourseNr)
                    .SingleOrDefaultAsync();
                if (response is not null)
                {
                    throw new Exception($"En annan kurs med kursnummer: {model.CourseNr} finns redan i systemet");
                }
            }

            course.CourseNr = model.CourseNr;
            course.Description = model.Description;
            course.Details = model.Details;
            course.Duration = model.Duration;
            course.Title = model.Title;
            course.Subject = subject;
            course.Teacher = teacher;

            _context.Courses.Update(course);
        }
    }
}