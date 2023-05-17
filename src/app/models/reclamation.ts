import { User } from "./user";

export class Reclamation {
    id: number;
    numReclamation: number;
    refReclamation: String;
    dateReclamation: Date;
    prenomNomSourceReclamation: String;
    adresseSourceReclamation: String;
    prenomNomSourceDestinataire: String;
    adresseSourceDestinataire: String;
    adresseLocal: String;
    objetifReclamation: String;
    observation: String;
    etat: number;

    userCreation: number;
    userLastmodified: number;
    dateUserCreation: Date;
    dateUserLastmodified: Date;

    //userLastModified_id: number;
    // userCreation: User;
    //  userLastModified: User;
    //dateUserCreation: Date;
    //dateUserLastmodified: Date;


}