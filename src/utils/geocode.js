const request=require('request')
function geoCode(address,callback)
{   
    const GURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFtbmVlazIzMDciLCJhIjoiY2tlazhrN3FqMDdlbTJ6cHcyOWN4OXhkZiJ9.jifdhClbFaoouwV9WOVyhg&limit=1`;
    request({url:GURL,json:true},(error,response)=>
    {
        if(error)
        {callback('Geo service not working',undefined);
        }
        else if(response.body.features===0)
        {
            callback
            ('Unable to find location !',undefined);
        }
        else{
        const latitude=response.body.features[0].center[1];
        const longitude=response.body.features[0].center[0];
        const location=response.body.features[0].place_name;
        callback(undefined,{
            latitude:latitude,
            longitude:longitude,
            location:location
        });
        
    }
    })
}
module.exports=geoCode;