using AutoMapper;
using AutoMapper.QueryableExtensions;
using Courses_API.Data;
using Courses_API.Interfaces;
using Courses_API.Models;
using Courses_API.ViewModels.Teacher;
using Microsoft.EntityFrameworkCore;

namespace Courses_API.Repositories
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public TeacherRepository(ApplicationContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddTeacherAsync(PostTeacherViewModel model)
        {
            //kolla att ämnena finns
            var split = model.Expertise!.Split(" ");
            var subjects = new List<Subject>();
            foreach (string s in split)
            {
                var subject = await _context.Subjects
                    .Where(x => x.Name.ToLower() == s.ToLower())
                    .SingleOrDefaultAsync();
                if (subject is null)
                {
                    throw new Exception($"Ämnet {s} finns inte i systemet");
                }
                subjects.Add(subject);
            }

            //kolla att email inte redan finns
            var response = await _context.Teachers
                .Where(t => t.Email == model.Email)
                .SingleOrDefaultAsync();
            if (response is not null)
            {
                throw new Exception($"En lärare med email: {model.Email} finns redan i systemet");
            }

            var teacher = _mapper.Map<Teacher>(model);
            teacher.Subjects = subjects;

            await _context.AddAsync(teacher);
        }

        public async Task DeleteTeacherAsync(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher is null)
            {
                throw new Exception($"Ingen lärare med id: {id} hittades");
            }
            _context.Teachers.Remove(teacher);
        }

        public async Task<TeacherViewModel?> GetTeacherByEmailAsync(string email)
        {
            return await _context.Teachers
                .Where(t => t.Email!.ToLower() == email)
                .ProjectTo<TeacherViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<TeacherViewModel?> GetTeacherByIdAsync(int id)
        {
            return await _context.Teachers
                .Where(t => t.Id == id)
                .ProjectTo<TeacherViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<TeacherViewModel>> ListAllTeachersAsync()
        {
            return await _context.Teachers
                .ProjectTo<TeacherViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateTeacherAsync(int id, PostTeacherViewModel model)
        {
            var teacher = await _context.Teachers
            .Include(t => t.Subjects)
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();

            if (teacher is null)
            {
                throw new Exception($"Ingen lärare med id: {id} hittades");
            }

            var split = model.Expertise!.Split(" ");
            var subjects = new List<Subject>();
            foreach (string s in split)
            {
                var subject = await _context.Subjects
                    .Where(x => x.Name.ToLower() == s.ToLower())
                    .SingleOrDefaultAsync();
                if (subject is null)
                {
                    throw new Exception($"Ämnet {s} finns inte i systemet");
                }
                subjects.Add(subject);
            }

            teacher.Address = model.Address;
            teacher.Email = model.Email;
            teacher.FirstName = model.FirstName;
            teacher.LastName = model.LastName;
            teacher.PhoneNr = model.PhoneNr;
            teacher.Subjects = subjects;

            _context.Teachers.Update(teacher);
        }
    }
}