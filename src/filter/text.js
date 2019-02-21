function text(value, valueTextPairs) {
  if (!value) return '';
  value = value.toString();
  const valueTextPair = valueTextPairs.find(p => p.value === value);
  if (!valueTextPair) {
    return '';
  }
  return valueTextPair.text;
}

export default text;
