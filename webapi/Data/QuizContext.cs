
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quiz>().HasKey(q => q.id);
            modelBuilder.Entity<Question>().HasKey(q => q.id);
            modelBuilder.Entity<Answer>().HasKey(q => q.id);
            modelBuilder.Entity<Quiz>()
            .HasMany(q => q.questions)
            .WithOne()
            .HasForeignKey(q => q.quizId)
            ;

            // One-to-Many relationship between Question and Answer
            modelBuilder.Entity<Question>()
                .HasMany(q => q.answers)
                .WithOne()
                .HasForeignKey(a => a.questionId);
        }



        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Answer> Answer { get; set; }
    }
}