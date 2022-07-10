using Newtonsoft.Json;
using NUnit.Framework;
using PinguinoApp.API.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace PinguinoApp.Test
{
    public class IntegrationTest
    {

        public string baseURL { get; set; }
        private string token { get; set; }

        [SetUp]
        public void setup()
        {
            baseURL = "https://app-pinguino.herokuapp.com/";

            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseURL);
                var LoginData = new Login() { UserName = "Admin", Password = "admin" };
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json")); //ACCEPT header
                var result = httpClient.PostAsync("/v1/account/login", new StringContent(JsonConvert.SerializeObject(LoginData), Encoding.UTF8, "application/json")).Result;
                token = (JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result) as dynamic).token;
            }
        }

        [Test]
        public void SELECT_CADASTRO_ENDERECO_ID_1()
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseURL);
                httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json")); //ACCEPT header
                var result = httpClient.GetAsync("/v1/enderecos/one?id=1").Result;


                var expectedObject = new
                {
                    id = 1,
                    logradouro = "R Ignácio de Almeida",
                    numero = "22",
                    complemento = "Casa",
                    municipio = 3964,
                    cep = "13661204",
                    ativo = true
                };
                var response = result.Content.ReadAsStringAsync().Result;

                Assert.AreEqual(JsonConvert.SerializeObject(expectedObject), response);
            }
        }

        [Test]
        public void SELECT_CADASTRO_PAIS_ID_1()
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseURL);
                httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json")); //ACCEPT header
                var result = httpClient.GetAsync("/v1/paises/one?id=1").Result;


                var expectedObject = new
                {
                    id = 1,
                    descricao = "Brasil",
                    codigoArea = "+55",
                    ativo = true
                };
                var response = result.Content.ReadAsStringAsync().Result;

                Assert.AreEqual(JsonConvert.SerializeObject(expectedObject), response);
            }
        }
    }
}