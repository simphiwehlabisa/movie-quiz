using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Services;
public class QuizService
{
    private readonly QuizContext _context;

    public QuizService(QuizContext context)
    {
        _context = context;
    }

    public List<Quiz> GetQuizzes()
    {
        return _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).ToList();
    }
}