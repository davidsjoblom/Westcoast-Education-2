using Courses_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Courses_API.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Student> Students => Set<Student>();
        public DbSet<Subject> Subjects => Set<Subject>();
        public DbSet<Teacher> Teachers => Set<Teacher>();

        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
    }
}