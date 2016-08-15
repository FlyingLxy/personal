/**
 * Created by lxy on 16/8/10.
 */
const env = {
    //MODE: 'development',
    MODE: 'production',
    PORT: 80,
    //HOST: '192.168.199.210',
    HOST: 'http://172.16.33.29',
    LOCALHOST: 'http://172.16.33.29:3000'
}

process.env.NODE_ENV = env.MODE;
process.env.PORT = env.PORT;
process.env.HOST = env.HOST;
process.env.LOCALHOST = env.LOCALHOST;