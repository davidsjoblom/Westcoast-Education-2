using AutoMapper;
using Courses_API.Models;
using Courses_API.ViewModels.Course;
using Courses_API.ViewModels.Student;
using Courses_API.ViewModels.Subject;
using Courses_API.ViewModels.Teacher;

namespace Courses_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<PostCourseViewModel, Course>(); //OBS! inte komplett mappning
            CreateMap<Course, CourseViewModel>()
                .ForMember(dest => dest.CourseId, options => options.MapFrom(src => src.Id));
            CreateMap<Course, CourseWithStudentsViewModel>()
                .ForMember(dest => dest.CourseId, options => options.MapFrom(src => src.Id));

            CreateMap<PostStudentViewModel, Student>();
            CreateMap<Student, StudentViewModel>()
                .ForMember(dest => dest.StudentId, options => options.MapFrom(src => src.Id))
                .ForMember(dest => dest.StudentName, options => options.MapFrom(src => string.Concat(src.FirstName, " ", src.LastName)));

            CreateMap<PostSubjectViewModel, Subject>();
            CreateMap<Subject, SubjectViewModel>()
                .ForMember(dest => dest.SubjectId, options => options.MapFrom(src => src.Id));

            CreateMap<PostTeacherViewModel, Teacher>(); //OBS! inte komplett mappning
            CreateMap<Teacher, TeacherViewModel>()
                .ForMember(dest => dest.TeacherId, options => options.MapFrom(src => src.Id))
                .ForMember(dest => dest.TeacherName, options => options.MapFrom(src => string.Concat(src.FirstName, " ", src.LastName)));
        }
    }
}