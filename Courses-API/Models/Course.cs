namespace Courses_API.Models
{
    public class Course
    {
        public int Id { get; set; }
        public int CourseNr { get; set; }
        public string? Title { get; set; }
        public int Duration { get; set; }
        public string? Description { get; set; }
        public string? Details { get; set; }
        public int SubjectId { get; set; }
        //[ForeignKey("SubjectId")]
        public Subject Subject { get; set; } = new();
        public int TeacherId { get; set; }
        //[ForeignKey("TeacherId")]
        public Teacher Teacher { get; set; } = new();
        public ICollection<Student> Students { get; set; } = new List<Student>();
    }
}