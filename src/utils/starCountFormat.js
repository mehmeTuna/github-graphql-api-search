const starCountFormat = (count) => {
  if (count < 1000) {
    return count;
  }

  const k = String(count - (count % 1000)).replaceAll("0", "");
  return `${k}K`;
};

export default starCountFormat;
