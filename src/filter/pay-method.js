function payMethod(value) {
  switch (value) {
    case 'WE_CHAT_PAY': return '微信支付';
    case 'ALIPAY': return '支付宝支付';
  }
}

export default payMethod;
