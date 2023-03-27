import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { currentuser, usermodel } from 'src/app/models/data-model.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  hide = true;
  imageSrc:string="../../../assets/img/profile/profile.jpg";
  userObj : usermodel = new usermodel();
  currentuser : currentuser = new currentuser();
  updateUser : any;
  gender: boolean = true;

  firstFormGroup = this._formBuilder.group({
    userFname: ['', Validators.required],
    userLname: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    mobileNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    cmpas: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    image: ['', Validators.required]
  });
  update : boolean = false;
  updateid : string;
  isLinear = false;
  constructor(
      private _formBuilder: FormBuilder,
      private users : UserServiceService,
      private us : UserServiceService
    ) { }

  ngOnInit(): void {
    this.updateid = localStorage.getItem('userId');
    let ch = localStorage.getItem('userTask')
    if(ch == 'add'){
      this.update = false;
    }
    else if(ch == 'update'){
      this.update = true;
      this.getuser();
    }
  }

  handleInputChange(e:any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
    // this.FinalFormGroup.get('image')?.setValue(this.imageSrc);
  }

submit(){
  this.updatemodel()
  console.log(this.userObj);
  this.us.signup(this.userObj)
      .subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
}

updatemodel(){
  this.userObj.userId = parseInt(this.updateid);
  this.userObj.userFname = this.firstFormGroup.value.userFname;
  this.userObj.userLname = this.firstFormGroup.value.userLname;
  this.userObj.gender = this.firstFormGroup.value.gender;
  this.userObj.dob = this.firstFormGroup.value.dob;
  this.userObj.mobileNumber = this.secondFormGroup.value.mobileNumber;
  this.userObj.email = this.secondFormGroup.value.email;
  this.userObj.password = this.secondFormGroup.value.password;
  this.userObj.userName = this.thirdFormGroup.value.userName;
  this.userObj.userImage = this.imageSrc;
}
updateuser(){
  this.updatemodel();
  console.log(this.userObj);
  this.users.updateUser(this.userObj)
  .subscribe({
    next:(res)=>{
      // this.toast.success({detail:"success Message",summary:res.message,duration:5000});
      // this.dlg.closeAll();
      alert("user update ok")
    },
    error:(err)=>{
      // this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000});
    }
  })
}


getuser(){
  this.users.SearchUserbyid(this.updateid).subscribe((data)=>{
    this.updateUser = data;
    console.log(this.updateUser[0].userId);
    this.firstFormGroup.controls['userFname'].setValue(this.updateUser[0].userFname);
    this.firstFormGroup.controls['userLname'].setValue(this.updateUser[0].userLname);
    this.firstFormGroup.controls['dob'].setValue(this.updateUser[0].dob);
    this.firstFormGroup.controls['gender'].setValue(this.updateUser[0].gender);
    this.secondFormGroup.controls['mobileNumber'].setValue(this.updateUser[0].mobileNumber);
    this.secondFormGroup.controls['email'].setValue(this.updateUser[0].email);
    this.secondFormGroup.controls['password'].setValue(this.updateUser[0].password);
    this.thirdFormGroup.controls['userName'].setValue(this.updateUser[0].userName);
    this.imageSrc = this.userObj[0].userImage;
    let gdr = this.updateUser[0].gender;
    if(gdr == 'male' && gdr == "1"){
      this.gender = true;
    }
    else if(gdr == 'female' ){
      this.gender = false;
    }
  })
}

}
