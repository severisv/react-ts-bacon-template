using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Server.Utils
{

    public static class Json
    {
        public static string ToJson(this object obj)
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            return JsonConvert.SerializeObject(obj, settings);
        }
    }

}