using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Courses_API.Interfaces;
using Courses_API.ViewModels.Subject;
using Microsoft.AspNetCore.Mvc;

namespace Courses_API.Controllers
{
    [ApiController]
    [Route("api/subjects")]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectRepository _repo;
        public SubjectsController(ISubjectRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<SubjectViewModel>>> ListSubjects() 
        {
            return Ok(await _repo.ListAllSubjectsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectViewModel>> GetSubjectById(int id)
        {
            var response = await _repo.GetSubjectByIdAsync(id);
            if (response is null) return NotFound($"Inget ämnet med id: {id} hittades");
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> AddSubject(PostSubjectViewModel model) 
        {
            try
            {
                await _repo.AddSubjectAsync(model);
                if (await _repo.SaveAllAsync()) return StatusCode(201);
                return StatusCode(500, "Det gick inte att spara ämnet");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSubject(int id)
        {
            try
            {
                await _repo.DeleteSubjectAsync(id);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att ta bort ämnet");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSubject(int id, PostSubjectViewModel model)
        {
            try
            {
                await _repo.UpdateSubjectAsync(id, model);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att uppdatera ämnet");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}