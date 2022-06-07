using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Courses_API.Interfaces;
using Courses_API.ViewModels.Course;
using Microsoft.AspNetCore.Mvc;

namespace Courses_API.Controllers
{
    [ApiController]
    [Route("api/courses")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _repo;
        public CoursesController(ICourseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<CourseViewModel>>> ListCourses() 
        {
            return Ok(await _repo.ListAllCoursesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseViewModel>> GetCourseById(int id)
        {
            var response = await _repo.GetCourseByIdAsync(id);
            if (response is null) return NotFound($"Ingen kurs med id: {id} hittades");
            return Ok(response);
        }

        [HttpGet("bycoursenr/{courseNr}")]
        public async Task<ActionResult<CourseViewModel>> GetCourseByCourseNr(int courseNr)
        {
            var response = await _repo.GetCourseByCourseNrAsync(courseNr);
            if (response is null) 
            {
                return NotFound($"Ingen kurs med kursnummer: {courseNr} hittades");
            }
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<CourseViewModel>>> GetCoursesBySubject([FromQuery] string subject)
        {
            try 
            {
                return Ok(await _repo.GetCoursesBySubjectAsync(subject));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("students/{id}")]
        public async Task<ActionResult<CourseWithStudentsViewModel>> GetCourseWithStudents(int id) 
        {
            try
            {
                return Ok(await _repo.GetCourseWithStudentsAsync(id));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddCourse(PostCourseViewModel model) 
        {
            try
            {
                await _repo.AddCourseAsync(model);
                if (await _repo.SaveAllAsync()) return StatusCode(201);
                return StatusCode(500, "Det gick inte att spara kursen");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCourse(int id)
        {
            try
            {
                await _repo.DeleteCourseAsync(id);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att ta bort kursen");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCourse(int id, PostCourseViewModel model)
        {
            try
            {
                await _repo.UpdateCourseAsync(id, model);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Det gick inte att uppdatera kursen");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("addstudent/{courseId}")]
        public async Task<ActionResult> AddStudentToCourse([FromQuery] int studentId, int courseId)
        {
            try
            {
                await _repo.AddStudentToCourseAsync(studentId, courseId);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Nått gick tokigt när det skulle sparas");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("removestudent/{courseId}")]
        public async Task<ActionResult> RemoveStudentFromCourse([FromQuery] int studentId, int courseId)
        {
            try
            {
                await _repo.DeleteStudentFromCourseAsync(studentId, courseId);
                if (await _repo.SaveAllAsync()) return NoContent();
                return StatusCode(500, "Nått gick tokigt när det skulle sparas");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}