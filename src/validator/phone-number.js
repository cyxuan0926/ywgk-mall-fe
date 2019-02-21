function phoneNumber(value, $chip) {
  let regExp = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (regExp.test(value) === false) {
    $chip({
      chipOptions: '请输入11位号码的手机号'
    });
    return false;
  } else {
    return true;
  }
}

export { phoneNumber };
