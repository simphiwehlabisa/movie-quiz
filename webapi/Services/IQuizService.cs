using webapi.Data;
using webapi.Models;

namespace webapi.Services
{

    public interface IQuizService
    {

        List<Quiz> GetQuizzes();
    }
}