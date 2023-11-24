namespace webapi.Data;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

public class QuizContext : DbContext
{
    public QuizContext(DbContextOptions<QuizContext> options) : base(options)
    {
    }

    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
}