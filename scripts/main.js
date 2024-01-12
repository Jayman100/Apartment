const inputTitle = document.querySelector(".create__info--title-input");
const inputCity = document.querySelector(".create__address--city-input");
const inputStreet = document.querySelector(".create__address--street-input");
const inputState = document.querySelector(".create__address--state-input");
const inputCountry = document.querySelector(".create__address--country-input");
const inputAgentfee = document.querySelector(".create__agent-fee--input");
const inputMainfee = document.querySelector(".create__main-fee--input");
const inputNumBathroom = document.querySelector(
  ".create__features--bathroom-input"
);
const inputNumToilet = document.querySelector(".create__features--toile-input");

const inputNumBedroom = document.querySelector(
  ".create__features--bedroom-input"
);
const inputDescription = document.querySelector(".create__description--input");

const selectStatus = document.querySelector(".create__info--status-select");
const selectPropertyType = document.querySelector(".create__info--type-select");
const selectPublish = document.querySelector(".create__kind--publish");
const selectUnpublish = document.querySelector(".create__kind--unpublish");

const nextBtn = document.querySelector(".create__btn--next ");

class PropertyAsset {
  title;
  propertyType; // todo rename into something less broad
  status;
  features; // todo; point to PropertyFeatures
  price;
  description;
  location;

  static create_from_data(serialized_data) {
    const parsed_data = JSON.parse(serialized_data);
    const newPropertyAsset = new PropertyAsset();
    newPropertyAsset.title = parsed_data.title;
    newPropertyAsset.status = parsed_data.status;
    newPropertyAsset.propertyType = parsed_data.propertyType;
    newPropertyAsset.price = new PropertyFee(
      parsed_data.agentfee,
      parsed_data.mainfee
    );
    newPropertyAsset.location = new PropertyLocation(
      parsed_data.address,
      parsed_data.city,
      parsed_data.state,
      parsed_data.country
    );
    newPropertyAsset.features = new PropertyFeatures(
      parsed_data.bathroom,
      parsed_data.toilet,
      parsed_data.bedroom
    );
    newPropertyAsset.publish = parsed_data.publish;
    newPropertyAsset.description = parsed_data.description;

    return newPropertyAsset;
  }
}

class PropertyLocation {
  city;
  state;
  country;
  address;

  constructor(address, city, state, country) {
    this.address = address;
    this.city = new LocationCity(city);
    this.state = new LocationState(state);
    this.country = new LocationCountry(country);
  }
}

class LocationState {
  state;
  constructor(state) {
    this.state = state;
  }
}

class LocationCity {
  city;
  constructor(city) {
    this.city = city;
  }
}

class LocationCountry {
  country;
  constructor(country) {
    this.country = country;
  }
}

class PropertyFeatures {
  bathroom; // todo; integer
  toilet; // todo; integer
  bedroom;
  constructor(bathroom, toilet, bedroom) {
    this.bathroom = bathroom;
    this.toilet = toilet;
    this.bedroom = bedroom;
  }

  bathroom_available() {
    return this.bathroom > 0;
  }

  bedroom_available() {
    return this.bedroom > 0;
  }

  toilet_available() {
    return this.toilet > 0;
  }
}

class PropertyFee {
  // todo; add the complexity of the fees in here

  constructor(agentfee, mainfee) {
    this.agentfee = agentfee;
    this.mainfee = mainfee;
  }

  get_total() {
    return this.agentfee + this.get_main_fee();
  }
  get_main_fee() {
    return this.mainfee;
  }
  get_side_fee() {
    return Math.abs(this.get_total() - this.get_main_fee());
  }
}

// read  about setter and getter

const isPublished = () => {
  return selectPublish.checked; // todo; the right way . simple . easy !!!
};

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    title: inputTitle.value,
    status: selectStatus.value,
    propertyType: selectPropertyType.value,
    city: inputCity.value,
    address: inputStreet.value,
    state: inputState.value,
    country: inputCountry.value,
    agentfee: +inputAgentfee.value,
    mainfee: +inputMainfee.value,
    bathroom: +inputNumBathroom.value,
    bedroom: +inputNumBedroom.value,
    toilet: +inputNumToilet.value,
    desecription: inputDescription.value,
    publish: isPublished(),
    description: inputDescription.value,
  };
  const obj = PropertyAsset.create_from_data(JSON.stringify(data));

  console.log(obj);
});

// todo; correct your entitiles ! create new ones for compleity management
// todo; work on serialization and deserialization

// todo; please pay attention to the little details.
// todo; add all neccessary method to the created classes to aid workings

// todo; any other thing will be added here for you as we move . !!
