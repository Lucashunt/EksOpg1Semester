const check = (n) => {
    if (n == 0){
        return false
    } else if (n % 2 === 0){
        return true
    } else {
        return false
    }

}
console.log(check(0));

module.exports = { check };

const check2 = (n) =>{
    if (typeof n == 'number'){
        return true
    } else {
        return false
    }
}
console.log(check2('hej'));