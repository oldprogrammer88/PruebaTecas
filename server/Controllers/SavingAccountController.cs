using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Errors;
using server.Models;
using server.Models.Database;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavingAccountController : ControllerBase
    {
        private IMapper _mapper;
        private ILogger<SavingAccountController> _logger;
        private DatabaseContext _databaseContext;
        private UserManager<User> _userManager;
        public SavingAccountController(IMapper mapper, ILogger<SavingAccountController> logger, DatabaseContext databaseContext, UserManager<User> userManager)
        {
            _mapper = mapper;
            _logger = logger;
            _databaseContext = databaseContext;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("getAccountsByEmail")]
        public ActionResult<IEnumerable<AccountResponse>> GetAllSavyngAccountByEmail(string userEmail)
        {
            try
            {
                var accountsWithUser = _databaseContext.SavingAccount.Where(s => s.User.Email == userEmail).AsEnumerable();
                var listAccounts = _mapper.Map<IEnumerable<SavingAccount>, IEnumerable<AccountResponse>>(accountsWithUser);
                return Ok(listAccounts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocurrió un error en getAccountsByEmail");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize]
        [HttpPut("depositToAccount")]
        public async Task<ActionResult> DepositoToAccount(DepositAccountRequest depositAccountRequest)
        {
            try
            {
                var savingAccount = _databaseContext.SavingAccount.FirstOrDefault(s => s.AccountNumber == depositAccountRequest.AccountNumber);

                if (savingAccount != null)
                {
                    savingAccount.Balance += depositAccountRequest.Amount;

                    var transaction = new TransactionHistory
                    {
                        Amount = depositAccountRequest.Amount,
                        Date = DateTime.Now,
                        TransactionTypeId = (int)TransactionTypeEnum.DEPOSIT,
                        UserId = savingAccount.UserId
                    };

                    await _databaseContext.TransactionHistory.AddAsync(transaction);

                    await _databaseContext.SaveChangesAsync();

                    return Ok();
                }
                else
                {
                    _logger.LogInformation("No se encontró la cuenta {0}, no se pudo realizar el deposito", depositAccountRequest.AccountNumber);

                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize]
        [HttpPut("withdrawalToAccount")]
        public async Task<ActionResult> WithdrawalToAccount(WithdrawalAccountRequest withdrawalAccountRequest)
        {
            try
            {
                var savingAccount = _databaseContext.SavingAccount.FirstOrDefault(s => s.AccountNumber == withdrawalAccountRequest.AccountNumber);

                if (savingAccount != null)
                {
                    if (withdrawalAccountRequest.Amount > savingAccount.Balance)
                    {
                        return BadRequest(new ErrorsResponse(ErrorsWithdrawal.ErrorOverAmount));
                    }
                    else
                    {
                        var transaction = new TransactionHistory
                        {
                            Amount = withdrawalAccountRequest.Amount,
                            Date = DateTime.Now,
                            TransactionTypeId = (int)TransactionTypeEnum.WITHDRAWAL,
                            UserId = savingAccount.UserId
                        };

                        await _databaseContext.TransactionHistory.AddAsync(transaction);

                        savingAccount.Balance -= withdrawalAccountRequest.Amount;
                        await _databaseContext.SaveChangesAsync();
                    }

                    return Ok();
                }
                else
                {
                    _logger.LogInformation("No se encontró la cuenta {0}, no se pudo realizar el deposito", withdrawalAccountRequest.AccountNumber);

                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize]
        [HttpPost("addNewSavingAccount")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult> AddNewSavingAccount(AddNewSavingAccountRequest addNewSavingAccountRequest)
        {
            var savingAccount = _mapper.Map<SavingAccount>(addNewSavingAccountRequest);

            try
            {
                //Buscamos la cuenta
                var savingAccountInDb = _databaseContext.SavingAccount.FirstOrDefault(s => s.AccountNumber == savingAccount.AccountNumber);
                var user = await _userManager.FindByEmailAsync(addNewSavingAccountRequest.UserEmail);
                if (savingAccountInDb == null && user != null)
                {
                    savingAccount.User = user;
                    savingAccount.UserId = user.Id;
                    await _databaseContext.SavingAccount.AddAsync(savingAccount);
                    await _databaseContext.SaveChangesAsync();

                    return CreatedAtAction(null, null);
                }
                else
                {
                    return StatusCode(StatusCodes.Status406NotAcceptable);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en AddNewSavingAccount");

                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }
    }
}
