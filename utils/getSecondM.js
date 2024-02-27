const getSecondM = (arr) => {
  return arr.filter((message, index) => index % 2 === 0);
};
export default getSecondM;
