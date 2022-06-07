using Courses_API.Interfaces;
using Courses_API.ViewModels.Teacher;
using Microsoft.AspNetCore.Mvc;

namespace Courses_API.Controllers
{
    [ApiController]
    [Route("api/teachers")]
    public class TeachersController : ControllerBase
    {
        private readonly ITeacherRepository _repo;
        public TeachersController(ITeacherRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<TeacherViewModel>>> ListTeachers() 
        {
            return Ok(await _repo.ListAllTeachersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherViewModel>> GetTeacherById(int id)
        {
            var response = await _repo.GetTeacherByIdAsync(id);
            if (response is null) return NotFound($"Ingen lärare med id: {id} hittades");
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> AddTeacher(PostTeacherViewModel model) 
        {
            try
            {
                await _repo.AddTeacherAsync(model);
                if (await _repo.SaveAllAsync()) return StatusCode(201);
                return StatusCode(500, "Det gick inte att spara läraren");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeacher(int id)
        {
            try
            {
                await _repo.DeleteTeacherAsync(id);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att ta bort läraren");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTeacher(int id, PostTeacherViewModel model)
        {
            try
            {
                await _repo.UpdateTeacherAsync(id, model);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att uppdatera läraren");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}