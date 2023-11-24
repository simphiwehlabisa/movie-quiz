using Microsoft.AspNetCore.Mvc;
using webapi.Services;

namespace webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly QuizService _quizService;


    public QuizController(QuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet]
    public IActionResult GetQuizzes()
    {
        var quizzes = _quizService.GetQuizzes();
        return Ok(quizzes);
    }
}