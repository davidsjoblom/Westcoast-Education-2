using Courses_API.ViewModels.Student;

namespace Courses_API.Interfaces
{
    public interface IStudentRepository
    {
        public Task<List<StudentViewModel>> ListAllStudentsAsync();
        public Task<StudentViewModel?> GetStudentByIdAsync(int id);
        public Task<StudentViewModel?> GetStudentByEmailAsync(string email);
        public Task AddStudentAsync(PostStudentViewModel model);
        
        public Task DeleteStudentAsync(int id);
        public Task UpdateStudentAsync(int id, PostStudentViewModel model);
        public Task<bool> SaveAllAsync();
    }
}