function status(value) {
  switch (value) {
    case 'PENDING_PAYMENT': return '待付款';
    case 'PENDING_SHIPMENT': return '待发货';
    case 'PENDING_RECEIVING': return '待收货';
    case 'COMPLETE': return '交易完成';
    case 'CANCELLED': return '交易取消';
  }
}

export default status;
