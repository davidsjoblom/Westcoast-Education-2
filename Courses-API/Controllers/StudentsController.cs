using Courses_API.Interfaces;
using Courses_API.ViewModels.Student;
using Microsoft.AspNetCore.Mvc;

namespace Courses_API.Controllers
{
    [ApiController]
    [Route("api/students")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _repo;
        public StudentsController(IStudentRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<StudentViewModel>>> ListStudents() 
        {
            return Ok(await _repo.ListAllStudentsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentViewModel>> GetStudentById(int id)
        {
            var response = await _repo.GetStudentByIdAsync(id);
            if (response is null) return NotFound($"Ingen student med id: {id} hittades");
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> AddStudent(PostStudentViewModel model) 
        {
            try
            {
                await _repo.AddStudentAsync(model);
                if (await _repo.SaveAllAsync()) return StatusCode(201);
                return StatusCode(500, "Det gick inte att spara studenten");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            try
            {
                await _repo.DeleteStudentAsync(id);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att ta bort studenten");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(int id, PostStudentViewModel model)
        {
            try
            {
                await _repo.UpdateStudentAsync(id, model);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att uppdatera studenten");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}