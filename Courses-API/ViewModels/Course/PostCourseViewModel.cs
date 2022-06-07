namespace Courses_API.ViewModels.Course
{
    public class PostCourseViewModel
    {
        public int CourseNr { get; set; } 
        public string? Title { get; set; }
        public int Duration { get; set; }
        public string? Description { get; set; }
        public string? Details { get; set; }
        public string? SubjectName { get; set; }
        public string? TeacherName { get; set; }
    }
}