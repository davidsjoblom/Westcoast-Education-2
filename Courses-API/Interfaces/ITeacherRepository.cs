using Courses_API.ViewModels.Teacher;

namespace Courses_API.Interfaces
{
    public interface ITeacherRepository
    {
        public Task<List<TeacherViewModel>> ListAllTeachersAsync();
        public Task<TeacherViewModel?> GetTeacherByIdAsync(int id);
        public Task<TeacherViewModel?> GetTeacherByEmailAsync(string email);
        public Task AddTeacherAsync(PostTeacherViewModel model);
        public Task DeleteTeacherAsync(int id);
        public Task UpdateTeacherAsync(int id, PostTeacherViewModel model);
        public Task<bool> SaveAllAsync();
    }
}