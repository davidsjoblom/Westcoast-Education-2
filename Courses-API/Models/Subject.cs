namespace Courses_API.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
    }
}