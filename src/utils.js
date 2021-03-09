export const commaNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/[^0-9^,]+/g, '');

export const shortNum = donuts => {
  let val = NaN;
  if (donuts < 100000) val = commaNumber(donuts);
  else if (donuts < 1000000) val = Math.floor(donuts/1000) + 'K';
  else val = Math.floor(donuts/100000)/10 + 'M';
  return Number.isNaN(val) ? '0' : val;
}

export const getRedditComment = async name => {
  try {
    const data = await fetch('https://www.reddit.com/api/info.json?id='+ name)
      .then(response => response.json());
    return data.data.children[0].data;
  } catch (error) {
    console.log('failed fetching reddit comment', error.message, error.stack);
    return null;
  }
};
