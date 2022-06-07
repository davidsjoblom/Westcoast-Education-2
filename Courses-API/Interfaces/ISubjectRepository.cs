using Courses_API.ViewModels.Subject;

namespace Courses_API.Interfaces
{
    public interface ISubjectRepository
    {
        public Task<List<SubjectViewModel>> ListAllSubjectsAsync();
        public Task<SubjectViewModel?> GetSubjectByIdAsync(int id);
        public Task AddSubjectAsync(PostSubjectViewModel model);
        public Task DeleteSubjectAsync(int id);
        public Task UpdateSubjectAsync(int id, PostSubjectViewModel model);
        public Task<bool> SaveAllAsync();
    }
}