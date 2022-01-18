import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {
  faTrashAlt,
  faPlus,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import {MUService} from "../../General/services/mu.service";
import {Mus} from "../../General/models/mus";
import swal from "sweetalert2";

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.css']
})
export class MeasurementUnitComponent implements OnInit {
  loading: boolean = true;

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faEdit = faEdit;

  form = this.formBuilder.group({
    mus: this.formBuilder.array([])
  });

  allMus: Array<Mus> = [];
  mu: Array<Mus> = [];

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  constructor(private formBuilder: FormBuilder,
              private ser: MUService) {
    this.ser.getAllMUs().subscribe(data => {
      if (data['status'] !== 'error') {
        this.allMus = data.map((mus: Array<Mus> = []) => Mus.fromJson(mus));
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  get mus() {
    return this.form.controls["mus"] as FormArray;
  }

  addMu() {
    const group = this.formBuilder.group({
      name: '',
      description: ''
    });

    this.mus.push(group);
  }

  deleteMU(muIndex: number) {
    this.mus.removeAt(muIndex);
  }

  saveMUs() {
    this.ser.saveMUs(this.mus.getRawValue()).subscribe(data => {
      if (data.status !== 'error') {
        this.toast.fire({
          icon: 'success',
          title: 'Unidades de Medida guardadas.'
        });
        this.reloadTable();
        for (let cont = 0; cont < this.mus.length; cont++) {
          this.mus.removeAt(cont);
        }
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error al guardar.'
        });
      }
    });
  }

  editMu(id: number) {
    this.ser.getMU(id).subscribe(data => {
      this.mu = data.map((mus: Array<Mus> = []) => Mus.fromJson(mus));
    });
  }

  reloadTable() {
    this.loading = true;
    this.ser.getAllMUs().subscribe(data => {
      if (data['status'] !== 'error') {
        this.allMus = data.map((mus: Array<Mus> = []) => Mus.fromJson(mus));
      }
      this.loading = false;
    });
  }

}
