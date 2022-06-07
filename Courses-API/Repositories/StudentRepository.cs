using AutoMapper;
using AutoMapper.QueryableExtensions;
using Courses_API.Data;
using Courses_API.Interfaces;
using Courses_API.Models;
using Courses_API.ViewModels.Student;
using Microsoft.EntityFrameworkCore;

namespace Courses_API.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        public StudentRepository(ApplicationContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddStudentAsync(PostStudentViewModel model)
        {
            var response = await _context.Students
                .Where(s => s.Email == model.Email)
                .SingleOrDefaultAsync();
            if (response is not null)
            {
                throw new Exception($"En student med email: {model.Email} finns redan i systemet");
            }
            var student = _mapper.Map<Student>(model);
            await _context.Students.AddAsync(student);
        }

        

        public async Task DeleteStudentAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student is null)
            {
                throw new Exception($"Ingen student med id: {id} hittades");
            }
            _context.Students.Remove(student);
        }

        public async Task<StudentViewModel?> GetStudentByEmailAsync(string email)
        {
            return await _context.Students
                .Where(s => s.Email!.ToLower() == email)
                .ProjectTo<StudentViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<StudentViewModel?> GetStudentByIdAsync(int id)
        {
            return await _context.Students
                .Where(s => s.Id == id)
                .ProjectTo<StudentViewModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<StudentViewModel>> ListAllStudentsAsync()
        {
            return await _context.Students
                .ProjectTo<StudentViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateStudentAsync(int id, PostStudentViewModel model)
        {
            var student = await _context.Students.FindAsync(id);
            if (student is null)
            {
                throw new Exception($"Ingen student med id: {id} hittades");
            }
            if (student.Email != model.Email)
            {
                var response = await _context.Students
                    .Where(s => s.Email == model.Email)
                    .SingleOrDefaultAsync();
                if (response is not null)
                {
                    throw new Exception($"En annan student med email: {model.Email} finns redan i systemet");
                }
            }

            student.Address = model.Address;
            student.Email = model.Email;
            student.FirstName = model.FirstName;
            student.LastName = model.LastName;
            student.PhoneNr = model.PhoneNr;

            _context.Students.Update(student);
        }
    }
}