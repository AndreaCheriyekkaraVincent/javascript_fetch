class AddressComponent {
    constructor() {
    this.addressData = {
      street: '',
      city: '',
      state: '',
      houseNumber: '',
      country: 'de',
      postalCode: ''
    };
  }

  setAddressData(address) {
    this.addressData = { ...this.addressData, ...address };
  }

  getAddressData() {
    return this.addressData;
  }

  render() {
    const { street, city, state, country, postalCode } = this.addressData;

    return `
      <input type="text" id="street" placeholder="Street" value="${street}">
      <input type="text" id="city" placeholder="City" value="${city}">
      <input type="text" id="state" placeholder="State" value="${state}">
      <input type="text" id="country" placeholder="Country" value="${country}">
      <input type="text" id="zip" placeholder="Postal Code" value="${postalCode}">
    `;
  }
}

const addressComponent = new AddressComponent();

const formElement = document.querySelector('#addressForm');

formElement.innerHTML = addressComponent.render();

const submitButton = document.querySelector('#submitBtn');

submitButton.addEventListener('click', () => {
  const streetInput = document.querySelector('#street');
  const cityInput = document.querySelector('#city');
  const stateInput = document.querySelector('#state');
  const countryInput = document.querySelector('#country');
  const postalCodeInput = document.querySelector('#zip');


const zipInput = document.querySelector('#zip');

zipInput.addEventListener('input', async () => {
  const zip = zipInput.value;

  const city = await fetchCityFromZip(zip);

  const cityInput = document.querySelector('#city');
  cityInput.value = city;
});


  const address = {
    street: streetInput.value,
    city: cityInput.value,
    state: stateInput.value,
    country: countryInput.value,
    postalCode: postalCodeInput.value
  };

  addressComponent.setAddressData(address);

  async function fetchCityFromZip(zip) {
    const url = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?finda=cityByPlz&plz=${zip}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.length > 0) {
        return data[0].ort;
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  
    return '';
  }
});
