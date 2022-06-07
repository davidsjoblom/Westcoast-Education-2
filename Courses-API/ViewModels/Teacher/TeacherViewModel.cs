using Courses_API.ViewModels.Subject;

namespace Courses_API.ViewModels.Teacher
{
    public class TeacherViewModel
    {
        public int TeacherId { get; set; }
        public string? TeacherName { get; set; }
        public string? Email { get; set; }
        public int PhoneNr { get; set; }
        public string? Address { get; set; }
        public List<SubjectViewModel> Subjects { get; set; } = new();
    }
}