class CarModel {
    id: number;
    modelname: string;
    brand?: string;
    bodystyle?: string;
    region?: string;
    segment?: string;
    powersource?: string;
    keydimensions?: string;
    powertrain?: string;
    driverassistance?: string;
    infotainment?: string;
    img?: string;

    constructor (
        id: number,
        modelname: string,
        brand: string,
        bodystyle: string,
        region: string,
        segment: string,
        powersource: string,
        keydimensions: string,
        powertrain: string,
        driverassistance: string,
        infotainment: string,
        img: string
    ) {
        this.id = id;
        this.modelname = modelname;
        this.brand = brand;
        this.bodystyle = bodystyle;
        this.region = region;
        this.segment = segment;
        this.powersource = powersource;
        this.keydimensions = keydimensions;
        this.powertrain = powertrain;
        this.driverassistance = driverassistance;
        this.infotainment = infotainment;
        this.img = img;
    }

}

export default CarModel;