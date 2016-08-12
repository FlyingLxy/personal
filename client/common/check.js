/**
 * Created by lxy on 16/8/11.
 */
export const checkemail = (email) => {
    const reg =  /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(email);
}

export const checkpw = (pw) => {
    return  (pw.length <= 20 && pw.length >= 8) ? true : false;
}