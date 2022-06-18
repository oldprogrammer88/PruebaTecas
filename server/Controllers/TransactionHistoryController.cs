using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Errors;
using server.Models.Requests;
using server.Models.Responses;
using System.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionHistoryController : ControllerBase
    {
        private ILogger<TransactionHistoryController> logger;
        private IMapper mapper;
        private DatabaseContext databaseContext;

        public TransactionHistoryController(
            ILogger<TransactionHistoryController> logger,
            IMapper mapper,
            DatabaseContext databaseContext)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.databaseContext = databaseContext;
        }

        [Authorize]
        [HttpGet("allTransactionByUserEmail")]
        public ActionResult GetAllTransactionHistory(string userEmail)
        {
            try
            {
                var user = databaseContext.User.FirstOrDefault(u => u.Email == userEmail);
                if (user != null)
                {

                    var transactions = databaseContext.TransactionHistory
                        .Where(t => t.UserId == user.Id)
                        .AsEnumerable();

                    return Ok(transactions);
                }
                else
                {
                    var errors = new ErrorsResponse(ErrorsUser.UserNotFound);
                    return StatusCode(StatusCodes.Status400BadRequest, errors);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        [Authorize]
        [HttpPost("pageTransactionByUserEmail")]
        public ActionResult GetPageTransactionHistory(PageTransactionHistoryRequest pageTransactionHistoryRequest)
        {
            try
            {
                var user = databaseContext.User.FirstOrDefault(u => u.Email == pageTransactionHistoryRequest.Email);
                if (user != null)
                {
                    int skipPages = pageTransactionHistoryRequest.Size * (pageTransactionHistoryRequest.Page);
                    long totalPages = databaseContext.TransactionHistory.Where(t => t.UserId == user.Id).LongCount();

                    var transactions = databaseContext.TransactionHistory
                        .Include(t => t.TransactionType)
                        .Where(t => t.UserId == user.Id)
                        .Skip(skipPages)
                        .Take(pageTransactionHistoryRequest.Size);

                    var transactionsHistoryResponse = mapper.Map<IEnumerable<PageTransactionHistoryResponse.TransactionHistoryResponse>>(transactions);

                    var pageTransactionHistoryResponse = new PageTransactionHistoryResponse
                    {
                        Page = pageTransactionHistoryRequest.Page,
                        Size = pageTransactionHistoryRequest.Size,
                        TotalPages = totalPages,
                        Transactions = transactionsHistoryResponse
                    };

                    return Ok(pageTransactionHistoryResponse);
                }
                else
                {
                    var errors = new ErrorsResponse(ErrorsUser.UserNotFound);
                    return StatusCode(StatusCodes.Status400BadRequest, errors);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
