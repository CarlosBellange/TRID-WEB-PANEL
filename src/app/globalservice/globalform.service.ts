import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalformService {
  /**
   * 
   */
  currentlang: any = 'en';
  obsserv: any;
  public selectionFormatState = new Subject<any>();
  constructor() {
    // console.log('intialized........');
  }
  /**
   * 
   * @param formGroup any formgroup
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  /**
   * reset form field upon submit
   */
  reset(form: FormGroup) {
    form.reset();
  }
  /**
   * 
   * @param form formgroup as argument
   * @param field 
   */
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field),
      'has-success': this.isFieldValidSucc(form, field)
    };
  }
  /**
   * 
   * @param form 
   * @param field 
   */
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  isFieldValidSucc(form: FormGroup, field: string) {
    return form.get(field).valid && form.get(field).touched;
  }
  setinvalid(form: FormGroup, field: string) {
    form.controls[field].setErrors({ 'exitindb': true });
  }

  ispatternvalue(form: FormGroup, field: string) {
    if (form.get(field).errors) {
      if (form.get(field).errors.pattern) {
        //  console.log(form.get(field).errors);
        return true;
      }
    } else {
      return false;
    }

  }
  ismaxlengthachieved(form: FormGroup, field: string) {
    if (form.get(field).errors) {
      if (form.get(field).errors.maxlength) {
        //  console.log(form.get(field).errors);
        return true;
      }
    } else {
      return false;
    }
  }
  /**
   * 
   * @param lang 
   */
  langadd(lang) {
    // console.log(lang);
    this.currentlang = lang;

    this.setState(this.currentlang);

  }
  setState(state: any) {
    this.selectionFormatState.next(state);
  }

  getState(): Observable<any> {
    //console.log(this.selectionFormatState)
    return this.selectionFormatState.asObservable();
  }

}
