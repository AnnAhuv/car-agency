import { agencies } from "../data/agencies.mjs";
import { customers } from "../data/customers.mjs";

const CarAgencyManager = {
  agencies,

  agencyById: function (agencyId) {
    return agencies.find((agency) => agency.agencyId === agencyId);
  },

  // Search for a car agency by its name or ID.
  // @param {string} idOrName - ID or name of the agency
  // @return {object} - agency object if found, otherwise null
  searchAgency: function (idOrName) {
    return (
      agencies.find(
        (agency) =>
          agency.agencyId === idOrName || agency.agencyName === idOrName
      ) || null
    );
  },

  // Retrieve all agencies' names.
  // @return {string[]} - Array of agency names
  getAllAgencies: function () {
    return agencies.map((agency) => agency.agencyName);
  },

  // Add a new car to an agency's inventory.
  // @param {string} agencyId - The ID of the agency
  // @param {object} car - The car object to be added
  // @return {boolean} - true if added successfully, false otherwise
  addCarToAgency: function (agencyId, car) {
    const agency = this.agencyById(agencyId);
    if (!agency) {
      return false;
    }
    const existingBrand = agency.cars.find((c) => c.brand === car.brand);
    if (!existingBrand) {
      const newBrand = {
        brand: car.brand,
        models: [car],
      };
      agency.cars.push(newBrand);
    } else {
      existingBrand.models.push(car);
    }
    return true;
  },

  // Remove a car from an agency's inventory.
  // @param {string} agencyId - The ID of the agency
  // @param {string} carId - The ID of the car to be removed
  // @return {boolean} - true if removed successfully, false otherwise
  removeCarFromAgency: function (agencyId, carId) {
    const agency = this.agencyById(agencyId);
    if (!agency) {
      return false;
    }
    let carToRemove;
    for (let brand of agency.cars) {
      for (let car of brand.models) {
        if (car.carNumber === carId) {
          carToRemove = car;
          if (!carToRemove) {
            return false;
          }
          brand.models.splice(brand.models.indexOf(car), 1);
        }
      }
    }
    return true;
  },

  // Change the cash or credit of an agency.
  // @param {string} agencyId - The ID of the agency
  // @param {number} cashOrCredit - The amount of cash or credit to be updated
  // @return {boolean} - true if updated successfully, false otherwise
  changeAgencyCashOrCredit: function (agencyId, cashOrCredit) {},

  // Update the price of a specific car in an agency.
  // @param {string} agencyId - The ID of the agency
  // @param {string} carId - The ID of the car
  // @param {number} newPrice - The new price of the car
  // @return {boolean} - true if updated successfully, false otherwise
  updateCarPrice: function (agencyId, carId, newPrice) {
    const agency = this.agencyById(agencyId);
    if (!agency) {
      return false;
    }
    for (let brand of agency.cars) {
      for (let car of brand.models) {
        if (car.carNumber === carId) {
          car.price = newPrice;
          return true;
        }
      }
    }
  },

  // Calculate and return the total revenue for a specific agency.
  // @param {string} agencyId - The ID of the agency
  // @return {number} - The total revenue of the agency
  getTotalAgencyRevenue: function (agencyId) {
    const agency = this.agencyById(agencyId);
    let totalRevenue = 0;
    for (let brand of agency.cars) {
      for (let car of brand.models) {
        totalRevenue += car.price;
      }
    }
    return totalRevenue;
  },

  // Transfer a car from one agency to another.
  // @param {string} fromAgencyId - The ID of the agency from where the car will be transferred
  // @param {string} toAgencyId - The ID of the agency to where the car will be transferred
  // @param {string} carId - The ID of the car to be transferred
  // @return {boolean} - true if transferred successfully, false otherwise
  transferCarBetweenAgencies: function (fromAgencyId, toAgencyId, carId) {
    const fromAgency = this.agencyById(fromAgencyId);
    const toAgency = this.agencyById(toAgencyId);
    let carToTransfer;
    if (!fromAgency || !toAgency) {
      return false;
    }
    for (let brand of fromAgency.cars) {
      for (let car of brand.models) {
        if (car.carNumber === carId) {
          carToTransfer = car;
          brand.models.splice(brand.models.indexOf(car), 1);
        }
      }
    }
    if (!carToTransfer) {
      return false;
    } else {
      const existingBrand = toAgency.cars.find(
        (c) => c.brand === carToTransfer.brand
      );
      if (!existingBrand) {
        const newBrand = {
          brand: carToTransfer.brand,
          models: [carToTransfer],
        };
        toAgency.cars.push(newBrand);
      } else {
        existingBrand.models.push(carToTransfer);
      }
    }
    return true;
  },
};

// ***Logging CarAgencyManager method results for testing***
//
// console.log(CarAgencyManager.getTotalAgencyRevenue('Plyq5M5AZ'));
// console.log(CarAgencyManager.searchAgency("CarMax"));
// console.log(CarAgencyManager.getAllAgencies());
// console.log(CarAgencyManager.removeCarFromAgency("Plyq5M5AZ", "AZJZ4"));
// console.log(CarAgencyManager.getTotalAgencyRevenue('Plyq5M5AZ'));
//
//
//
const newCar = {
  brand: "Ford",
  models: [
    {
      name: "Mustang",
      year: 2023,
      price: 500000,
      carNumber: "ABC123",
      ownerId: "xyz",
    },
  ],
};

// console.log(CarAgencyManager.addCarToAgency("Plyq5M5AZ", newCar));
console.log(CarAgencyManager.removeCarFromAgency("Plyq5M5AZ", "AZJZ4"));

const CustomerManager = {
  customers,

  // Search for a customer by their name or ID.
  // @param {string} idOrName - ID or name of the customer
  // @return {object} - customer object if found, otherwise null
  searchCustomer: function (idOrName) {},

  // Retrieve all customers' names.
  // @return {string[]} - Array of customer names
  getAllCustomers: function () {},

  // Change the cash of a customer.
  // @param {string} customerId - The ID of the customer
  // @param {number} cash - The new cash value
  // @return {boolean} - true if updated successfully, false otherwise
  changeCustomerCash: function (customerId, cash) {},

  // Calculate the total value of all cars owned by a specific customer.
  // @param {string} customerId - The ID of the customer
  // @return {number} - The total value of cars owned by the customer
  getCustomerTotalCarValue: function (customerId) {},
};

const CarManager = {
  cars: agencies.flatMap((agency) => agency.cars),

  // Retrieve all cars available for purchase.
  // @return {object[]} - Array of cars
  getAllCars: function () {},

  // Search for cars based on certain criteria.
  // @param {number} year - The production year of the car
  // @param {number} price - The price of the car
  // @param {string} brand - The brand of the car
  // @return {object[]} - Array of cars that meet the criteria
  searchCars: function (year, price, brand) {},

  // Return the most expensive car available for sale.
  // @return {object} - The most expensive car
  getMostExpensiveCar: function () {},

  // Return the cheapest car available for sale.
  // @return {object} - The cheapest car
  getCheapestCar: function () {},
};

const CarPurchaseManager = {
  agencies,
  customers,
  taxesAuthority: {
    totalTaxesPaid: 0,
    sumOfAllTransactions: 0,
    numberOfTransactions: 0,
  },

  // Implement a sellCar function that sells a car to a specific customer.
  // @param {string} carId - The ID of the car
  // @param {string} customerId - The ID of the customer
  // @return {boolean} - true if the car was sold successfully, false otherwise
  sellCar: function (carId, customerId) {},

  // Calculate and return the total revenue of the entire market.
  // @return {number} - The total revenue of the market
  getTotalMarketRevenue: function () {},
};
