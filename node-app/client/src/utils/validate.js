/* 邮箱校验*/
export function isWscnEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]{2,10}\.[a-z]{2,5}$/i;
    console.log(str.trim())
    return reg.test(str.trim());
}