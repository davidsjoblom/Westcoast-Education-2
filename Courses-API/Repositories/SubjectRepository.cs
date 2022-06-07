using AutoMapper;
using AutoMapper.QueryableExtensions;
using Courses_API.Data;
using Courses_API.Interfaces;
using Courses_API.Models;
using Courses_API.ViewModels.Subject;
using Microsoft.EntityFrameworkCore;

namespace Courses_API.Repositories
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public SubjectRepository(ApplicationContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddSubjectAsync(PostSubjectViewModel model)
        {
            //Kolla att man inte skapar en dublett
            var response = await _context.Subjects
                .Where(s => s.Name!.ToLower() == model.Name!.ToLower())
                .SingleOrDefaultAsync();
            if (response is not null)
            {
                throw new Exception($"Ämnet '{model.Name}' finns redan i systemet");
            }
            var subject = _mapper.Map<Subject>(model);
            await _context.Subjects.AddAsync(subject);
        }

        public async Task DeleteSubjectAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject is null)
            {
                throw new Exception($"Inget ämne med id: {id} hittades");
            }
            _context.Subjects.Remove(subject);
        }

        public async Task<SubjectViewModel?> GetSubjectByIdAsync(int id)
        {
            return await _context.Subjects
                .Where(s => s.Id == id)
                .ProjectTo<SubjectViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<SubjectViewModel>> ListAllSubjectsAsync()
        {
            return await _context.Subjects
                .ProjectTo<SubjectViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateSubjectAsync(int id, PostSubjectViewModel model)
        {
            //Kolla att man inte skapar en dublett
            var subject = await _context.Subjects
                .Where(s => s.Name!.ToLower() == model.Name!.ToLower())
                .SingleOrDefaultAsync();
            if (subject is not null)
            {
                throw new Exception($"Ämnet '{model.Name}' finns redan i systemet");
            }

            subject = await _context.Subjects.FindAsync(id);
            if (subject is null)
            {
                throw new Exception($"Inget ämne med id: {id} hittades");
            }

            subject.Name = model.Name;
            _context.Subjects.Update(subject);
        }
    }
}