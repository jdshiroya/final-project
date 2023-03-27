import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Dialog } from '@angular/cdk/dialog';
import { NgToastService } from 'ng-angular-popup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gamemodel } from 'src/app/models/data-model.model';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {
 
  constructor(
    private fb: FormBuilder,    
    private reg : AdminServiceService,
    private dlg : Dialog,
    private toast : NgToastService,
    private snackBar: MatSnackBar,
    private trans : TransService
){}

gameObj : gamemodel = new gamemodel();

addgame:boolean ;
managegame:boolean;
gameForm!: FormGroup;
imageSrc:string="";
updateid : number;
updateobj : any;
selected : '';

ngOnInit(): void {
  this.gameForm = this.fb.group({
    gameName: ['',Validators.required],
    gameDetails: ['',Validators.required],
    gamePrice : ['',Validators.required],
    time : ['',Validators.required],
    slots : ['',Validators.required],
    gameImage : ['',Validators.required]
  })
  let ts = localStorage.getItem('task')
  if(ts == "addgame"){
    this.addgame = true;
  }
  else if(ts == "managegame"){
    this.managegame = true;
    this.updateid = this.trans.updateid;
    this.getgame();
  }
}
addGame(){
  this.updatemodel();
  console.log(this.gameForm.value)
  if(this.gameForm.valid){
    this.reg.addgame(this.gameForm.value)
    .subscribe({
      next:(res)=>{
        
          this.snackBar.open("message", "Add thay gyu", {
            duration: 2000,
          });
        this.gameForm.reset();
        this.dlg.closeAll();
        // this.router.navigate(["login"]);
      },
      error:(err)=>{
        alert("not coming");
        this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000});
      }
    })
  }
  else{
    alert("invalid");
    this.toast.error({detail:"Error Message",summary:"invalid Informatin",duration:5000});
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
  this.gameForm.get('gameImage')?.setValue(this.imageSrc);
}

private validateAllFormFileds(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field => {
    const controls = formGroup.get(field);
    
    if(controls instanceof FormControl){
      controls.markAsDirty({onlySelf:true});
    }else if(controls instanceof FormGroup){
      this.validateAllFormFileds(controls)
    }
  })
}

deleteimg(){
  this.imageSrc = "";
}

updatemodel(){
  this.gameObj.gameId = this.updateid;
  this.gameObj.gameName = this.gameForm.value.gameName;
  this.gameObj.gameDetails = this.gameForm.value.gameDetails;
  this.gameObj.gameImage = this.gameForm.value.gameImage;
  this.gameObj.gamePrice = this.gameForm.value.gamePrice;
  this.gameObj.time = this.gameForm.value.time;
  this.gameObj.slots = this.gameForm.value.slots;
}

getgame(){
  this.reg.SearchGamebyid(this.updateid).subscribe((data)=>{
    this.updateobj = data;
    console.log(data[0].gameId);
    this.gameForm.controls['gameName'].setValue(data[0].gameName);
    this.gameForm.controls['gameDetails'].setValue(data[0].gameDetails);
    this.gameForm.controls['gamePrice'].setValue(data[0].gamePrice);
    this.gameForm.controls['slots'].setValue(data[0].slots);
    this.imageSrc = data[0].gameImage;
    this.selected = data[0].time;
  });
}


onUpdate(){
  this.updatemodel();
  console.log(this.gameObj)
  this.reg.updateGame(this.gameObj)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"success Message",summary:res.message,duration:5000});
      this.dlg.closeAll();
    },
    error:(err)=>{
      this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000});
    }
  })
}


}
