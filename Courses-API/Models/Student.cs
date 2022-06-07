namespace Courses_API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int PhoneNr { get; set; }
        public string? Address { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}