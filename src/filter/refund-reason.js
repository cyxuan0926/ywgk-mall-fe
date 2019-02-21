function refundReason(value) {
  switch (value) {
    case 'WRONG_TRADE': return '拍错/不想要';
    case 'NEVER_RECEIVED': return '快递一直未送到';
    case 'DEFECTIVE_PRODUCT': return '商品破损';
    case 'OTHER': return '其他';
  }
}

export default refundReason;
