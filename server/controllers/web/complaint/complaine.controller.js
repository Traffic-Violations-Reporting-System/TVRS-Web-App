const {Accept,Person,Vehicle,Accept_People,Accept_Vehicle,Complaint}=require('../../../models');

exports.createComplainController = async (req, res) => {
    try{

        const {accepts,vehicles,people} = req.body;

        if(vehicles.length==0 && people.length==0) return res.status(400).send("Incomplete Complaint Details!");

        const complaint =await Complaint.findByPk(accepts.ComplaintId);
        if (!complaint) return res.status(400).send("Not found Complaint!");

        const accept = await Accept.create(accepts);
        const person = await Person.bulkCreate(vehicles);

        let personResult = person.map(data => ({ acceptId: accept.id, peopleId: data.id }));
        const accept_people_result = await Accept_People.bulkCreate(personResult);

        const vehicle = await Vehicle.bulkCreate(people);

        let vehicleResult = vehicle.map(data => ({ acceptId: accept.id, vehicleId: data.id }));
        const accept_vehicle_result = await Accept_Vehicle.bulkCreate(vehicleResult);

        return res.status(200).send("successfully created");

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
