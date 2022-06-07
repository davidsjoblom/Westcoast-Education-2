using Courses_API.ViewModels.Subject;

namespace Courses_API.ViewModels.Teacher
{
    public class PostTeacherViewModel
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int PhoneNr { get; set; }
        public string? Address { get; set; }
        public string? Expertise { get; set; }
    }
}