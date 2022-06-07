namespace Courses_API.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int PhoneNr { get; set; }
        public string? Address { get; set; }
        public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    }
}