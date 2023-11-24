using webapi.Models;

namespace webapi.Data;

public class DbSeeder
{
    public static void Seed(QuizContext context)
    {
        context.Database.EnsureCreated();
        if (!context.Quizzes.Any())
        {
            // add from json file
            var json = System.IO.File.ReadAllText("Data/quiz.json");
            var quizzes = System.Text.Json.JsonSerializer.Deserialize<List<Quiz>>(json);
            context.Quizzes.AddRange(quizzes);
            context.SaveChanges();
        }
    }
}