let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;
const company = require("../model/company");
module.exports.Createcompany = async (req, res, next) => {
    const { companyname, companycity, companycountry, companystate, companyzip, companystreet, companytype, userId } = req.body;

    try {
        if (!companyname || !companycity || !companycountry || !companystate || !companystreet || !companyzip || !companytype || !userId)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        const existingCompany = await company.findOne({ companyname });
        if (existingCompany)
            return res
                .status(400)
                .json({ msg: "This Companyy name already exist", Status: 400, Success: false });
        const newCompany = new Company({
            companyname,
            companycity,
            companycountry,
            companystate,
            companystreet,
            companyzip,
            companytype,
            userId: '615a8fa99c66f9bd8632a905'
        });

        const response = await newCompany.save();
        res.status(200).json({ msg: "Company add Successful !", Status: 200, Success: true, data: response });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.Country = async (req, res, next) => {
    try {
        res.status(200).json({ msg: "Country add Successful !", Status: 200, Success: true, data: Country.getAllCountries() });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.state = async (req, res, next) => {
    try {
        const { countryCode } = req.body;
        if (!countryCode)
            return res.status(400).json({ msg: "Please enter countrycode", Status: 400, Success: false });
        var state = State.getAllStates().filter(item => item.countryCode == countryCode);

        res.status(200).json({ msg: "State get successfully ! !", Status: 200, Success: true, data: state });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.city = async (req, res, next) => {
    const { countryCode, stateCode } = req.body;
    var Citydata = City.getAllCities().filter(item => item.stateCode == stateCode && item.countryCode == countryCode);
    try {
        res.status(200).json({ msg: "City get Successful !", Status: 200, Success: true, data: Citydata });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
// https://sdcdocumentation.syniverse.com/index.php/batch-automation/resources