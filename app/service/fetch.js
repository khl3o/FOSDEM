const fetchGet = async url => {
  const response = await fetch(url);
  return await response.text();
};

module.exports = {fetchGet};
