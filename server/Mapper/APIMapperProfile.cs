using AutoMapper;
using server.Models.Database;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Mapper
{
    public class APIMapperProfile : Profile
    {
        public override string ProfileName => "APIMapperProfile";

        public  APIMapperProfile()
        {
            ConfigureMappings();
        }

        private void ConfigureMappings()
        {
            CreateMap<UserRegisterRequest, User>()
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.Email));

            CreateMap<AddNewSavingAccountRequest, SavingAccount>();

            CreateMap<SavingAccount, AccountResponse>();

            CreateMap<TransactionHistory, PageTransactionHistoryResponse.TransactionHistoryResponse>()
                .ForMember(d => d.TypeTransaction, opt => opt.MapFrom(s => s.TransactionType.Description));
        }
    }
}
