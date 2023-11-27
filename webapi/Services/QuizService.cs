using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Services
{
    public class QuizService : IQuizService
    {
        private readonly QuizContext _context;

        public QuizService(QuizContext context)
        {
            _context = context;
        }

        public List<Quiz> GetQuizzes()
        {
            return _context.Quiz.Include(q => q.questions).ThenInclude(q => q.answers).ToList();
        }
    }
}