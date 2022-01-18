import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Mus} from "../../../General/models/mus";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MUService} from "../../../General/services/mu.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-edit-mu',
  templateUrl: './edit-mu.component.html',
  styleUrls: ['./edit-mu.component.css']
})
export class EditMUComponent implements OnInit {
  @Input() mu: Array<Mus> = [];
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalMU') modalMU: any;

  closeResult = '';

  public formMU: FormGroup;

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private ser: MUService) {
    this.formMU = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mu.currentValue.length != 0) {
      this.formMU.patchValue({
        id: changes.mu.currentValue[0]['id'],
        name: changes.mu.currentValue[0]['name'],
        description: changes.mu.currentValue[0]['description']
      });
      this.modalService.open(this.modalMU, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveMU() {
    this.ser.updateMU(this.formMU.value).subscribe(data => {
      if(data.status !== 'error'){
        this.toast.fire({
          icon: 'success',
          title: 'Unidad de Medida actualizada.'
        });

        this.modalService.dismissAll('Close saved');
        this.reload.emit();
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error al actualizar.'
        });
        this.modalService.dismissAll('Close error');
      }
    });
  }

}
