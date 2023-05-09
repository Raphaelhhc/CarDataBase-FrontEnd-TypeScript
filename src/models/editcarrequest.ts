class EditCarRequest {
    modelname: string;
    brand: string;
    bodystyle: string;
    region: string;
    segment: string;
    powersource: string;
    keydimensions: string;
    powertrain: string;
    driverassistance: string;
    infotainment: string;

    constructor (
        modelname: string,
        brand: string,
        bodystyle: string,
        region: string,
        segment: string,
        powersource: string,
        keydimensions: string,
        powertrain: string,
        driverassistance: string,
        infotainment: string
    ) {
        this.modelname = modelname;
        this.brand = brand;
        this.bodystyle = bodystyle;
        this.region = region;
        this.segment = segment;
        this.powersource = powersource;
        this.keydimensions = keydimensions;
        this.powertrain = powertrain;
        this.driverassistance = driverassistance;
        this.infotainment = infotainment
    }

}

export default EditCarRequest;