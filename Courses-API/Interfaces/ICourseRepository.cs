using Courses_API.ViewModels.Course;

namespace Courses_API.Interfaces
{
    public interface ICourseRepository
    {
        public Task<List<CourseViewModel>> ListAllCoursesAsync();
        public Task<CourseViewModel?> GetCourseByIdAsync(int id);
        public Task<CourseViewModel?> GetCourseByCourseNrAsync(int courseNr);
        public Task<List<CourseViewModel>> GetCoursesBySubjectAsync(string subject);
        public Task<CourseWithStudentsViewModel?> GetCourseWithStudentsAsync(int id);
        public Task AddCourseAsync(PostCourseViewModel model);
        public Task AddStudentToCourseAsync(int studentId, int courseId);
        public Task DeleteCourseAsync(int id);
        public Task DeleteStudentFromCourseAsync(int studentId, int courseId);
        public Task UpdateCourseAsync(int id, PostCourseViewModel model);
        public Task<bool> SaveAllAsync();
    }
}