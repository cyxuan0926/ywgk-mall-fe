import Moment from 'moment';

function moment(date, format) {
  if (!date) {
    return '';
  }
  format = format || 'YYYY-MM-DD HH:mm:ss';
  return Moment(date, format).format(format);
}

export default moment;
