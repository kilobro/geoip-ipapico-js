const req = require('axios').get;
const tortest = require('tor-test').isTor;

var key = process.env.IPAPI_KEY || null;

ipinfo = {}

data = {
    info: {
        ipapi: null,
        tortest: null
    },
    output: {},
    errors: {
        error_ipapi: null,
        error_tortest: null
    }
};

checkAPI = (addr) => {
    req('https://ipapi.co/' + addr + '/json/' + (key == null ? '' : '?key=' + key))
        .then( response => {
            data.output = response.data;
        })
        .catch( err => {
            console.log(err);

            data.info.ipapi = false;
            data.errors.error_ipapi = err;
    });
};

checkTor = (addr => {
    tortest(addr, (err, isTor) => {
        if(err){
                data.info.tortest = false;
                data.errors.error_tortest = err;
            }

            data.output.Tor = isTor;
    });
});

ipinfo.lookup = (addr, cb) => {
    checkAPI(addr);
    checkTor(addr);
    cb(data);
}

module.exports = ipinfo;