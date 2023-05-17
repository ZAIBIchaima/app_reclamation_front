export class Arrete {
    idArrete: number;
    numArrete: number;
    refArrete: String;
    dateArrete: Date;
    descriptionArrete: String;
    objetArrete: String;

    etat: number;

    //source Execution
    sourceExecution_Id: number;

    //type Decision
    typeDecision_Id: number;

    // Execution
    numExecution: String;
    dateExecution: Date;
    commentairesExecution: String;

    //bo
    numBoMinistre: String;
    dateNumBoMinistre: Date;
    commentairesMinistre: String;

    //user
    userCreation: number;
    userLastmodified: number;

    //dateUser
    dateUserCreation: Date;
    dateUserLastmodified: Date;
}