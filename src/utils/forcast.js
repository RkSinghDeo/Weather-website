const request=require('request')

function forcast(longitude,latitude,callback)
{
    const URL=`http://api.weatherstack.com/current?access_key=58b4a9b85a48facafde6d2d10022b95e&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`;

    request({url:URL,json:true},
        (error,response)=>
        {
            if(error){
            callback('Unable to connect to weather service',undefined);
            }else if(response.body.error){
                callback('unable to find location !',undefined);
            }else{
            callback(undefined,{
                discription:response.body.current.weather_descriptions[0],
                currentTemprature:response.body.current.temperature,
                feelsLike:response.body.current.feelslike
        })
    }

})
}
module.exports=forcast;