// opt没有传该传的
import * as Mock from './mock'
Mock["list"]
const DEFAULT_REQUEST_OPIONS = {
    url: '',
    data: {},
    header: {
        'Content-Type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
}
let util = {
    request(opt) {
        // 生成对象
        let options = Object.assign({}, DEFAULT_REQUEST_OPIONS, opt);
        console.log(options);
        let {url, data, header, method, dataType, mock=false} = options;
        console.log(url, data, header, method, dataType, mock);
        return new Promise((resolve, reject) => {
            if(mock) {
                let res = {
                    statusCode: 200,
                    data: Mock[url]
                }
                resolve(res.data);
                return;
            }
            // resolve('ok');
            wx.request({
                url,
                data,
                header,
                method,
                dataType,
                success(res) {
                    resolve(res.data)
                },
                fail(err) {
                    reject(err) 
                }
            })
        });
    }
}
export default util