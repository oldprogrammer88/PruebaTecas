using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Jwt;
using server.Models.Database;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<LoginController> _logger;
        private readonly IJwtManager _jwtManager;
        private readonly UserManager<User> _userManager;

        public LoginController(IMapper mapper, ILogger<LoginController> logger, IJwtManager jwtManager, UserManager<User> userManager)
        {
            _mapper = mapper;
            _logger = logger;
            _jwtManager = jwtManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("loginUser")]
        public async Task<ActionResult> LoginUser(UserLoginRequest userLoginRequest)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userLoginRequest.Email);
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, userLoginRequest.Password);

                if (isPasswordValid)
                {
                    var token = _jwtManager.CreateToken(user);

                    return Ok(
                    new 
                    {
                        Token = token
                    });
                }
                else
                {
                    _logger.LogInformation("Contraseña incorrecta para el usuario {0} en LoginUser", userLoginRequest.Email);
                    return StatusCode(StatusCodes.Status403Forbidden);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [AllowAnonymous]
        [HttpPost("registerUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult> RegisterUser(UserRegisterRequest userRegister)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userRegister.Email);
                if (user == null)
                {
                    var newUser = _mapper.Map<UserRegisterRequest, User>(userRegister);
                    var identityResult = await _userManager.CreateAsync(newUser, userRegister.Password);

                    if (identityResult.Succeeded)
                    {
                        _logger.LogInformation("Usuario creado exitosamente ID {0}, Email {1}", newUser.Id, newUser.Email);

                        var token = _jwtManager.CreateToken(newUser);

                        return CreatedAtAction(null, new UserRegisterResponse { Token = token });
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new
                        {
                            Errors = identityResult.Errors
                        });
                    }
                    
                }
                else
                {
                    _logger.LogInformation("El usuario con email {0} ya exitse", userRegister.Email);
                    return StatusCode(StatusCodes.Status406NotAcceptable);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrio un error en {0}, excepcion: {1}", "RegisterUser", ex);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
