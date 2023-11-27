using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data;

public class DbSeeder
{
    public static async Task Seed(IServiceProvider serviceProvider)
    {
        using (var context = new QuizContext(
            serviceProvider.GetRequiredService<DbContextOptions<QuizContext>>()
        ))
        {
            if (context.Quiz.Any() || context.Question.Any() || context.Answer.Any())
            {
                return;
            }
            var json = System.IO.File.ReadAllText("Data/quiz-data.json");
            var quizzes = System.Text.Json.JsonSerializer.Deserialize<QuizData>(json);

            if (quizzes != null)
            {
                foreach (var quiz in quizzes.movieQuiz)
                {
                    await context.Quiz.AddAsync(quiz);
                    await context.SaveChangesAsync();
                }
                //await context.Quiz.AddRangeAsync(quizzes.movieQuiz);

            }
            //context.Quizzes.AddRange(quizzes.movieQuiz);
            // context.Quiz.AddRangeAsync(quizzes.movieQuiz);
            // context.SaveChanges();

        }

        // context.Database.EnsureCreated();
        // if (!context.Quiz.Any())
        // {
        //     // add from json file

        // }
    }
}


public class QuizData
{
    public List<Quiz> movieQuiz { get; set; }
}