using Courses_API.ViewModels.Subject;
using Courses_API.ViewModels.Teacher;

namespace Courses_API.ViewModels.Course
{
    public class CourseViewModel
    {
        public int CourseId { get; set; }
        public int CourseNr { get; set; }
        public string? Title { get; set; }
        public int Duration { get; set; }
        public string? Description { get; set; }
        public string? Details { get; set; }
        public SubjectViewModel Subject { get; set; } = new();
        public TeacherViewModel Teacher { get; set; } = new();
    }
}