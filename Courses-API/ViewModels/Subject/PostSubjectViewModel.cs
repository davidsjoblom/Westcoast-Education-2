using System.ComponentModel.DataAnnotations;

namespace Courses_API.ViewModels.Subject
{
    public class PostSubjectViewModel
    {
        [Required(ErrorMessage = "Namn på ämnet är obligatoriskt")]
        public string? Name { get; set; }
    }
}