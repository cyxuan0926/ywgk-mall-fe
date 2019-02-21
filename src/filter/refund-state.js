function refundState(value) {
  switch (value) {
    case 'PENDING': return '等待卖家处理';
    case 'REJECTED': return '卖家已拒绝退款';
    case 'PENDING_SHIPMENT': return '请退货给商家';
    case 'PENDING_RECEIVING': return '待商家收货';
    case 'CANCELLED': return '已取消退款申请';
    case 'COMPLETE': return '退款申请已完成';
  }
}

export default refundState;
