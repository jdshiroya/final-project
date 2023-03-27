export class gamemodel{
    gameId: number = 0;
    gameName: string = '';
    gameImage: string = '';
    gamePrice: number = 0;
    gameDetails: string = '';
    time : string = '';
    slots : number = 0;
}

export class usermodel{
    userId: number = 0;
    userFname: string = '';
    userLname: string = '';
    dob: string = '';
    email: string = '';
    mobileNumber: string = '';
    gender: string = '';
    userName: string = '';
    password: string = '';
    userImage: string = '';
    role: string = 'user';
}

export class currentuser{
    userId : number = 0;
    userFname: string = '';
    userLname: string = '';
    dob: string = '';
    email: string = '';
    mobileNumber: string = '';
    gender: string = '';
    userName: string = '';
    password: string = '';
    userImage: string = '';
    role: string = 'user';
    card: boolean = false
}

export class request{
    userId : number = 0;
    status : boolean = false;
}